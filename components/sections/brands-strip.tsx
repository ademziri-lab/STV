import { Container } from '@/components/ui/container'
import { Reveal } from '@/components/ui/reveal'
import { SanityImage } from '@/components/ui/sanity-image'
import { SectionHeading } from '@/components/ui/section-heading'
import type { Brand } from '@/types/sanity'

const linkClass =
  'block opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 focus-visible:opacity-100 focus-visible:grayscale-0 motion-reduce:transition-none'

export function BrandsStrip({ brands }: { brands: Brand[] }) {
  const visible = brands.filter((brand) => brand.productCount > 0)
  if (visible.length === 0) return null

  return (
    <section className="py-16 lg:py-20">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Marques"
          title="Nos marques partenaires"
        />
        <Reveal>
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
            {visible.map((brand) => {
              // Avec un lien, le nom est lu par le lien. Sans lien, par l'image.
              const content = (alt: string) =>
                brand.logo ? (
                  <div className="relative h-12 w-32">
                    <SanityImage
                      image={brand.logo}
                      alt={alt}
                      fill
                      sizes="128px"
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <span className="font-display text-lg font-bold text-slate-600">
                    {brand.name}
                  </span>
                )

              return (
                <li key={brand._id}>
                  {brand.website ? (
                    <a
                      href={brand.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visiter le site de ${brand.name} (nouvel onglet)`}
                      className={linkClass}
                    >
                      {content('')}
                    </a>
                  ) : (
                    <div className="opacity-70 grayscale">{content(brand.name)}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}