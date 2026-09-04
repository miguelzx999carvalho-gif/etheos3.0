import { createClient, SupabaseClient } from '@supabase/supabase-js'

/**
 * Cliente Supabase (backend das denúncias).
 *
 * As chaves vêm de variáveis de ambiente (Vite). Se não estiverem
 * configuradas, `supabase` é `null` e o app volta a usar o localStorage.
 *
 * Configure em um arquivo `.env` (nunca versionado) ou nas variáveis de
 * ambiente da hospedagem (ex.: Vercel).
 */
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null

/** true quando o backend Supabase está configurado. */
export function isSupabaseConfigured(): boolean {
  return !!supabase
}
