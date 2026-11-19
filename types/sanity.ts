export type SanityImage = {
  alt: string
  url: string
  width: number
  height: number
  lqip: string | null
}

// Rich text from the Studio. We give it a real type when we render it (Step 11).
export type RichText = unknown[]

export type ProductCard = {
  _id: string
  name: string
  slug: string
  sku: string | null
  shortDescription: string
  image: SanityImage | null
  category: { title: string; slug: string } | null
  brand: { name: string; slug: string } | null
}

export type CategoryChild = {
  _id: string
  title: string
  slug: string
  productCount: number
}

export type Category = {
  _id: string
  title: string
  slug: string
  description: string | null
  image: SanityImage | null
  productCount: number
  children: CategoryChild[]
}

export type Brand = {
  _id: string
  name: string
  slug: string
  logo: SanityImage | null
  website: string | null
  productCount: number
}

export type SiteSettings = {
  companyName: string
  description: string
  phone: string
  email: string
  address: string
  openingHours: string | null
  mapUrl: string | null
  socialLinks: { platform: string; url: string }[] | null
  heroTitle: string
  heroSubtitle: string
  logo: SanityImage | null
  heroImage: SanityImage | null
}

export type AboutPage = {
  title: string
  intro: string
  image: SanityImage | null
  body: RichText | null
  stats: { value: string; label: string }[] | null
  values: { title: string; description: string }[] | null
}
export type Banner = {
  _id: string
  title: string
  alt: string
  desktopImage: SanityImage
  mobileImage: SanityImage | null
  link: { type: 'product' | 'category'; slug: string } | null
  linkToContact: boolean | null
}