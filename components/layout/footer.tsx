import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { SanityImage } from '@/components/ui/sanity-image'
import { navLinks, site } from '@/lib/site'
import type { SiteSettings } from '@/types/sanity'

export function Footer({ settings }: { settings: SiteSettings | null }) {
  const phone = settings?.phone ?? site.phone
  const email = settings?.email ?? site.email
  const address = settings?.address ?? site.address
  const description = settings?.description ?? site.description
  const companyName = settings?.companyName ?? site.fullName
  const logo = settings?.logo ?? null
  const socialLinks = settings?.socialLinks ?? []

  return (
    <footer className="border-t border-slate-200 bg-surface">
      <Container className="grid gap-10 py-12 md:grid-cols-3">
        <div>
          {logo ? (
            <SanityImage image={logo} sizes="200px" className="h-12 w-auto" />
          ) : (
            <Image
              src="/images/stv-logo.png"
              alt={site.fullName}
              width={200}
              height={64}
              className="h-12 w-auto"
            />
          )}
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600">
            {description}
          </p>
          {socialLinks.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {socialLinks.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-brand-700 hover:underline"
                  >
                    {link.platform}
                    <span className="sr-only"> (nouvel onglet)</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Navigation du pied de page">
          <h2 className="font-display text-sm font-bold tracking-wider text-ink uppercase">
            Navigation
          </h2>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-slate-600 transition-colors hover:text-brand-700"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-sm font-bold tracking-wider text-ink uppercase">
            Contact
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>
              <a
                href={`tel:${phone.replaceAll(' ', '')}`}
                className="transition-colors hover:text-brand-700"
              >
                {phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${email}`}
                className="transition-colors hover:text-brand-700"
              >
                {email}
              </a>
            </li>
            <li className="whitespace-pre-line">{address}</li>
            {settings?.openingHours && <li>{settings.openingHours}</li>}
            {settings?.mapUrl && (
              <li>
                <a
                  href={settings.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brand-700 hover:underline"
                >
                  Voir sur Google Maps
                  <span className="sr-only"> (nouvel onglet)</span>
                </a>
              </li>
            )}
          </ul>
        </div>
      </Container>

      <div className="border-t border-slate-200">
        <Container className="py-6">
          <p className="text-sm text-slate-500">
            © {site.year} {companyName}. Tous droits réservés.
          </p>
        </Container>
      </div>
    </footer>
  )
}