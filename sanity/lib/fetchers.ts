import { cacheLife, cacheTag } from 'next/cache'
import type {
  AboutPage,
  Banner,
  Brand,
  Category,
  ProductCard,
  SiteSettings,
} from '@/types/sanity'
import { client } from './client'
import {
  aboutPageQuery,
  bannersQuery,
  brandsQuery,
  categoriesQuery,
  featuredProductsQuery,
  siteSettingsQuery,
} from './queries'

export async function getSiteSettings() {
  'use cache'
  cacheTag('siteSettings')
  cacheLife('hours')
  return client.fetch<SiteSettings | null>(siteSettingsQuery)
}

export async function getAboutPage() {
  'use cache'
  cacheTag('aboutPage')
  cacheLife('hours')
  return client.fetch<AboutPage | null>(aboutPageQuery)
}

export async function getCategories() {
  'use cache'
  cacheTag('category', 'product')
  cacheLife('hours')
  return client.fetch<Category[]>(categoriesQuery)
}

export async function getBrands() {
  'use cache'
  cacheTag('brand', 'product')
  cacheLife('hours')
  return client.fetch<Brand[]>(brandsQuery)
}

export async function getFeaturedProducts(limit = 6) {
  'use cache'
  cacheTag('product', 'category', 'brand')
  cacheLife('hours')
  return client.fetch<ProductCard[]>(featuredProductsQuery, { limit })
}

export async function getBanners() {
  'use cache'
  cacheTag('banner', 'product', 'category')
  // Durée courte : une bannière dont la date de fin passe doit disparaître vite
  cacheLife('minutes')
  return client.fetch<Banner[]>(bannersQuery)
}