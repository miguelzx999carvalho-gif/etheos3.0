import { createClient } from '@supabase/supabase-js'

/**
 * Cliente Supabase do ETHEOS.
 * As chaves são lidas de variáveis de ambiente (VITE_...) e NUNCA
 * devem ser commitadas no Git — veja o arquivo .env.example.
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
