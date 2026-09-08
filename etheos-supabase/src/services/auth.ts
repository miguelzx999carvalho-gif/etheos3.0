import { supabase } from './supabase'
import type { User } from '../types'

/**
 * Serviço de autenticação usando Supabase Auth.
 * As senhas são gerenciadas pelo próprio Supabase (hash seguro no servidor).
 */

interface ProfileRow {
  id: string
  name: string | null
  email: string | null
  role: 'user' | 'admin'
  created_at: string
}

/** Converte uma linha de profile para o tipo User. */
function toUser(row: ProfileRow): User {
  return {
    id: row.id,
    name: row.name ?? 'Usuário',
    email: row.email ?? '',
    role: row.role,
    createdAt: row.created_at,
  }
}

async function fetchProfile(userId: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, name, email, role, created_at')
    .eq('id', userId)
    .maybeSingle()
  if (error || !data) return null
  return toUser(data as ProfileRow)
}

export async function register(
  name: string,
  email: string,
  password: string,
): Promise<{ ok: boolean; message: string }> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  })
  if (error) return { ok: false, message: error.message }
  // O trigger cria o profile automaticamente
  if (data.user) {
    // Pequena espera para o trigger propagar antes de buscar o perfil
    await new Promise((r) => setTimeout(r, 800))
  }
  return { ok: true, message: 'Conta criada com sucesso.' }
}

export async function login(
  email: string,
  password: string,
): Promise<{ ok: boolean; message: string }> {
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { ok: false, message: error.message }
  return { ok: true, message: 'Login realizado.' }
}

export async function logout(): Promise<void> {
  await supabase.auth.signOut()
}

export async function getCurrentUser(): Promise<User | null> {
  const { data } = await supabase.auth.getSession()
  const user = data.session?.user
  if (!user) return null
  return fetchProfile(user.id)
}

export async function resetPassword(email: string): Promise<{ ok: boolean; message: string }> {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + '/atualizar-senha',
  })
  if (error) return { ok: false, message: error.message }
  return { ok: true, message: 'Enviamos um link de redefinição para o seu e-mail.' }
}

export async function updatePassword(newPassword: string): Promise<{ ok: boolean; message: string }> {
  const { error } = await supabase.auth.updateUser({ password: newPassword })
  if (error) return { ok: false, message: error.message }
  return { ok: true, message: 'Senha atualizada com sucesso.' }
}

export async function updateUserProfile(
  userId: string,
  data: { name?: string; email?: string; password?: string },
): Promise<{ ok: boolean; message: string }> {
  if (data.name) {
    const { error } = await supabase
      .from('profiles')
      .update({ name: data.name })
      .eq('id', userId)
    if (error) return { ok: false, message: error.message }
  }
  if (data.email) {
    const { error } = await supabase.auth.updateUser({ email: data.email })
    if (error) return { ok: false, message: error.message }
  }
  if (data.password) {
    const { error } = await supabase.auth.updateUser({ password: data.password })
    if (error) return { ok: false, message: error.message }
  }
  return { ok: true, message: 'Perfil atualizado.' }
}
