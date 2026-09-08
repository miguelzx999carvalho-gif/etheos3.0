/** Formata uma data ISO para o formato pt-BR. */
export function formatDate(iso: string): string {
  const date = new Date(iso)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/** Formata uma data por extenso (ex.: "12 de março de 2025"). */
export function formatDateLong(iso: string): string {
  const date = new Date(iso)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
}
