import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CategoryCard } from '@/components/catalog/category-card'
import { ProductCard } from '@/components/catalog/product-card'
import { ContactCta } from '@/components/sections/contact-cta'
import { Breadcrumb, type Crumb } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { SanityImage } from '@/components/ui/sanity-image'
import { SectionHeading } from '@/components/ui/section-heading'
import { catalogHref, PAGE_SIZE } from '@/lib/catalog'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'
import {
  getCategoryBySlug,
  getCategorySlugs,
  getProducts,
  getSiteSettings,
} from '@/sanity/lib/fetchers'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = await getCategorySlugs()
  // Cache Components exige au moins une valeur, même sans catégorie
  return (slugs.length > 0 ? slugs : ['aucune']).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  if (!category) return { title: 'Catégorie introuvable' }

  return {
    title: category.title,
    description: (
      category.description ??
      `Découvrez les produits de la catégorie ${category.title} chez STV.`
    ).slice(0, 160),
    alternates: { canonical: `/categories/${category.slug}` },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  if (!category) notFound()

  const [{ items, total }, settings] = await Promise.all([
    getProducts({ q: '', category: category.slug, brand: '', page: 1 }),
    getSiteSettings(),
  ])

  const children = category.children.filter((child) => child.productCount > 0)

  const crumbs: Crumb[] = [
    { label: 'Accueil', href: '/' },
    { label: 'Produits', href: '/produits' },
    ...(category.parent
      ? [{ label: category.parent.title, href: `/categories/${category.parent.slug}` }]
      : []),
    { label: category.title },
  ]

  return (
    <>
      <section className="bg-linear-to-b from-brand-50 to-white">
        <Container className="py-10 lg:py-14">
          <Breadcrumb items={crumbs} />
          <div
            className={cn(
              'mt-6 grid items-center gap-8',
              category.image && 'lg:grid-cols-[1fr_24rem]',
            )}
          >
            <SectionHeading
              as="h1"
              eyebrow={category.parent ? category.parent.title : 'Catégorie'}
              title={category.title}
              description={category.description ?? undefined}
            />
            {category.image && (
              <SanityImage
                image={category.image}
                sizes="(min-width: 1024px) 384px, 100vw"
                className="h-auto w-full rounded-2xl"
              />
            )}
          </div>
        </Container>
      </section>

      {children.length > 0 && (
        <section aria-labelledby="sous-categories" className="pt-4 pb-12 lg:pb-16">
          <Container>
            <h2
              id="sous-categories"
              className="font-display text-2xl font-bold text-ink"
            >
              Sous-catégories
            </h2>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {children.map((child) => (
                <li key={child._id}>
                  <CategoryCard category={child} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <section aria-labelledby="produits-categorie" className="pb-16 lg:pb-20">
        <Container>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2
              id="produits-categorie"
              className="font-display text-2xl font-bold text-ink"
            >
              Produits
            </h2>
            <p className="text-sm text-slate-600">
              {total} produit{total > 1 ? 's' : ''}
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
              {total > PAGE_SIZE && (
                <div className="mt-10 text-center">
                  <Button
                    href={catalogHref({ category: category.slug })}
                    variant="outline"
                    size="lg"
                  >
                    Voir les {total} produits
                  </Button>
                </div>
              )}
            </>
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

      <ContactCta phone={settings?.phone ?? site.phone} />
    </>
  )
}