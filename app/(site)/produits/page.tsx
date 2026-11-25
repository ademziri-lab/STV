import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Catalog, CatalogSkeleton } from '@/components/catalog/catalog'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import type { RawParams } from '@/lib/catalog'

export const metadata: Metadata = {
  title: 'Produits',
  description:
    'Catalogue des produits de ventilation STV : ventilateurs, extracteurs, centrales de traitement d’air, conduits et accessoires.',
  // Toutes les variantes filtrées pointent vers la page principale pour Google
  alternates: { canonical: '/produits' },
}

export default function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<RawParams>
}) {
  return (
    <Container className="py-12 lg:py-16">
      <SectionHeading
        as="h1"
        eyebrow="Catalogue"
        title="Nos produits"
                        description="Recherchez un produit par son nom ou sa référence, ou filtrez par marque."
      />
      <Suspense fallback={<CatalogSkeleton />}>
        <Catalog searchParams={searchParams} />
      </Suspense>
    </Container>
  )
}