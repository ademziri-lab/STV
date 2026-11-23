import type { Metadata } from 'next'
import { ContactCta } from '@/components/sections/contact-cta'
import { Container } from '@/components/ui/container'
import { Reveal } from '@/components/ui/reveal'
import { RichText } from '@/components/ui/rich-text'
import { SanityImage } from '@/components/ui/sanity-image'
import { SectionHeading } from '@/components/ui/section-heading'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'
import { getAboutPage, getSiteSettings } from '@/sanity/lib/fetchers'

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAboutPage()
  return {
    title: 'À propos',
    description: (about?.intro ?? site.description).slice(0, 160),
    alternates: { canonical: '/a-propos' },
  }
}

export default async function AboutPage() {
  const [about, settings] = await Promise.all([getAboutPage(), getSiteSettings()])

  const stats = about?.stats ?? []
  const values = about?.values ?? []
  const body = about?.body && about.body.length > 0 ? about.body : null

  return (
    <>
      <section className="bg-linear-to-b from-brand-50 to-white">
        <Container
          className={cn(
            'grid items-center gap-10 py-16 lg:py-20',
            about?.image && 'lg:grid-cols-2',
          )}
        >
          <SectionHeading
            as="h1"
            eyebrow="À propos"
            title={about?.title ?? 'À propos de STV'}
            description={about?.intro ?? settings?.description ?? site.description}
          />
          {about?.image && (
            <SanityImage
              image={about.image}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-auto w-full rounded-2xl shadow-lg"
            />
          )}
        </Container>
      </section>

      {body && (
        <section className="py-12 lg:py-16">
          <Container>
            <RichText value={body} topLevel={2} className="max-w-3xl" />
          </Container>
        </section>
      )}

      {stats.length > 0 && (
        <section aria-labelledby="chiffres-cles" className="bg-brand-50 py-12 lg:py-16">
          <Container>
            <h2 id="chiffres-cles" className="sr-only">
              Chiffres clés
            </h2>
            <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
              {stats.map((stat, i) => (
                <Reveal key={`${i}-${stat.label}`} delay={Math.min(i, 3) * 0.08}>
                  <div className="flex h-full flex-col-reverse rounded-2xl bg-white p-6 text-center">
                    <dt className="mt-1 text-sm text-slate-600">{stat.label}</dt>
                    <dd className="font-display text-4xl font-bold text-brand-700">
                      {stat.value}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </Container>
        </section>
      )}

      {values.length > 0 && (
        <section className="py-12 lg:py-16">
          <Container>
            <SectionHeading eyebrow="Valeurs" title="Nos engagements" />
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((value, i) => (
                <li key={`${i}-${value.title}`} className="h-full">
                  <Reveal delay={Math.min(i, 5) * 0.08} className="h-full">
                    <div className="h-full rounded-2xl border border-slate-200 bg-white p-6">
                      <h3 className="font-display text-lg font-bold text-ink">
                        {value.title}
                      </h3>
                      <p className="mt-2 leading-relaxed text-slate-600">
                        {value.description}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <ContactCta phone={settings?.phone ?? site.phone} />
    </>
  )
}