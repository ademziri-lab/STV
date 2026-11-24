import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { CategoryCard } from '@/components/catalog/category-card'
import { CategoryProducts } from '@/components/catalog/category-products'
import { ContactCta } from '@/components/sections/contact-cta'
import { Breadcrumb, type Crumb } from '@/components/ui/breadcrumb'
import { Container } from '@/components/ui/container'
import { SanityImage } from '@/components/ui/sanity-image'
import { SectionHeading } from '@/components/ui/section-heading'
import type { RawParams } from '@/lib/catalog'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'
import {
  getCategoryBySlug,
  getCategorySlugs,
  getSiteSettings,
} from '@/sanity/lib/fetchers'

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<RawParams>
}

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

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params
  const [category, settings] = await Promise.all([
    getCategoryBySlug(slug),
    getSiteSettings(),
  ])
  if (!category) notFound()

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

      <Suspense
        fallback={
          <Container className="pb-16">
            <div
              aria-busy="true"
              className="h-72 rounded-2xl bg-slate-100 motion-safe:animate-pulse"
            />
          </Container>
        }
      >
        <CategoryProducts slug={category.slug} searchParams={searchParams} />
      </Suspense>

      <ContactCta phone={settings?.phone ?? site.phone} />
    </>
  )
}