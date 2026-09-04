import type { Denuncia, Category, DenunciaStatus } from '../types'
import { KEYS, read, write } from './storage'
import { supabase } from './supabase'

/**
 * Serviço de denúncias.
 *
 * Armazenamento em camadas:
 *  1. Supabase (compartilhado entre todos os navegadores/dispositivos) — quando
 *     as variáveis VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY estiverem configuradas.
 *  2. localStorage (fallback do protótipo) — usado enquanto o backend não existir.
 */

/** Linha como fica na tabela `denuncias` do Supabase. */
interface DenunciaRow {
  id: string
  code: string
  category: Category
  description: string
  status: DenunciaStatus
  created_at: string
  created_by?: string | null
  message?: string | null
}

function rowToDenuncia(row: DenunciaRow): Denuncia {
  return {
    id: row.id,
    code: row.code,
    category: row.category,
    description: row.description,
    status: row.status,
    createdAt: row.created_at,
    createdBy: row.created_by ?? undefined,
    message: row.message ?? undefined,
  }
}

function getLocalDenuncias(): Denuncia[] {
  return read<Denuncia[]>(KEYS.denuncias, [])
}

function saveLocalDenuncias(denuncias: Denuncia[]): void {
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

/** Tenta criar um código único também considerando o que já existe no banco. */
async function ensureUniqueCode(): Promise<string> {
  const local = getLocalDenuncias()
  let code = generateCode(local)
  if (supabase) {
    // Re-tenta até não colidir com o banco.
    for (let attempt = 0; attempt < 5; attempt++) {
      const { data } = await supabase
        .from('denuncias')
        .select('id')
        .eq('code', code)
        .maybeSingle()
      if (!data) break
      code = generateCode(local)
    }
  }
  return code
}

export async function createDenuncia(
  category: Category,
  description: string,
  createdBy?: string,
): Promise<Denuncia> {
  const code = await ensureUniqueCode()

  if (supabase) {
    const { data, error } = await supabase
      .from('denuncias')
      .insert({
        code,
        category,
        description,
        status: 'recebida',
        created_by: createdBy ?? null,
      })
      .select()
      .single()
    if (!error && data) return rowToDenuncia(data as DenunciaRow)
    // Se falhar (ex.: sem tabela criada), cai para o localStorage.
  }

  const denuncia: Denuncia = {
    id: crypto.randomUUID?.() ?? `d-${Date.now()}`,
    code,
    category,
    description,
    status: 'recebida',
    createdAt: new Date().toISOString(),
    createdBy,
  }
  saveLocalDenuncias([denuncia, ...getLocalDenuncias()])
  return denuncia
}

export async function getDenunciaByCode(code: string): Promise<Denuncia | null> {
  if (supabase) {
    const { data } = await supabase
      .from('denuncias')
      .select('*')
      .ilike('code', code.trim())
      .maybeSingle()
    if (data) return rowToDenuncia(data as DenunciaRow)
  }
  const local = getLocalDenuncias().find(
    (d) => d.code.toLowerCase() === code.trim().toLowerCase(),
  )
  return local ?? null
}

export async function listAllDenuncias(): Promise<Denuncia[]> {
  if (supabase) {
    const { data } = await supabase
      .from('denuncias')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) return (data as DenunciaRow[]).map(rowToDenuncia)
  }
  return getLocalDenuncias()
}

export async function listMyDenuncias(userId: string): Promise<Denuncia[]> {
  if (supabase) {
    const { data } = await supabase
      .from('denuncias')
      .select('*')
      .eq('created_by', userId)
      .order('created_at', { ascending: false })
    if (data) return (data as DenunciaRow[]).map(rowToDenuncia)
  }
  return getLocalDenuncias().filter((d) => d.createdBy === userId)
}

export async function updateDenunciaStatus(
  id: string,
  status: DenunciaStatus,
  message?: string,
): Promise<Denuncia | null> {
  if (supabase) {
    const { data, error } = await supabase
      .from('denuncias')
      .update({ status, message: message ?? null })
      .eq('id', id)
      .select()
      .single()
    if (!error && data) return rowToDenuncia(data as DenunciaRow)
  }
  const local = getLocalDenuncias()
  const idx = local.findIndex((d) => d.id === id)
  if (idx === -1) return null
  local[idx] = { ...local[idx], status, message: message ?? local[idx].message }
  saveLocalDenuncias(local)
  return local[idx]
}
