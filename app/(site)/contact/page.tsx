import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ContactContent } from '@/components/contact/contact-content'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import type { RawParams } from '@/lib/catalog'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contactez STV, Société Tunisienne de Ventilation : téléphone, e-mail, adresse et horaires pour toute demande d’information ou de devis.',
  // Toutes les variantes (produit demandé) pointent vers la page principale
  alternates: { canonical: '/contact' },
}

export default function ContactPage({
  searchParams,
}: {
  searchParams: Promise<RawParams>
}) {
  return (
    <Container className="py-12 lg:py-16">
      <SectionHeading
        as="h1"
        eyebrow="Contact"
        title="Contactez-nous"
        description="Une question, un projet, une demande de devis ? Appelez-nous ou écrivez-nous, nous sommes à votre écoute."
      />
      <div className="mt-10">
        <Suspense
          fallback={
            <div
              aria-busy="true"
              className="h-64 rounded-2xl bg-slate-100 motion-safe:animate-pulse"
            />
          }
        >
          <ContactContent searchParams={searchParams} />
        </Suspense>
      </div>
    </Container>
  )
}