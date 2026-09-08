import { supabase } from './supabase'
import type { Denuncia, Category, DenunciaStatus } from '../types'

/**
 * Serviço de denúncias com Supabase.
 * As denúncias ficam em uma tabela isolada no servidor, com Row-Level
 * Security: usuários comuns só leem as próprias; o admin lê e atualiza todas.
 */

interface DenunciaRow {
  id: string
  code: string
  category: string
  description: string
  status: string
  message: string | null
  created_by: string | null
  created_at: string
}

function toDenuncia(row: DenunciaRow): Denuncia {
  return {
    id: row.id,
    code: row.code,
    category: row.category as Category,
    description: row.description,
    status: row.status as DenunciaStatus,
    createdAt: row.created_at,
    createdBy: row.created_by ?? undefined,
    message: row.message ?? undefined,
  }
}

/** Gera um código único no formato ETHEOS-XXXXX. */
function generateCode(): string {
  const n = Math.floor(10000 + Math.random() * 90000) // 5 dígitos
  return `ETHEOS-${n}`
}

export async function createDenuncia(
  category: Category,
  description: string,
  createdBy?: string,
): Promise<Denuncia> {
  // Gera um código que provavelmente é único; o banco garante com a constraint unique.
  const code = generateCode()
  const { data, error } = await supabase
    .from('denuncias')
    .insert({ code, category, description, created_by: createdBy })
    .select()
    .single()
  if (error) throw new Error(error.message)
  return toDenuncia(data as DenunciaRow)
}

export async function getDenunciaByCode(code: string): Promise<Denuncia | null> {
  const { data, error } = await supabase
    .from('denuncias')
    .select('*')
    .ilike('code', code.trim())
    .maybeSingle()
  if (error || !data) return null
  return toDenuncia(data as DenunciaRow)
}

export async function listAllDenuncias(): Promise<Denuncia[]> {
  const { data, error } = await supabase
    .from('denuncias')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) return []
  return (data as DenunciaRow[]).map(toDenuncia)
}

export async function listMyDenuncias(userId: string): Promise<Denuncia[]> {
  const { data, error } = await supabase
    .from('denuncias')
    .select('*')
    .eq('created_by', userId)
    .order('created_at', { ascending: false })
  if (error) return []
  return (data as DenunciaRow[]).map(toDenuncia)
}

export async function updateDenunciaStatus(
  id: string,
  status: DenunciaStatus,
  message?: string,
): Promise<Denuncia | null> {
  const { data, error } = await supabase
    .from('denuncias')
    .update({ status, message: message ?? null })
    .eq('id', id)
    .select()
    .single()
  if (error || !data) return null
  return toDenuncia(data as DenunciaRow)
}
