import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { cn } from '@/lib/utils'
import type { RichText as RichTextData } from '@/types/sanity'

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="leading-relaxed text-slate-700">{children}</p>
    ),
    h2: ({ children }) => (
      <h3 className="pt-2 font-display text-xl font-bold text-ink">{children}</h3>
    ),
    h3: ({ children }) => (
      <h4 className="pt-2 font-display text-lg font-bold text-ink">{children}</h4>
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

export function RichText({
  value,
  className,
}: {
  value: RichTextData
  className?: string
}) {
  return (
    <div className={cn('space-y-4', className)}>
      <PortableText value={value} components={components} />
    </div>
  )
}