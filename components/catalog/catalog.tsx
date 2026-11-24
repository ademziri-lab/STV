import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  catalogHref,
  PAGE_SIZE,
  parseCatalogParams,
  type RawParams,
} from '@/lib/catalog'
import { getProducts } from '@/sanity/lib/fetchers'
import { Pagination } from './pagination'
import { ProductCard } from './product-card'

export async function Catalog({
  searchParams,
}: {
  searchParams: Promise<RawParams>
}) {
  // Le catalogue ne propose que la recherche : catégorie et marque sont ignorées
  const params = {
    ...parseCatalogParams(await searchParams),
    category: '',
    brand: '',
  }

  const { items, total } = await getProducts(params)
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  return (
    <div className="mt-10">
      <form
        key={params.q}
        action="/produits"
        method="get"
        role="search"
        className="flex flex-col gap-3 sm:flex-row sm:items-end"
      >
        <div className="flex-1">
          <Input
            label="Rechercher un produit"
            name="q"
            type="search"
            defaultValue={params.q}
            placeholder="Nom ou référence"
            maxLength={60}
          />
        </div>
        <Button type="submit">Rechercher</Button>
      </form>

      <section aria-labelledby="resultats" className="mt-8">
        <h2 id="resultats" className="sr-only">
          Résultats
        </h2>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p role="status" className="text-sm text-slate-600">
            {total} produit{total > 1 ? 's' : ''}
            {params.q && <> pour « {params.q} »</>}
            {totalPages > 1 && ` · page ${params.page} sur ${totalPages}`}
          </p>
          {params.q && (
            <Link
              href="/produits"
              className="text-sm font-medium text-brand-700 underline-offset-4 hover:underline"
            >
              Effacer la recherche
            </Link>
          )}
        </div>

        {items.length > 0 ? (
          <>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                : params.q
                  ? 'Aucun produit ne correspond à votre recherche.'
                  : 'Aucun produit pour le moment.'}
            </p>
            <p className="mt-2 text-slate-600">
              {total > 0
                ? 'Revenez à la première page des résultats.'
                : params.q
                  ? 'Essayez avec d’autres mots.'
                  : 'Revenez bientôt, le catalogue est en cours de mise à jour.'}
            </p>
            {(total > 0 || params.q) && (
              <Button
                href={total > 0 ? catalogHref({ ...params, page: 1 }) : '/produits'}
                variant="outline"
                className="mt-6"
              >
                {total > 0 ? 'Première page' : 'Effacer la recherche'}
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
    <div className="mt-10" aria-busy="true">
      <div className="h-20 rounded-2xl bg-slate-100 motion-safe:animate-pulse" />
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <li
            key={i}
            className="h-72 rounded-2xl bg-slate-100 motion-safe:animate-pulse"
          />
        ))}
      </ul>
    </div>
  )
}