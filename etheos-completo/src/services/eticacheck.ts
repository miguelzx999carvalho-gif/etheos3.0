import type { EticaScenario } from '../types'
import { scenarios } from '../data/scenarios'
import { KEYS, read, write } from './storage'

export interface EticaAnswerRecord {
  scenarioId: string
  selectedOptionIndex: number
  points: number
  maxPoints: number
  at: string
}

interface Stored {
  answers: EticaAnswerRecord[]
  totalPoints: number
}

function getStore(): Stored {
  return read<Stored>(KEYS.eticaAnswers, { answers: [], totalPoints: 0 })
}

function save(store: Stored): void {
  write(KEYS.eticaAnswers, store)
}

export function listScenarios(): EticaScenario[] {
  return scenarios
}

export function getScenarioById(id: string): EticaScenario | undefined {
  return scenarios.find((s) => s.id === id)
}

export function hasAnswered(scenarioId: string): boolean {
  return getStore().answers.some((a) => a.scenarioId === scenarioId)
}

export function getAnsweredIds(): string[] {
  return getStore().answers.map((a) => a.scenarioId)
}

export function saveAnswer(scenarioId: string, optionIndex: number): EticaAnswerRecord {
  const scenario = scenarios.find((s) => s.id === scenarioId)
  if (!scenario) throw new Error('Situação não encontrada')
  const option = scenario.options[optionIndex]
  if (!option) throw new Error('Opção inválida')

  const store = getStore()
  const existing = store.answers.find((a) => a.scenarioId === scenarioId)
  const record: EticaAnswerRecord = {
    scenarioId,
    selectedOptionIndex: optionIndex,
    points: option.points,
    maxPoints: 100,
    at: new Date().toISOString(),
  }

  let answers: EticaAnswerRecord[]
  if (existing) {
    answers = store.answers.map((a) => (a.scenarioId === scenarioId ? record : a))
  } else {
    answers = [...store.answers, record]
  }
  const totalPoints = answers.reduce((sum, a) => sum + a.points, 0)
  save({ answers, totalPoints })
  return record
}

export function getProgress(): {
  answeredCount: number
  totalCount: number
  totalPoints: number
  maxPoints: number
  percentage: number
  scoreLevel: string
} {
  const store = getStore()
  const totalCount = scenarios.length
  const maxPoints = totalCount * 100
  const percentage = totalCount > 0 ? Math.round((store.totalPoints / maxPoints) * 100) : 0
  const scoreLevel =
    percentage >= 90 ? 'Excelente' : percentage >= 70 ? 'Bom' : percentage >= 50 ? 'Regular' : 'Iniciante'
  return {
    answeredCount: store.answers.length,
    totalCount,
    totalPoints: store.totalPoints,
    maxPoints,
    percentage,
    scoreLevel,
  }
}
