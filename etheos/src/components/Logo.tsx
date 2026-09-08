import { ShieldCheck } from 'lucide-react'
import { cn } from '../utils/cn'

interface LogoProps {
  className?: string
  textClassName?: string
}

/** Logotipo/símbolo do ETHEOS: escudo + balança (ética, justiça, confiança). */
export function Logo({ className, textClassName }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 via-brand-600 to-accent-600 text-white shadow-lg shadow-accent-500/30">
        <ShieldCheck className="h-6 w-6" strokeWidth={2.2} />
      </div>
      <span className={cn('text-xl font-extrabold tracking-tight', textClassName)}>
        ETHEOS
      </span>
    </div>
  )
}
