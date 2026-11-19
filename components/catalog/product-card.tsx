import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { SanityImage } from '@/components/ui/sanity-image'
import type { ProductCard as ProductCardData } from '@/types/sanity'

export function ProductCard({ product }: { product: ProductCardData }) {
  return (
    <Link
      href={`/produits/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <div className="relative aspect-[4/3] bg-white">
        {product.image && (
          <SanityImage
            image={product.image}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 border-t border-slate-100 p-5">
        <div className="flex flex-wrap gap-2">
          {product.brand && <Badge>{product.brand.name}</Badge>}
          {product.category && (
            <Badge variant="neutral">{product.category.title}</Badge>
          )}
        </div>
        <h3 className="font-display text-lg font-bold text-ink group-hover:text-brand-700">
          {product.name}
        </h3>
        {product.sku && (
          <p className="text-xs text-slate-500">Réf. {product.sku}</p>
        )}
        <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">
          {product.shortDescription}
        </p>
      </div>
    </Link>
  )
}