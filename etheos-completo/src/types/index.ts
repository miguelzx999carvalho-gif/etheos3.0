export type Category =
  | 'assedio-moral'
  | 'assedio-sexual'
  | 'discriminacao'
  | 'preconceito'
  | 'corrupcao'
  | 'favorecimento'
  | 'privacidade'
  | 'outros'

export type DenunciaStatus =
  | 'recebida'
  | 'em-analise'
  | 'em-investigacao'
  | 'resolvida'

export interface Denuncia {
  id: string
  code: string
  category: Category
  description: string
  status: DenunciaStatus
  createdAt: string
  createdBy?: string
  message?: string
}

export interface EticaOption {
  text: string
  points: number
  isBest: boolean
}

export interface EticaScenario {
  id: string
  category: string
  title: string
  situation: string
  options: EticaOption[]
  explanation: string
  values: string[]
  consequences: string[]
}

export interface RadarAnswer {
  questionId: string
  question: string
  score: number // 1 a 5
}

export interface User {
  id: string
  name: string
  email: string
  password: string
  role: 'user' | 'admin'
  createdAt: string
}

export const CATEGORY_LABELS: Record<Category, string> = {
  'assedio-moral': 'Assédio moral',
  'assedio-sexual': 'Assédio sexual',
  discriminacao: 'Discriminação',
  preconceito: 'Preconceito',
  corrupcao: 'Corrupção',
  favorecimento: 'Favorecimento',
  privacidade: 'Violação de privacidade',
  outros: 'Outros',
}

export const STATUS_LABELS: Record<DenunciaStatus, string> = {
  recebida: 'Recebida',
  'em-analise': 'Em análise',
  'em-investigacao': 'Em investigação',
  resolvida: 'Resolvida',
}

export const SCENARIO_CATEGORY_LABELS: Record<string, string> = {
  'assedio-moral': 'Assédio moral',
  'assedio-sexual': 'Assédio sexual',
  discriminacao: 'Discriminação',
  preconceito: 'Preconceito',
  corrupcao: 'Corrupção',
  favorecimento: 'Favorecimento',
  privacidade: 'Privacidade',
  honestidade: 'Honestidade',
  responsabilidade: 'Responsabilidade',
  outros: 'Outros',
}
