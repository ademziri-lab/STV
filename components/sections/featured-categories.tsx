import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Reveal } from '@/components/ui/reveal'
import { SanityImage } from '@/components/ui/sanity-image'
import { SectionHeading } from '@/components/ui/section-heading'
import type { Category } from '@/types/sanity'

export function FeaturedCategories({ categories }: { categories: Category[] }) {
  const visible = categories.filter((category) => category.productCount > 0)
  if (visible.length === 0) return null

  return (
    <section className="py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow="Gamme"
          title="Nos catégories de produits"
          description="Retrouvez toute notre gamme, classée par famille de produits."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.slice(0, 6).map((category, i) => (
            <Reveal key={category._id} delay={Math.min(i, 5) * 0.08}>
              <Link
                href={`/categories/${category.slug}`}
                className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:border-brand-300 hover:shadow-lg motion-reduce:transition-none"
              >
                <div className="relative aspect-[4/3] bg-brand-50">
                  {category.image && (
                    <SanityImage
                      image={category.image}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                    />
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-ink group-hover:text-brand-700">
                    {category.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    {category.productCount} produit
                    {category.productCount > 1 ? 's' : ''}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}