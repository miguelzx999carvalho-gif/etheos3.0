/**
 * Camada de armazenamento do protótipo.
 *
 * AVISO DE SEGURANÇA:
 * Este protótipo armazena tudo no localStorage do navegador (somente
 * demonstração). Os dados NÃO são persistidos em servidor e podem ser
 * acessados por quem usa o mesmo navegador.
 *
 * Para um sistema real, substitua esta camada pelo Supabase/Firebase
 * (ver README → "Evolução para produção").
 */

const PREFIX = 'etheos:'

export const KEYS = {
  users: `${PREFIX}users`,
  session: `${PREFIX}session`,
  denuncias: `${PREFIX}denuncias`,
  eticaAnswers: `${PREFIX}etica-answers`,
  radarAnswers: `${PREFIX}radar-answers`,
  feedback: `${PREFIX}feedback`,
  theme: `${PREFIX}theme`,
}

export function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function write(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // armazenamento indisponível — ignora silenciosamente
  }
}

export function remove(key: string): void {
  try {
    window.localStorage.removeItem(key)
  } catch {
    // ignora
  }
}
