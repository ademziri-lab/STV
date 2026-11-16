import type { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'

export const metadata: Metadata = { title: 'À propos' }

export default function AboutPage() {
  return (
    <Container className="py-16">
      <SectionHeading
        as="h1"
        title="À propos de STV"
        description="Cette page sera rédigée dans une prochaine étape."
      />
    </Container>
  )
}