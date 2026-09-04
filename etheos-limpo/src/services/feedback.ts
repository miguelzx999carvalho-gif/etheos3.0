import { KEYS, read, write } from './storage'

export interface Feedback {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
}

function getFeedback(): Feedback[] {
  return read<Feedback[]>(KEYS.feedback, [])
}

export function submitFeedback(data: Omit<Feedback, 'id' | 'createdAt'>): Feedback {
  const feedback: Feedback = {
    ...data,
    id: crypto.randomUUID?.() ?? `f-${Date.now()}`,
    createdAt: new Date().toISOString(),
  }
  write(KEYS.feedback, [feedback, ...getFeedback()])
  return feedback
}

export function listFeedback(): Feedback[] {
  return getFeedback()
}
