import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { SanityImage } from '@/components/ui/sanity-image'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'
import type { SiteSettings } from '@/types/sanity'

export function Hero({ settings }: { settings: SiteSettings | null }) {
  const title = settings?.heroTitle ?? 'Votre partenaire en ventilation en Tunisie'
  const subtitle = settings?.heroSubtitle ?? site.description
  const image = settings?.heroImage ?? null

  return (
    <section className="bg-linear-to-b from-brand-50 to-white">
      <Container
        className={cn(
          'grid items-center gap-10 py-16 lg:py-24',
          image && 'lg:grid-cols-2',
        )}
      >
        <div className="max-w-xl">
          <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">{subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/produits" size="lg">
              Découvrir le catalogue
            </Button>
            <Button href="/contact" size="lg" variant="outline">
              Nous contacter
            </Button>
          </div>
        </div>

        {image && (
          <SanityImage
            image={image}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-auto w-full rounded-2xl shadow-lg"
          />
        )}
      </Container>
    </section>
  )
}