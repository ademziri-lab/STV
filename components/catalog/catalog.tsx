import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  catalogHref,
  PAGE_SIZE,
  parseCatalogParams,
  type CatalogParams,
  type RawParams,
} from '@/lib/catalog'
import { getBrands, getProducts } from '@/sanity/lib/fetchers'
import { BrandFilter, CatalogSearch } from './catalog-filters'
import { FiltersPanel } from './filters-panel'
import { Pagination } from './pagination'
import { ProductCard } from './product-card'

export async function Catalog({
  searchParams,
}: {
  searchParams: Promise<RawParams>
}) {
  const raw = parseCatalogParams(await searchParams)
  const brands = await getBrands()
  const knownBrands = new Set(brands.map((brand) => brand.slug))

  // Seules la recherche et la marque sont prises en compte
  const params: CatalogParams = {
    ...raw,
    category: '',
    brand: knownBrands.has(raw.brand) ? raw.brand : '',
  }

  const { items, total } = await getProducts(params)
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const hasBrandFilter = brands.some((brand) => brand.productCount > 0)

  const chips = [
    params.q && {
      label: `« ${params.q} »`,
      href: catalogHref({ brand: params.brand }),
    },
    params.brand && {
      label: brands.find((brand) => brand.slug === params.brand)?.name ?? params.brand,
      href: catalogHref({ q: params.q }),
    },
  ].filter((chip): chip is { label: string; href: string } => Boolean(chip))

  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-[17rem_1fr]">
      <aside aria-label="Recherche et filtres" className="space-y-6">
        <CatalogSearch params={params} />
        {hasBrandFilter && (
          <FiltersPanel
            key={params.brand}
            label="Marques"
            activeCount={params.brand ? 1 : 0}
          >
            <BrandFilter brands={brands} params={params} />
          </FiltersPanel>
        )}
      </aside>

      <section aria-labelledby="resultats">
        <h2 id="resultats" className="sr-only">
          Résultats
        </h2>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p role="status" className="text-sm text-slate-600">
            {total} produit{total > 1 ? 's' : ''}
            {totalPages > 1 && ` · page ${params.page} sur ${totalPages}`}
          </p>
          {chips.length > 0 && (
            <ul className="flex flex-wrap items-center gap-2">
              {chips.map((chip) => (
                <li key={chip.href}>
                  <Link
                    href={chip.href}
                    className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-sm font-medium text-brand-900 transition-colors hover:bg-brand-200"
                  >
                    {chip.label}
                    <span aria-hidden="true">×</span>
                    <span className="sr-only"> (retirer ce filtre)</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/produits"
                  className="text-sm font-medium text-brand-700 underline-offset-4 hover:underline"
                >
                  Tout effacer
                </Link>
              </li>
            </ul>
          )}
        </div>

        {items.length > 0 ? (
          <>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((product) => (
                <li key={product._id} className="h-full">
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
            <Pagination
              page={params.page}
              totalPages={totalPages}
              hrefFor={(page) => catalogHref({ ...params, page })}
            />
          </>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-10 text-center">
            <p className="font-display text-lg font-bold text-ink">
              {total > 0
                ? 'Cette page n’existe pas.'
                : chips.length > 0
                  ? 'Aucun produit ne correspond à votre recherche.'
                  : 'Aucun produit pour le moment.'}
            </p>
            <p className="mt-2 text-slate-600">
              {total > 0
                ? 'Revenez à la première page des résultats.'
                : chips.length > 0
                  ? 'Essayez avec d’autres mots, ou retirez un filtre.'
                  : 'Revenez bientôt, le catalogue est en cours de mise à jour.'}
            </p>
            {(total > 0 || chips.length > 0) && (
              <Button
                href={total > 0 ? catalogHref({ ...params, page: 1 }) : '/produits'}
                variant="outline"
                className="mt-6"
              >
                {total > 0 ? 'Première page' : 'Tout effacer'}
              </Button>
            )}
          </div>
        )}
      </section>
    </div>
  )
}

// Affiché pendant le chargement des résultats
export function CatalogSkeleton() {
  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-[17rem_1fr]" aria-busy="true">
      <div className="hidden h-64 rounded-2xl bg-slate-100 motion-safe:animate-pulse lg:block" />
      <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <li
            key={i}
            className="h-72 rounded-2xl bg-slate-100 motion-safe:animate-pulse"
          />
        ))}
      </ul>
    </div>
  )
}