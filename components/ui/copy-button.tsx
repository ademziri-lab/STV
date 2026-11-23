'use client'

import { useEffect, useRef, useState } from 'react'
import { buttonStyles } from '@/components/ui/button'

export function CopyButton({
  text,
  label,
  className,
}: {
  text: string
  label: string
  className?: string
}) {
  const [state, setState] = useState<'idle' | 'copied' | 'error'>('idle')
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setState('copied')
    } catch {
      setState('error')
    }
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setState('idle'), 2500)
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className={buttonStyles('outline', 'md', className)}
      >
        {state === 'copied'
          ? 'Adresse copiée !'
          : state === 'error'
            ? 'Copie impossible'
            : label}
      </button>
      <span role="status" className="sr-only">
        {state === 'copied'
          ? 'Adresse e-mail copiée dans le presse-papiers'
          : state === 'error'
            ? 'La copie a échoué, copiez l’adresse manuellement'
            : ''}
      </span>
    </>
  )
}