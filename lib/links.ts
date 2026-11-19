import type { Banner } from '@/types/sanity'

export function bannerHref(banner: Banner): string | null {
  if (banner.link?.type === 'product') return `/produits/${banner.link.slug}`
  if (banner.link?.type === 'category') return `/categories/${banner.link.slug}`
  if (banner.linkToContact) return '/contact'
  return null
}