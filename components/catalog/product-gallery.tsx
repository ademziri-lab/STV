'use client'

import { motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { SanityImage } from '@/components/ui/sanity-image'
import { cn } from '@/lib/utils'
import type { SanityImage as SanityImageData } from '@/types/sanity'

export function ProductGallery({
  images,
  name,
}: {
  images: SanityImageData[]
  name: string
}) {
  const [index, setIndex] = useState(0)
  const reduceMotion = useReducedMotion()
  const current = images[index]

  return (
    <div>
      <motion.div
        key={index}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-white"
      >
        <SanityImage
          image={current}
          alt={current.alt || name}
          fill
          priority={index === 0}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-contain p-6"
        />
      </motion.div>

      {images.length > 1 && (
        <ul aria-label="Images du produit" className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
          {images.map((image, i) => (
            <li key={`${image.url}-${i}`}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Afficher l’image ${i + 1} sur ${images.length}`}
                aria-current={i === index}
                className={cn(
                  'relative block aspect-square w-full overflow-hidden rounded-lg border-2 bg-white transition-colors',
                  i === index
                    ? 'border-brand-600'
                    : 'border-slate-200 hover:border-brand-300',
                )}
              >
                <SanityImage
                  image={image}
                  alt=""
                  fill
                  sizes="120px"
                  className="object-contain p-1.5"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}