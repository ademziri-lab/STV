import type { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'

export const metadata: Metadata = { title: 'Produits' }

export default function ProductsPage() {
  return (
    <Container className="py-16">
      <SectionHeading
        as="h1"
        title="Nos produits"
        description="Le catalogue sera construit dans une prochaine étape."
      />
    </Container>
  )
}