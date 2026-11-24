import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { PAGE_SIZE, parseCatalogParams, type RawParams } from '@/lib/catalog'
import { getProducts } from '@/sanity/lib/fetchers'
import { Pagination } from './pagination'
import { ProductCard } from './product-card'

export async function CategoryProducts({
  slug,
  searchParams,
}: {
  slug: string
  searchParams: Promise<RawParams>
}) {
  const { page } = parseCatalogParams(await searchParams)
  const { items, total } = await getProducts({
    q: '',
    category: slug,
    brand: '',
    page,
  })
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const hrefFor = (n: number) =>
    n > 1 ? `/categories/${slug}?page=${n}` : `/categories/${slug}`

  return (
    <section aria-labelledby="produits-categorie" className="pb-16 lg:pb-20">
      <Container>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2
            id="produits-categorie"
            className="font-display text-2xl font-bold text-ink"
          >
            Produits
          </h2>
          <p role="status" className="text-sm text-slate-600">
            {total} produit{total > 1 ? 's' : ''}
            {totalPages > 1 && ` · page ${page} sur ${totalPages}`}
          </p>
        </div>

        {items.length > 0 ? (
          <>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((product) => (
                <li key={product._id} className="h-full">
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
            <Pagination page={page} totalPages={totalPages} hrefFor={hrefFor} />
          </>
        ) : total > 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-10 text-center">
            <p className="font-display text-lg font-bold text-ink">
              Cette page n’existe pas.
            </p>
            <Button href={hrefFor(1)} variant="outline" className="mt-6">
              Première page
            </Button>
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-10 text-center">
            <p className="font-display text-lg font-bold text-ink">
              Aucun produit dans cette catégorie pour le moment.
            </p>
            <p className="mt-2 text-slate-600">
              Parcourez le catalogue complet ou contactez-nous.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button href="/produits" variant="outline">
                Voir le catalogue
              </Button>
              <Button href="/contact">Nous contacter</Button>
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}