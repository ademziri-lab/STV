'use client'

import { useReducedMotion } from 'motion/react'
import Link from 'next/link'
import { useEffect, useState, useSyncExternalStore } from 'react'
import { bannerHref } from '@/lib/links'
import { sanitySrcSet, sanityUrl } from '@/lib/sanity-image'
import { cn } from '@/lib/utils'
import type { Banner } from '@/types/sanity'

const DELAY = 6000
const DESKTOP_WIDTHS = [768, 1152, 1536]
const MOBILE_WIDTHS = [400, 640, 800]
const STORAGE_KEY = 'stv-banner-dismissed'
const STORAGE_EVENT = 'stv-banner-dismissed-change'

// Mémorise "bannière masquée" pour la durée de la visite
function subscribe(onChange: () => void) {
  window.addEventListener(STORAGE_EVENT, onChange)
  return () => window.removeEventListener(STORAGE_EVENT, onChange)
}

function readDismissed() {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY)
  } catch {
    // Stockage indisponible : on ignore
    return null
  }
}

const readDismissedOnServer = () => null

const arrowButton =
  'hidden size-9 shrink-0 items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-slate-100 lg:inline-flex'
const clusterButton =
  'inline-flex size-9 items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-slate-100'

function Icon({ path, filled }: { path: string; filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  )
}

export function BannerCarousel({ banners }: { banners: Banner[] }) {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [hiddenNow, setHiddenNow] = useState(false)

  const count = banners.length
  const bannersKey = banners.map((banner) => banner._id).join(',')
  const stored = useSyncExternalStore(subscribe, readDismissed, readDismissedOnServer)
  const hidden = hiddenNow || stored === bannersKey

  const autoplay =
    playing && !hovered && !focused && !reduceMotion && count > 1 && !hidden

  useEffect(() => {
    if (!autoplay) return
    const id = window.setTimeout(
      () => setIndex((current) => (current + 1) % count),
      DELAY,
    )
    return () => window.clearTimeout(id)
  }, [autoplay, index, count])

  if (count === 0 || hidden) return null

  const go = (to: number) => setIndex((to + count) % count)

  function dismiss() {
    setHiddenNow(true)
    try {
      window.sessionStorage.setItem(STORAGE_KEY, bannersKey)
      window.dispatchEvent(new Event(STORAGE_EVENT))
    } catch {
      // Stockage indisponible : la bannière reste masquée sur cette page
    }
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Promotions et nouveautés"
      className="sticky top-16 z-30 border-b border-slate-200 bg-white shadow-sm"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false)
      }}
    >
      <div className="relative mx-auto flex max-w-6xl items-center justify-center lg:gap-3 lg:px-24">
        {count > 1 && (
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Bannière précédente"
            className={arrowButton}
          >
            <Icon path="M15 5l-7 7 7 7" />
          </button>
        )}

        <div className="relative w-full max-w-3xl">
          <div className="grid" aria-live={autoplay ? 'off' : 'polite'}>
            {banners.map((banner, i) => {
              const active = i === index
              const href = bannerHref(banner)
              const mobile = banner.mobileImage ?? banner.desktopImage

              const frame = (
                <div className="relative aspect-[4/1] w-full overflow-hidden md:aspect-[8/1]">
                  <picture>
                    <source
                      media="(min-width: 768px)"
                      srcSet={sanitySrcSet(banner.desktopImage.url, DESKTOP_WIDTHS)}
                      sizes="768px"
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={sanityUrl(mobile.url, 800)}
                      srcSet={sanitySrcSet(mobile.url, MOBILE_WIDTHS)}
                      sizes="100vw"
                      alt={banner.alt}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      fetchPriority={i === 0 ? 'high' : 'auto'}
                      className="absolute inset-0 size-full object-contain"
                    />
                  </picture>
                </div>
              )

              return (
                <div
                  key={banner._id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} sur ${count}`}
                  inert={!active}
                  className={cn(
                    'col-start-1 row-start-1 transition-opacity duration-500 motion-reduce:transition-none',
                    active ? 'opacity-100' : 'pointer-events-none opacity-0',
                  )}
                >
                  {href ? (
                    <Link href={href} className="block">
                      {frame}
                    </Link>
                  ) : (
                    frame
                  )}
                </div>
              )
            })}
          </div>

          {/* Téléphone et tablette : petits points sur l'image */}
          {count > 1 && (
            <div className="absolute inset-x-0 bottom-0.5 flex justify-center lg:hidden">
              <div className="flex items-center rounded-full bg-black/45 px-1">
                {banners.map((banner, i) => (
                  <button
                    key={banner._id}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Aller à la bannière ${i + 1}`}
                    aria-current={i === index}
                    className="p-2 focus-visible:outline-white"
                  >
                    <span
                      className={cn(
                        'block size-2 rounded-full',
                        i === index ? 'bg-white' : 'bg-white/55',
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {count > 1 && (
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Bannière suivante"
            className={arrowButton}
          >
            <Icon path="M9 5l7 7-7 7" />
          </button>
        )}
      </div>

      {/* Téléphone et tablette : bouton pour masquer, en haut à droite */}
      <button
        type="button"
        onClick={dismiss}
        aria-label="Masquer la bannière"
        className="absolute top-1 right-1 inline-flex size-7 items-center justify-center rounded-full bg-black/45 text-white lg:hidden focus-visible:outline-white"
      >
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      {/* Ordinateur : pause et masquer, à droite de la bande */}
      <div className="absolute top-1/2 right-3 hidden -translate-y-1/2 items-center gap-1 lg:flex">
        {count > 1 && !reduceMotion && (
          <button
            type="button"
            onClick={() => setPlaying((value) => !value)}
            aria-label={playing ? 'Mettre le défilement en pause' : 'Reprendre le défilement'}
            className={clusterButton}
          >
            <Icon
              filled
              path={playing ? 'M7 5h4v14H7zM13 5h4v14h-4z' : 'M8 5v14l11-7z'}
            />
          </button>
        )}
        <button
          type="button"
          onClick={dismiss}
          aria-label="Masquer la bannière"
          className={clusterButton}
        >
          <Icon path="M6 6l12 12M18 6L6 18" />
        </button>
      </div>
    </section>
  )
}