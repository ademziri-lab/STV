import type { Metadata } from 'next'
import { BannerCarousel } from '@/components/sections/banner-carousel'
import { BrandsStrip } from '@/components/sections/brands-strip'
import { ContactCta } from '@/components/sections/contact-cta'
import { FeaturedCategories } from '@/components/sections/featured-categories'
import { FeaturedProducts } from '@/components/sections/featured-products'
import { Hero } from '@/components/sections/hero'
import { site } from '@/lib/site'
import {
  getBanners,
  getBrands,
  getCategories,
  getFeaturedProducts,
  getSiteSettings,
} from '@/sanity/lib/fetchers'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return { description: settings?.description ?? site.description }
}

export default async function HomePage() {
  const [settings, banners, categories, featured, brands] = await Promise.all([
    getSiteSettings(),
    getBanners(),
    getCategories(),
    getFeaturedProducts(6),
    getBrands(),
  ])

  return (
    <>
      <BannerCarousel banners={banners} />
      <Hero settings={settings} />
      <FeaturedCategories categories={categories} />
      <FeaturedProducts products={featured} />
      <BrandsStrip brands={brands} />
      <ContactCta phone={settings?.phone ?? site.phone} />
    </>
  )
}