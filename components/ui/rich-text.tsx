import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { cn } from '@/lib/utils'
import type { RichText as RichTextData } from '@/types/sanity'

// topLevel : niveau de titre utilisé pour le style "Titre" du Studio.
// 3 sur la page produit (qui a déjà ses h1 et h2), 2 sur la page À propos.
function buildComponents(topLevel: 2 | 3): PortableTextComponents {
  const Title = topLevel === 2 ? 'h2' : 'h3'
  const Subtitle = topLevel === 2 ? 'h3' : 'h4'

  return {
    block: {
      normal: ({ children }) => (
        <p className="leading-relaxed text-slate-700">{children}</p>
      ),
      h2: ({ children }) => (
        <Title className="pt-2 font-display text-xl font-bold text-ink">
          {children}
        </Title>
      ),
      h3: ({ children }) => (
        <Subtitle className="pt-2 font-display text-lg font-bold text-ink">
          {children}
        </Subtitle>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="list-disc space-y-1.5 pl-6 text-slate-700 marker:text-brand-600">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="list-decimal space-y-1.5 pl-6 text-slate-700 marker:text-brand-600">
          {children}
        </ol>
      ),
    },
  }
}

export function RichText({
  value,
  className,
  topLevel = 3,
}: {
  value: RichTextData
  className?: string
  topLevel?: 2 | 3
}) {
  return (
    <div className={cn('space-y-4', className)}>
      <PortableText value={value} components={buildComponents(topLevel)} />
    </div>
  )
}