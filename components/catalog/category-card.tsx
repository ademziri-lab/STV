import Link from 'next/link'
import { SanityImage } from '@/components/ui/sanity-image'
import type { SanityImage as SanityImageData } from '@/types/sanity'

type CategoryCardProps = {
  category: {
    title: string
    slug: string
    description: string | null
    image: SanityImageData | null
    productCount: number
  }
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:border-brand-300 hover:shadow-lg motion-reduce:transition-none"
    >
      <div className="relative aspect-[4/3] bg-brand-50">
        {category.image && (
          <SanityImage
            image={category.image}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold text-ink group-hover:text-brand-700">
          {category.title}
        </h3>
        {category.description && (
          <p className="mt-1 line-clamp-2 text-sm text-slate-600">
            {category.description}
          </p>
        )}
        <p className="mt-auto pt-3 text-sm text-slate-500">
          {category.productCount} produit{category.productCount > 1 ? 's' : ''}
        </p>
      </div>
    </Link>
  )
}