import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ProductCard } from '@/components/catalog/product-card'
import { ProductGallery } from '@/components/catalog/product-gallery'
import { SpecsTable } from '@/components/catalog/specs-table'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb, type Crumb } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { RichText } from '@/components/ui/rich-text'
import { catalogHref } from '@/lib/catalog'
import { formatFileSize } from '@/lib/format'
import { sanityUrl } from '@/lib/sanity-image'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'
import {
  getProductBySlug,
  getProductSlugs,
  getSiteSettings,
} from '@/sanity/lib/fetchers'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = await getProductSlugs()
  // Cache Components exige au moins une valeur, même sans produit
  return (slugs.length > 0 ? slugs : ['aucun']).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: 'Produit introuvable' }

  const title = product.seoTitle ?? product.name
  const description = (product.seoDescription ?? product.shortDescription).slice(0, 160)
  const image = product.images?.[0]

  return {
    title,
    description,
    alternates: { canonical: `/produits/${product.slug}` },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'fr_TN',
      ...(image
        ? { images: [{ url: sanityUrl(image.url, 1200), alt: image.alt || product.name }] }
        : {}),
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const [product, settings] = await Promise.all([
    getProductBySlug(slug),
    getSiteSettings(),
  ])
  if (!product) notFound()

  const images = (product.images ?? []).filter((image) => image.url)
  const documents = (product.documents ?? []).filter((doc) => doc.url)
  const specs = product.specifications ?? []
  const hasDescription = Boolean(product.description && product.description.length > 0)
  const { category, brand } = product

  const crumbs: Crumb[] = [
    { label: 'Accueil', href: '/' },
    { label: 'Produits', href: '/produits' },
    ...(category?.parent
      ? [{ label: category.parent.title, href: `/categories/${category.parent.slug}` }]
      : []),
    ...(category
      ? [{ label: category.title, href: `/categories/${category.slug}` }]
      : []),
    { label: product.name },
  ]

  // Le formulaire de contact (étape 12) lira ces deux paramètres
  const quoteParams = new URLSearchParams({ produit: product.name })
  if (product.sku) quoteParams.set('ref', product.sku)
  const quoteHref = `/contact?${quoteParams.toString()}`

  // Données structurées pour Google : produit et fil d'Ariane, sans prix
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        name: product.name,
        description: product.shortDescription,
        sku: product.sku ?? undefined,
        image: images.length > 0 ? images.map((image) => image.url) : undefined,
        brand: brand ? { '@type': 'Brand', name: brand.name } : undefined,
        url: `${base}/produits/${product.slug}`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((crumb, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: crumb.label,
          ...(crumb.href ? { item: `${base}${crumb.href}` } : {}),
        })),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <section className="py-10 lg:py-14">
        <Container>
          <Breadcrumb items={crumbs} />

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="lg:sticky lg:top-24 lg:self-start">
              {images.length > 0 ? (
                <ProductGallery images={images} name={product.name} />
              ) : (
                <div className="aspect-[4/3] rounded-2xl bg-brand-50" />
              )}
            </div>

            <div>
              <div className="flex flex-wrap gap-2">
                                                {brand && (
                  <Link href={catalogHref({ brand: brand.slug })}>
                    <Badge>{brand.name}</Badge>
                  </Link>
                )}
                {category && (
                  <Link href={`/categories/${category.slug}`}>
                    <Badge variant="neutral">{category.title}</Badge>
                  </Link>
                )}
              </div>

              <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                {product.name}
              </h1>
              {product.sku && (
                <p className="mt-2 text-sm text-slate-500">Référence : {product.sku}</p>
              )}
              <p className="mt-5 text-lg leading-relaxed text-slate-600">
                {product.shortDescription}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={quoteHref} size="lg">
                  Demander un devis
                </Button>
                {product.manufacturerUrl && (
                  <Button
                    href={product.manufacturerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    size="lg"
                  >
                    Site du fabricant
                    <span className="sr-only"> (nouvel onglet)</span>
                  </Button>
                )}
              </div>

              {documents.length > 0 && (
                <div className="mt-10">
                  <h2 className="font-display text-lg font-bold text-ink">
                    Documentation
                  </h2>
                  <ul className="mt-3 space-y-2">
                    {documents.map((doc, i) => (
                      <li key={`${i}-${doc.title}`}>
                        <a
                          href={doc.url ?? undefined}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-brand-300 hover:bg-brand-50"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            className="size-6 shrink-0 text-brand-700"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                            <path d="M14 3v5h5M9 13h6M9 17h6" />
                          </svg>
                          <span className="flex-1">
                            <span className="block font-medium text-ink">{doc.title}</span>
                            <span className="block text-xs text-slate-500">
                              PDF{doc.size ? ` · ${formatFileSize(doc.size)}` : ''}
                            </span>
                          </span>
                          <span className="sr-only">(PDF, s’ouvre dans un nouvel onglet)</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="mt-8 text-sm text-slate-600">
                Besoin d’un conseil ? Appelez-nous au{' '}
                <a
                  href={`tel:${(settings?.phone ?? site.phone).replaceAll(' ', '')}`}
                  className="font-medium text-brand-700 hover:underline"
                >
                  {settings?.phone ?? site.phone}
                </a>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>

      {(hasDescription || specs.length > 0) && (
        <section className="border-t border-slate-200 py-12 lg:py-16">
          <Container
            className={cn(
              'grid gap-12',
              hasDescription && specs.length > 0 && 'lg:grid-cols-2',
            )}
          >
            {hasDescription && product.description && (
              <div>
                <h2 className="font-display text-2xl font-bold text-ink">Description</h2>
                <RichText value={product.description} className="mt-5" />
              </div>
            )}
            {specs.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-bold text-ink">
                  Caractéristiques techniques
                </h2>
                <div className="mt-5">
                  <SpecsTable specs={specs} />
                </div>
              </div>
            )}
          </Container>
        </section>
      )}

      {product.related.length > 0 && (
        <section className="bg-surface py-12 lg:py-16">
          <Container>
            <h2 className="font-display text-2xl font-bold text-ink">
              Produits similaires
            </h2>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {product.related.map((item) => (
                <li key={item._id} className="h-full">
                  <ProductCard product={item} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  )
}