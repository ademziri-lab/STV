import type { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { SanityImage } from '@/components/ui/sanity-image'
import {
  getBrands,
  getCategories,
  getFeaturedProducts,
  getSiteSettings,
  getBanners,
} from '@/sanity/lib/fetchers'
import { bannerHref } from '@/lib/links'
export const metadata: Metadata = {
  title: 'Test Sanity',
  robots: { index: false },
}

export default async function TestSanityPage() {
    const [settings, categories, brands, featured, banners] = await Promise.all([
    getSiteSettings(),
    getCategories(),
    getBrands(),
    getFeaturedProducts(),
    getBanners(),
  ])

  return (
    <Container className="space-y-10 py-16">
      <h1 className="font-display text-3xl font-bold">Test de connexion Sanity</h1>

      <section className="space-y-2">
        <h2 className="font-display text-xl font-bold">Paramètres du site</h2>
        {settings ? (
          <>
            <p>{settings.companyName}</p>
            <p>{settings.phone} · {settings.email}</p>
            <p className="font-semibold">{settings.heroTitle}</p>
            {settings.heroImage && (
              <div className="w-72">
                <SanityImage image={settings.heroImage} sizes="288px" className="rounded-lg" />
              </div>
            )}
          </>
        ) : (
          <p className="text-red-700">Aucun document « Paramètres du site » publié.</p>
        )}
      </section>
              <section className="space-y-4">
        <h2 className="font-display text-xl font-bold">Bannières</h2>
        {banners.length === 0 && (
          <p className="text-red-700">Aucune bannière active et publiée.</p>
        )}
        {banners.map((banner) => (
          <div key={banner._id} className="space-y-2">
            <p className="font-semibold">
              {banner.title} → {bannerHref(banner) ?? 'sans lien'}
            </p>
            <div className="flex flex-wrap items-start gap-4">
              <div className="w-96">
                <SanityImage
                  image={banner.desktopImage}
                  alt={banner.alt}
                  sizes="384px"
                  className="rounded-lg"
                />
              </div>
              {banner.mobileImage && (
                <div className="w-40">
                  <SanityImage
                    image={banner.mobileImage}
                    alt={banner.alt}
                    sizes="160px"
                    className="rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </section>
      <section className="space-y-2">
        <h2 className="font-display text-xl font-bold">Catégories</h2>
        {categories.length === 0 && <p className="text-red-700">Aucune catégorie publiée.</p>}
        <ul className="list-disc pl-6">
          {categories.map((category) => (
            <li key={category._id}>
              {category.title} ({category.productCount} produit(s))
              <ul className="list-[circle] pl-6">
                {category.children.map((child) => (
                  <li key={child._id}>
                    {child.title} ({child.productCount})
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-xl font-bold">Marques</h2>
        {brands.length === 0 && <p className="text-red-700">Aucune marque publiée.</p>}
        <ul className="list-disc pl-6">
          {brands.map((brand) => (
            <li key={brand._id}>
              {brand.name} ({brand.productCount} produit(s))
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-bold">Produits mis en avant</h2>
        {featured.length === 0 && (
          <p className="text-red-700">
            Aucun produit mis en avant. Cochez « Produit mis en avant » sur un produit publié.
          </p>
        )}
        <div className="grid gap-4 sm:grid-cols-3">
          {featured.map((product) => (
            <div key={product._id} className="rounded-xl border border-slate-200 p-4">
              {product.image && (
                <SanityImage
                  image={product.image}
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="mb-3 rounded-lg"
                />
              )}
              <p className="font-semibold">{product.name}</p>
              <p className="text-sm text-slate-600">
                {product.category?.title} · {product.brand?.name}
              </p>
            </div>
          ))}
        </div>
      </section>
    </Container>
  )
}