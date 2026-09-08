import type { Denuncia, Category, DenunciaStatus } from '../types'
import { KEYS, read, write } from './storage'

/**
 * Serviço de denúncias do protótipo.
 *
 * Em um sistema real, as denúncias devem ficar em uma tabela isolada
 * (Supabase) com Row-Level Security para que:
 *  - usuários comuns só vejam a denúncia que criaram (pelo código);
 *  - apenas administradores listem e alterem status.
 */

function getDenuncias(): Denuncia[] {
  return read<Denuncia[]>(KEYS.denuncias, [])
}

function saveDenuncias(denuncias: Denuncia[]): void {
  write(KEYS.denuncias, denuncias)
}

/** Gera um código único no formato ETHEOS-XXXXX. */
function generateCode(existing: Denuncia[]): string {
  const used = new Set(existing.map((d) => d.code))
  let code = ''
  do {
    const n = Math.floor(10000 + Math.random() * 90000) // 5 dígitos
    code = `ETHEOS-${n}`
  } while (used.has(code))
  return code
}

export function createDenuncia(
  category: Category,
  description: string,
  createdBy?: string,
): Denuncia {
  const denuncias = getDenuncias()
  const denuncia: Denuncia = {
    id: crypto.randomUUID?.() ?? `d-${Date.now()}`,
    code: generateCode(denuncias),
    category,
    description,
    status: 'recebida',
    createdAt: new Date().toISOString(),
    createdBy,
  }
  saveDenuncias([denuncia, ...denuncias])
  return denuncia
}

export function getDenunciaByCode(code: string): Denuncia | null {
  const denuncias = getDenuncias()
  return denuncias.find((d) => d.code.toLowerCase() === code.trim().toLowerCase()) ?? null
}

export function listAllDenuncias(): Denuncia[] {
  return getDenuncias()
}

export function listMyDenuncias(userId: string): Denuncia[] {
  return getDenuncias().filter((d) => d.createdBy === userId)
}

export function updateDenunciaStatus(
  id: string,
  status: DenunciaStatus,
  message?: string,
): Denuncia | null {
  const denuncias = getDenuncias()
  const idx = denuncias.findIndex((d) => d.id === id)
  if (idx === -1) return null
  denuncias[idx] = {
    ...denuncias[idx],
    status,
    message: message ?? denuncias[idx].message,
  }
  saveDenuncias(denuncias)
  return denuncias[idx]
}
