import type { ReactNode } from 'react'
import { cn } from '../utils/cn'

interface StatCardProps {
  title: string
  value: ReactNode
  icon: ReactNode
  hint?: string
  className?: string
  accent?: boolean
}

export function StatCard({ title, value, icon, hint, className, accent }: StatCardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-gray-900',
        className,
      )}
    >
      <div
        className={cn(
          'mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl',
          accent
            ? 'bg-gradient-to-br from-brand-600 to-accent-600 text-white'
            : 'bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200',
        )}
      >
        {icon}
      </div>
      <p className="text-2xl font-extrabold text-gray-900 dark:text-gray-50">{value}</p>
      <p className="mt-0.5 text-sm font-medium text-gray-600 dark:text-gray-300">{title}</p>
      {hint && <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{hint}</p>}
    </div>
  )
}
