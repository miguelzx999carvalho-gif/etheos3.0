import type { ReactNode } from 'react'
import { cn } from '../utils/cn'

type Tone = 'brand' | 'accent' | 'green' | 'amber' | 'red' | 'gray'

const tones: Record<Tone, string> = {
  brand: 'bg-brand-100 text-brand-800 dark:bg-brand-900/40 dark:text-brand-200',
  accent: 'bg-accent-100 text-accent-800 dark:bg-accent-900/40 dark:text-accent-200',
  green: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200',
  amber: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200',
  red: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200',
  gray: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
}

export function Badge({
  tone = 'gray',
  children,
  className,
}: {
  tone?: Tone
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

export const statusTone: Record<string, Tone> = {
  recebida: 'gray',
  'em-analise': 'amber',
  'em-investigacao': 'accent',
  resolvida: 'green',
}
