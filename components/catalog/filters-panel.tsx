'use client'

import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function FiltersPanel({
  label = 'Filtres',
  activeCount,
  children,
}: {
  label?: string
  activeCount: number
  children: ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="filtres-catalogue"
        className="flex w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-4 py-3 text-left font-medium text-ink lg:hidden"
      >
        <span>
          {label}
          {activeCount > 0 && ` (${activeCount})`}
        </span>
        <svg
          viewBox="0 0 24 24"
          className={cn('size-5 transition-transform', open && 'rotate-180')}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div
        id="filtres-catalogue"
        className={cn('mt-4 lg:mt-0 lg:block', open ? 'block' : 'hidden')}
      >
        {children}
      </div>
    </div>
  )
}