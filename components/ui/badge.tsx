import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const variants = {
  brand: 'bg-brand-100 text-brand-900',
  neutral: 'bg-slate-100 text-slate-700',
  outline: 'border border-slate-300 text-slate-700',
}

type BadgeProps = {
  variant?: keyof typeof variants
  className?: string
  children: ReactNode
}

export function Badge({ variant = 'brand', className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}