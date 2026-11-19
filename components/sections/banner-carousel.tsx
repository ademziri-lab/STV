'use client'

import { useReducedMotion } from 'motion/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { bannerHref } from '@/lib/links'
import { sanitySrcSet, sanityUrl } from '@/lib/sanity-image'
import { cn } from '@/lib/utils'
import type { Banner } from '@/types/sanity'

const DELAY = 6000
const DESKTOP_WIDTHS = [640, 960, 1280, 1920]
const MOBILE_WIDTHS = [400, 640, 800]

const controlClass =
  'inline-flex size-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/20 focus-visible:outline-white'

export function BannerCarousel({ banners }: { banners: Banner[] }) {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)

  const count = banners.length
  const autoplay = playing && !hovered && !focused && !reduceMotion && count > 1

  useEffect(() => {
    if (!autoplay) return
    const id = window.setTimeout(
      () => setIndex((current) => (current + 1) % count),
      DELAY,
    )
    return () => window.clearTimeout(id)
  }, [autoplay, index, count])

  if (count === 0) return null

  const go = (to: number) => setIndex((to + count) % count)

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Promotions et nouveautés"
      className="relative bg-surface"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false)
      }}
    >
      <div className="grid" aria-live={autoplay ? 'off' : 'polite'}>
        {banners.map((banner, i) => {
          const active = i === index
          const href = bannerHref(banner)
          const mobile = banner.mobileImage ?? banner.desktopImage

          const frame = (
            <div
              className={cn(
                'relative w-full overflow-hidden',
                banner.mobileImage
                  ? 'aspect-square md:aspect-[1920/700]'
                  : 'aspect-[1920/700]',
              )}
            >
              <picture>
                <source
                  media="(min-width: 768px)"
                  srcSet={sanitySrcSet(banner.desktopImage.url, DESKTOP_WIDTHS)}
                  sizes="100vw"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={sanityUrl(mobile.url, 800)}
                  srcSet={sanitySrcSet(mobile.url, MOBILE_WIDTHS)}
                  sizes="100vw"
                  alt={banner.alt}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  fetchPriority={i === 0 ? 'high' : 'auto'}
                  className="absolute inset-0 size-full object-cover"
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

      {count > 1 && (
        <div className="absolute inset-x-0 bottom-3 flex justify-center">
          <div className="flex items-center gap-1 rounded-full bg-black/55 px-2 py-1 backdrop-blur">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Bannière précédente"
              className={controlClass}
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>

            <div className="flex items-center">
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
                      'block size-2.5 rounded-full transition-colors',
                      i === index ? 'bg-white' : 'bg-white/50',
                    )}
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Bannière suivante"
              className={controlClass}
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {!reduceMotion && (
              <button
                type="button"
                onClick={() => setPlaying((value) => !value)}
                aria-label={playing ? 'Mettre le défilement en pause' : 'Reprendre le défilement'}
                className={controlClass}
              >
                <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
                  {playing ? (
                    <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
                  ) : (
                    <path d="M8 5v14l11-7z" />
                  )}
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  )
}