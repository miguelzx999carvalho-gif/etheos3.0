import { supabase } from './supabase'
import type { RadarAnswer } from '../types'

/**
 * Serviço do Radar de Ética com Supabase.
 * As respostas são anônimas: não vinculamos quem respondeu.
 */

export interface RadarStore {
  submissions: number
  answers: RadarAnswer[]
}

export async function submitRadar(answers: RadarAnswer[]): Promise<void> {
  const rows = answers.map((a) => ({
    question_id: a.questionId,
    question: a.question,
    score: a.score,
  }))
  await supabase.from('radar_answers').insert(rows)
}

export async function getRadarSummary(): Promise<{
  submissions: number
  byQuestion: { id: string; label: string; avg: number; count: number }[]
  overall: number
}> {
  const { data, error } = await supabase.from('radar_answers').select('question_id, score')
  const rows = (data ?? []) as { question_id: string; score: number }[]

  const map = new Map<string, { total: number; count: number }>()
  for (const a of rows) {
    const cur = map.get(a.question_id) ?? { total: 0, count: 0 }
    cur.total += a.score
    cur.count += 1
    map.set(a.question_id, cur)
  }

  const byQuestion = Array.from(map.entries()).map(([id, v]) => ({
    id,
    label: id,
    avg: v.count > 0 ? v.total / v.count : 0,
    count: v.count,
  }))

  const all = rows.map((r) => r.score)
  const overall = all.length > 0 ? all.reduce((s, x) => s + x, 0) / all.length : 0

  return {
    submissions: error ? 0 : rows.length > 0 ? Math.max(1, Math.floor(rows.length / 6)) : 0,
    byQuestion,
    overall,
  }
}

/**
 * Normaliza a nota para 0-100, invertendo questões onde nota alta é negativa
 * (ex.: favoritismo, injustiça).
 */
export function normalizedScore(questionId: string, avg: number): number {
  const inverted = ['favoritismo', 'injustica']
  if (inverted.includes(questionId)) {
    return Math.round(((5 - avg) / 5) * 100)
  }
  return Math.round((avg / 5) * 100)
}
