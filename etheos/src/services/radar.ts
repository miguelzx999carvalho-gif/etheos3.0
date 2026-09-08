import type { RadarAnswer } from '../types'
import { KEYS, read, write } from './storage'

/**
 * Serviço do Radar de Ética.
 * Respostas são anônimas por padrão — não guardamos quem respondeu.
 */

export interface RadarStore {
  submissions: number
  answers: RadarAnswer[]
}

function getStore(): RadarStore {
  return read<RadarStore>(KEYS.radarAnswers, { submissions: 0, answers: [] })
}

function save(store: RadarStore): void {
  write(KEYS.radarAnswers, store)
}

export function submitRadar(answers: RadarAnswer[]): void {
  const store = getStore()
  save({
    submissions: store.submissions + 1,
    answers: [...store.answers, ...answers],
  })
}

export function getRadarSummary(): {
  submissions: number
  byQuestion: { id: string; label: string; avg: number; count: number }[]
  overall: number
} {
  const store = getStore()
  const map = new Map<string, { total: number; count: number }>()
  for (const a of store.answers) {
    const cur = map.get(a.questionId) ?? { total: 0, count: 0 }
    cur.total += a.score
    cur.count += 1
    map.set(a.questionId, cur)
  }

  const byQuestion = Array.from(map.entries()).map(([id, v]) => {
    return { id, label: id, avg: v.count > 0 ? v.total / v.count : 0, count: v.count }
  })

  const all = store.answers
  const overall = all.length > 0 ? all.reduce((s, a) => s + a.score, 0) / all.length : 0

  return { submissions: store.submissions, byQuestion, overall }
}

/**
 * Normaliza as perguntas para que questões com nota invertida
 * (ex.: favoritismo/injustiça) sejam comparáveis no dashboard.
 */
export function normalizedScore(questionId: string, avg: number): number {
  // Perguntas onde nota alta é NEGATIVA para a ética
  const inverted = ['favoritismo', 'injustica']
  if (inverted.includes(questionId)) {
    return Math.round(((5 - avg) / 5) * 100)
  }
  return Math.round((avg / 5) * 100)
}
