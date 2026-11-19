'use client'

import Image, { type ImageLoaderProps, type ImageProps } from 'next/image'
import type { SanityImage as SanityImageData } from '@/types/sanity'

function sanityLoader({ src, width, quality }: ImageLoaderProps) {
  return `${src}?w=${width}&q=${quality ?? 75}&auto=format&fit=max`
}

type SanityImageProps = Omit<
  ImageProps,
  'src' | 'alt' | 'width' | 'height' | 'loader' | 'placeholder' | 'blurDataURL'
> & {
  image: SanityImageData
  alt?: string
}

export function SanityImage({ image, alt, fill, ...props }: SanityImageProps) {
  const common = {
    src: image.url,
    alt: alt ?? image.alt,
    loader: sanityLoader,
    ...(image.lqip
      ? { placeholder: 'blur' as const, blurDataURL: image.lqip }
      : {}),
  }

  return fill ? (
    <Image {...common} fill {...props} />
  ) : (
    <Image {...common} width={image.width} height={image.height} {...props} />
  )
}