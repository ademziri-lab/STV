export const PAGE_SIZE = 12

export type CatalogParams = {
  q: string
  category: string
  brand: string
  page: number
}

export type RawParams = Record<string, string | string[] | undefined>

function first(value: string | string[] | undefined) {
  return (Array.isArray(value) ? value[0] : value) ?? ''
}

// Lit les paramètres de l'adresse et les nettoie
export function parseCatalogParams(raw: RawParams): CatalogParams {
  const page = Number.parseInt(first(raw.page), 10)
  return {
    q: first(raw.q).trim().slice(0, 60),
    category: first(raw.category).trim().slice(0, 96),
    brand: first(raw.brand).trim().slice(0, 96),
    page: Number.isFinite(page) && page > 0 ? Math.min(page, 200) : 1,
  }
}

// Fabrique l'adresse d'une page du catalogue
export function catalogHref(params: Partial<CatalogParams>) {
  const search = new URLSearchParams()
  if (params.q) search.set('q', params.q)
  if (params.category) search.set('category', params.category)
  if (params.brand) search.set('brand', params.brand)
  if (params.page && params.page > 1) search.set('page', String(params.page))
  const query = search.toString()
  return query ? `/produits?${query}` : '/produits'
}

// "ventil hélic" devient "ventil* hélic*" (recherche par début de mot)
export function toSearchPattern(q: string) {
  return q
    .toLowerCase()
    .replace(/[^a-z0-9\u00c0-\u024f]+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean)
    .slice(0, 5)
    .map((word) => `${word}*`)
    .join(' ')
}