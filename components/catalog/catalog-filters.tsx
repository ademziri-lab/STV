import Link from 'next/link'
import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { catalogHref, type CatalogParams } from '@/lib/catalog'
import { cn } from '@/lib/utils'
import type { Brand, Category } from '@/types/sanity'

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

const headingClass =
  'font-display text-sm font-bold tracking-wider text-ink uppercase'

export function CatalogFilters({
  categories,
  brands,
  params,
}: {
  categories: Category[]
  brands: Brand[]
  params: CatalogParams
}) {
  const visibleBrands = brands.filter((brand) => brand.productCount > 0)

  return (
    <div className="space-y-8">
      <form action="/produits" method="get" role="search" className="space-y-3">
        <Input
          label="Rechercher"
          name="q"
          type="search"
          defaultValue={params.q}
          placeholder="Nom ou référence"
          maxLength={60}
        />
        {params.category && (
          <input type="hidden" name="category" value={params.category} />
        )}
        {params.brand && (
          <input type="hidden" name="brand" value={params.brand} />
        )}
        <Button type="submit" className="w-full">
          Rechercher
        </Button>
      </form>

      <nav aria-label="Filtrer par catégorie">
        <h2 className={headingClass}>Catégories</h2>
        <ul className="mt-3 space-y-1">
          <li>
            <FilterLink
              href={catalogHref({ q: params.q, brand: params.brand })}
              active={!params.category}
            >
              Toutes les catégories
            </FilterLink>
          </li>
          {categories.map((category) => {
            const expanded =
              params.category === category.slug ||
              category.children.some((child) => child.slug === params.category)

            return (
              <li key={category._id}>
                <FilterLink
                  href={catalogHref({
                    q: params.q,
                    brand: params.brand,
                    category: category.slug,
                  })}
                  active={params.category === category.slug}
                  count={category.productCount}
                >
                  {category.title}
                </FilterLink>
                {expanded && category.children.length > 0 && (
                  <ul className="mt-1 ml-3 space-y-1 border-l border-slate-200 pl-2">
                    {category.children.map((child) => (
                      <li key={child._id}>
                        <FilterLink
                          href={catalogHref({
                            q: params.q,
                            brand: params.brand,
                            category: child.slug,
                          })}
                          active={params.category === child.slug}
                          count={child.productCount}
                        >
                          {child.title}
                        </FilterLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </nav>

      {visibleBrands.length > 0 && (
        <nav aria-label="Filtrer par marque">
          <h2 className={headingClass}>Marques</h2>
          <ul className="mt-3 space-y-1">
            <li>
              <FilterLink
                href={catalogHref({ q: params.q, category: params.category })}
                active={!params.brand}
              >
                Toutes les marques
              </FilterLink>
            </li>
            {visibleBrands.map((brand) => (
              <li key={brand._id}>
                <FilterLink
                  href={catalogHref({
                    q: params.q,
                    category: params.category,
                    brand: brand.slug,
                  })}
                  active={params.brand === brand.slug}
                  count={brand.productCount}
                >
                  {brand.name}
                </FilterLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}