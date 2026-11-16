import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { navLinks, site } from '@/lib/site'

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-surface">
      <Container className="grid gap-10 py-12 md:grid-cols-3">
        <div>
          <Image
            src="/images/stv-logo.png"
            alt={site.fullName}
            width={200}
            height={64}
            className="h-12 w-auto"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600">
            {site.description}
          </p>
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
                href={`tel:${site.phone.replaceAll(' ', '')}`}
                className="transition-colors hover:text-brand-700"
              >
                {site.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-brand-700"
              >
                {site.email}
              </a>
            </li>
            <li>{site.address}</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-slate-200">
        <Container className="py-6">
          <p className="text-sm text-slate-500">
            © {site.year} {site.fullName}. Tous droits réservés.
          </p>
        </Container>
      </div>
    </footer>
  )
}