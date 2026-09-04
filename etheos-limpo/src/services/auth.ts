import type { User } from '../types'
import { KEYS, read, write, remove } from './storage'
import { uid } from '../utils/format'

/**
 * Serviço de autenticação do protótipo.
 * Em produção, use Supabase Auth (ver README).
 */

const ADMIN_EMAIL = 'admin@etheos.com'
const ADMIN_PASSWORD = 'admin123'

function ensureAdminSeed(): void {
  const users = read<User[]>(KEYS.users, [])
  if (!users.some((u) => u.email === ADMIN_EMAIL)) {
    const admin: User = {
      id: 'admin-root',
      name: 'Administrador',
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: 'admin',
      createdAt: new Date().toISOString(),
    }
    write(KEYS.users, [...users, admin])
  }
}

function getUsers(): User[] {
  ensureAdminSeed()
  return read<User[]>(KEYS.users, [])
}

export function register(name: string, email: string, password: string): { ok: boolean; message: string } {
  const users = getUsers()
  const normalized = email.trim().toLowerCase()
  if (users.some((u) => u.email === normalized)) {
    return { ok: false, message: 'Já existe uma conta com este e-mail.' }
  }
  const user: User = {
    id: uid(),
    name: name.trim(),
    email: normalized,
    password,
    role: 'user',
    createdAt: new Date().toISOString(),
  }
  write(KEYS.users, [...users, user])
  write(KEYS.session, user.id)
  return { ok: true, message: 'Conta criada com sucesso.' }
}

export function login(email: string, password: string): { ok: boolean; message: string } {
  const users = getUsers()
  const normalized = email.trim().toLowerCase()
  const user = users.find((u) => u.email === normalized)
  if (!user || user.password !== password) {
    return { ok: false, message: 'E-mail ou senha inválidos.' }
  }
  write(KEYS.session, user.id)
  return { ok: true, message: 'Login realizado.' }
}

export function logout(): void {
  remove(KEYS.session)
}

export function getCurrentUser(): User | null {
  const sessionId = read<string | null>(KEYS.session, null)
  if (!sessionId) return null
  const users = getUsers()
  return users.find((u) => u.id === sessionId) ?? null
}

export function updateUserProfile(
  userId: string,
  data: { name?: string; email?: string; password?: string },
): { ok: boolean; message: string } {
  const users = getUsers()
  const idx = users.findIndex((u) => u.id === userId)
  if (idx === -1) return { ok: false, message: 'Usuário não encontrado.' }
  const email = data.email?.trim().toLowerCase()
  if (email && users.some((u) => u.email === email && u.id !== userId)) {
    return { ok: false, message: 'Este e-mail já está em uso.' }
  }
  const updated: User = {
    ...users[idx],
    name: data.name ?? users[idx].name,
    email: email ?? users[idx].email,
    password: data.password ?? users[idx].password,
  }
  users[idx] = updated
  write(KEYS.users, users)
  return { ok: true, message: 'Perfil atualizado.' }
}

/** Somente para demonstração — expose credenciais de acesso. */
export function getAdminCredentials(): { email: string; password: string } {
  return { email: ADMIN_EMAIL, password: ADMIN_PASSWORD }
}
