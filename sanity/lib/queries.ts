// Reusable piece: how an image is returned
const image = `{
  "alt": coalesce(alt, ""),
  "url": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "lqip": asset->metadata.lqip
}`

// Reusable piece: the fields of a product card
export const productCardFields = `
  _id,
  name,
  "slug": slug.current,
  sku,
  shortDescription,
  "image": images[0]${image},
  "category": category->{ title, "slug": slug.current },
  "brand": brand->{ name, "slug": slug.current }
`

export const siteSettingsQuery = `*[_id == "siteSettings"][0]{
  companyName, description, phone, email, address, openingHours, mapUrl,
  socialLinks[]{ platform, url },
  heroTitle, heroSubtitle,
  "logo": logo${image},
  "heroImage": heroImage${image}
}`

export const aboutPageQuery = `*[_id == "aboutPage"][0]{
  title, intro,
  "image": image${image},
  body,
  stats[]{ value, label },
  values[]{ title, description }
}`

// Main categories, each with its subcategories and product counts
export const categoriesQuery = `*[_type == "category" && !defined(parent)]
  | order(order asc, title asc) {
    _id, title, "slug": slug.current, description,
    "image": image${image},
    "productCount": count(*[_type == "product" && (category._ref == ^._id || category->parent._ref == ^._id)]),
    "children": *[_type == "category" && parent._ref == ^._id]
      | order(order asc, title asc) {
        _id, title, "slug": slug.current,
        "productCount": count(*[_type == "product" && category._ref == ^._id])
      }
  }`

export const brandsQuery = `*[_type == "brand"] | order(name asc) {
  _id, name, "slug": slug.current,
  "logo": logo${image},
  website,
  "productCount": count(*[_type == "product" && brand._ref == ^._id])
}`

export const featuredProductsQuery = `*[_type == "product" && featured == true]
  | order(_createdAt desc) [0...$limit] {
    ${productCardFields}
  }`

export const bannersQuery = `*[_type == "banner" && active == true
  && (!defined(startDate) || startDate <= now())
  && (!defined(endDate) || endDate >= now())
] | order(order asc, _createdAt desc) {
  _id, title, alt,
  "desktopImage": desktopImage${image},
  "mobileImage": mobileImage${image},
  "link": link->{ "type": _type, "slug": slug.current },
  linkToContact
}`