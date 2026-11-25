import Link from 'next/link'
import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { catalogHref, type CatalogParams } from '@/lib/catalog'
import { cn } from '@/lib/utils'
import type { Brand } from '@/types/sanity'

export function CatalogSearch({ params }: { params: CatalogParams }) {
  return (
    <form
      key={params.q}
      action="/produits"
      method="get"
      role="search"
      className="space-y-3"
    >
      <Input
        label="Rechercher"
        name="q"
        type="search"
        defaultValue={params.q}
        placeholder="Nom ou référence"
        maxLength={60}
      />
      {params.brand && <input type="hidden" name="brand" value={params.brand} />}
      <Button type="submit" className="w-full">
        Rechercher
      </Button>
    </form>
  )
}

function FilterLink({
  href,
  active,
  count,
  children,
}: {
  href: string
  active: boolean
  count?: number
  children: ReactNode
}) {
  return (
    <Link
      href={href}
      aria-current={active ? 'true' : undefined}
      className={cn(
        'flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition-colors',
        active
          ? 'bg-brand-50 font-semibold text-brand-800'
          : 'text-slate-700 hover:bg-slate-100',
      )}
    >
      <span>{children}</span>
      {count !== undefined && (
        <span className="text-xs text-slate-500">{count}</span>
      )}
    </Link>
  )
}

export function BrandFilter({
  brands,
  params,
}: {
  brands: Brand[]
  params: CatalogParams
}) {
  const visible = brands.filter((brand) => brand.productCount > 0)
  if (visible.length === 0) return null

  return (
    <nav aria-label="Filtrer par marque">
      <h2 className="font-display text-sm font-bold tracking-wider text-ink uppercase">
        Marques
      </h2>
      <ul className="mt-3 space-y-1">
        <li>
          <FilterLink
            href={catalogHref({ q: params.q })}
            active={!params.brand}
          >
            Toutes les marques
          </FilterLink>
        </li>
        {visible.map((brand) => (
          <li key={brand._id}>
            <FilterLink
              href={catalogHref({ q: params.q, brand: brand.slug })}
              active={params.brand === brand.slug}
              count={brand.productCount}
            >
              {brand.name}
            </FilterLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}