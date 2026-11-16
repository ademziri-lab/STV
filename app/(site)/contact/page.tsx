import type { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'

export const metadata: Metadata = { title: 'Contact' }

export default function ContactPage() {
  return (
    <Container className="py-16">
      <SectionHeading
        as="h1"
        title="Contactez-nous"
        description="Le formulaire de contact sera ajouté dans une prochaine étape."
      />
    </Container>
  )
}