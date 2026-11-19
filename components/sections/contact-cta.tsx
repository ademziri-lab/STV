import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

export function ContactCta({ phone }: { phone: string }) {
  return (
    <section className="bg-brand-800 py-16 text-white">
      <Container className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Un projet de ventilation ? Parlons-en.
          </h2>
          <p className="mt-3 text-lg text-brand-100">
            Notre équipe vous conseille et vous oriente vers le produit adapté à
            votre besoin.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          <Button
            href="/contact"
            size="lg"
            variant="secondary"
            className="focus-visible:outline-white"
          >
            Demander un devis
          </Button>
          <a
            href={`tel:${phone.replaceAll(' ', '')}`}
            className="font-medium text-white underline-offset-4 hover:underline focus-visible:outline-white"
          >
            {phone}
          </a>
        </div>
      </Container>
    </section>
  )
}