import { supabase } from './supabase'
import type { EticaScenario } from '../types'
import { scenarios } from '../data/scenarios'

/**
 * Serviço do ÉticaCheck com Supabase.
 * O progresso fica no servidor, vinculado ao usuário autenticado.
 */

export interface EticaAnswerRecord {
  scenarioId: string
  selectedOptionIndex: number
  points: number
  maxPoints: number
  at: string
}

interface AnswerRow {
  scenario_id: string
  selected_option: number
  points: number
  created_at: string
}

export function listScenarios(): EticaScenario[] {
  return scenarios
}

export function getScenarioById(id: string): EticaScenario | undefined {
  return scenarios.find((s) => s.id === id)
}

async function fetchAnswers(userId: string): Promise<EticaAnswerRecord[]> {
  const { data, error } = await supabase
    .from('eticacheck_answers')
    .select('scenario_id, selected_option, points, created_at')
    .eq('user_id', userId)
  if (error) return []
  return (data as AnswerRow[]).map((r) => ({
    scenarioId: r.scenario_id,
    selectedOptionIndex: r.selected_option,
    points: r.points,
    maxPoints: 100,
    at: r.created_at,
  }))
}

export async function getAnswers(userId: string): Promise<EticaAnswerRecord[]> {
  return fetchAnswers(userId)
}

export async function saveAnswer(
  userId: string,
  scenarioId: string,
  optionIndex: number,
): Promise<EticaAnswerRecord | null> {
  const scenario = scenarios.find((s) => s.id === scenarioId)
  if (!scenario) return null
  const option = scenario.options[optionIndex]
  if (!option) return null

  const { error } = await supabase.from('eticacheck_answers').upsert(
    {
      user_id: userId,
      scenario_id: scenarioId,
      selected_option: optionIndex,
      points: option.points,
    },
    { onConflict: 'user_id,scenario_id' },
  )
  if (error) return null

  return {
    scenarioId,
    selectedOptionIndex: optionIndex,
    points: option.points,
    maxPoints: 100,
    at: new Date().toISOString(),
  }
}

export async function getProgress(
  userId: string,
): Promise<{
  answeredCount: number
  totalCount: number
  totalPoints: number
  maxPoints: number
  percentage: number
  scoreLevel: string
}> {
  const answers = await fetchAnswers(userId)
  const totalCount = scenarios.length
  const maxPoints = totalCount * 100
  const totalPoints = answers.reduce((sum, a) => sum + a.points, 0)
  const percentage = totalCount > 0 ? Math.round((totalPoints / maxPoints) * 100) : 0
  const scoreLevel =
    percentage >= 90 ? 'Excelente' : percentage >= 70 ? 'Bom' : percentage >= 50 ? 'Regular' : 'Iniciante'
  return {
    answeredCount: answers.length,
    totalCount,
    totalPoints,
    maxPoints,
    percentage,
    scoreLevel,
  }
}

export async function getAnsweredIds(userId: string): Promise<string[]> {
  const answers = await fetchAnswers(userId)
  return answers.map((a) => a.scenarioId)
}
