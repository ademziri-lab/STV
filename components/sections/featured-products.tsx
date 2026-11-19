import { ProductCard } from '@/components/catalog/product-card'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import type { ProductCard as ProductCardData } from '@/types/sanity'

export function FeaturedProducts({ products }: { products: ProductCardData[] }) {
  if (products.length === 0) return null

  return (
    <section className="bg-surface py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow="Sélection"
          title="Produits à la une"
          description="Une sélection de nos produits de ventilation."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <Reveal key={product._id} delay={Math.min(i, 5) * 0.08}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/produits" variant="outline" size="lg">
            Voir tout le catalogue
          </Button>
        </div>
      </Container>
    </section>
  )
}