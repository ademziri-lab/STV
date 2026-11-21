import Link from 'next/link'
import { cn } from '@/lib/utils'

function pageList(page: number, totalPages: number) {
  const pages = Array.from(
    new Set([1, page - 1, page, page + 1, totalPages]),
  )
    .filter((p) => p >= 1 && p <= totalPages)
    .sort((a, b) => a - b)

  const result: (number | 'gap')[] = []
  pages.forEach((p, i) => {
    if (i > 0 && p - pages[i - 1] > 1) result.push('gap')
    result.push(p)
  })
  return result
}

const itemClass =
  'inline-flex h-10 min-w-10 items-center justify-center rounded-lg px-3 text-sm font-medium'

export function Pagination({
  page,
  totalPages,
  hrefFor,
}: {
  page: number
  totalPages: number
  hrefFor: (page: number) => string
}) {
  if (totalPages <= 1) return null

  return (
    <nav aria-label="Pagination" className="mt-10">
      <ul className="flex flex-wrap items-center justify-center gap-1.5">
        <li>
          {page > 1 ? (
            <Link
              href={hrefFor(page - 1)}
              rel="prev"
              className={cn(itemClass, 'text-slate-700 hover:bg-slate-100')}
            >
              Précédent
            </Link>
          ) : (
            <span aria-disabled="true" className={cn(itemClass, 'text-slate-400')}>
              Précédent
            </span>
          )}
        </li>

        {pageList(page, totalPages).map((item, i) =>
          item === 'gap' ? (
            <li key={`gap-${i}`} aria-hidden="true" className="px-1 text-slate-400">
              …
            </li>
          ) : (
            <li key={item}>
              {item === page ? (
                <span
                  aria-current="page"
                  className={cn(itemClass, 'bg-brand-700 text-white')}
                >
                  {item}
                </span>
              ) : (
                <Link
                  href={hrefFor(item)}
                  aria-label={`Page ${item}`}
                  className={cn(itemClass, 'text-slate-700 hover:bg-slate-100')}
                >
                  {item}
                </Link>
              )}
            </li>
          ),
        )}

        <li>
          {page < totalPages ? (
            <Link
              href={hrefFor(page + 1)}
              rel="next"
              className={cn(itemClass, 'text-slate-700 hover:bg-slate-100')}
            >
              Suivant
            </Link>
          ) : (
            <span aria-disabled="true" className={cn(itemClass, 'text-slate-400')}>
              Suivant
            </span>
          )}
        </li>
      </ul>
    </nav>
  )
}