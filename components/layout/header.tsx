'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { navLinks, site } from '@/lib/site'
import { cn } from '@/lib/utils'
import { SanityImage } from '@/components/ui/sanity-image'
import type { SanityImage as SanityImageData } from '@/types/sanity'

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href)
}

export function Header({ logo }: { logo: SanityImageData | null }) {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()

  // The menu is "open" only for the page where it was opened,
  // so it closes by itself when you navigate.
  const [openFor, setOpenFor] = useState<string | null>(null)
  const open = openFor === pathname

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenFor(null)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" aria-label={`${site.name}, retour à l’accueil`}>
                    {logo ? (
            <SanityImage
              image={logo}
              alt={site.fullName}
              sizes="200px"
              priority
              className="h-12 w-auto"
            />
          ) : (
            <Image
              src="/images/stv-logo.png"
              alt={site.fullName}
              width={200}
              height={64}
              priority
              className="h-12 w-auto"
            />
          )}
        </Link>

        <nav aria-label="Navigation principale" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                      active
                        ? 'bg-brand-50 text-brand-800'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-ink',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button href="/contact" size="sm" className="hidden md:inline-flex">
            Nous contacter
          </Button>

          <button
            type="button"
            onClick={() => setOpenFor(open ? null : pathname)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="inline-flex size-11 items-center justify-center rounded-lg text-ink transition-colors hover:bg-slate-100 md:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu-mobile"
            aria-label="Navigation mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="border-t border-slate-200 bg-white md:hidden"
          >
            <Container>
              <ul className="space-y-1 py-4">
                {navLinks.map((link) => {
                  const active = isActive(pathname, link.href)
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'block rounded-lg px-4 py-3 text-base font-medium',
                          active
                            ? 'bg-brand-50 text-brand-800'
                            : 'text-slate-700 hover:bg-slate-100',
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
              <div className="pb-4">
                <Button href="/contact" className="w-full">
                  Nous contacter
                </Button>
              </div>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}