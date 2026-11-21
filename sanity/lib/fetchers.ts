import { cacheLife, cacheTag } from 'next/cache'
import type {
  AboutPage,
  Banner,
  Brand,
  Category,
  ProductCard,
  SiteSettings,
  ProductList,
  CategoryDetail,
  ProductDetail
} from '@/types/sanity'
import { client } from './client'
import {
  aboutPageQuery,
  bannersQuery,
  brandsQuery,
  categoriesQuery,
  featuredProductsQuery,
  siteSettingsQuery,
  productsQuery,
  categoryBySlugQuery,
  categorySlugsQuery,
  productBySlugQuery,
  productSlugsQuery,
} from './queries'

import { PAGE_SIZE, toSearchPattern, type CatalogParams } from '@/lib/catalog'

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

function productVariables({ q, category, brand, page }: CatalogParams) {
  return {
    q: toSearchPattern(q),
    category,
    brand,
    start: (page - 1) * PAGE_SIZE,
    end: page * PAGE_SIZE,
  }
}

async function getCachedProducts(category: string, brand: string, page: number) {
  'use cache'
  cacheTag('product', 'category', 'brand')
  cacheLife('hours')
  return client.fetch<ProductList>(
    productsQuery,
    productVariables({ q: '', category, brand, page }),
  )
}

export async function getProducts(params: CatalogParams) {
  // Sans recherche, le résultat est mis en cache.
  if (params.q === '') {
    return getCachedProducts(params.category, params.brand, params.page)
  }
  // Les recherches sont trop variées pour être mises en cache.
  return client.fetch<ProductList>(productsQuery, productVariables(params))
}

export async function getCategoryBySlug(slug: string) {
  'use cache'
  cacheTag('category', 'product')
  cacheLife('hours')
  return client.fetch<CategoryDetail | null>(categoryBySlugQuery, { slug })
}

export async function getCategorySlugs() {
  'use cache'
  cacheTag('category')
  cacheLife('hours')
  return client.fetch<string[]>(categorySlugsQuery)
}

export async function getProductBySlug(slug: string) {
  'use cache'
  cacheTag('product', 'category', 'brand')
  cacheLife('hours')
  return client.fetch<ProductDetail | null>(productBySlugQuery, { slug })
}

export async function getProductSlugs() {
  'use cache'
  cacheTag('product')
  cacheLife('hours')
  return client.fetch<string[]>(productSlugsQuery)
}