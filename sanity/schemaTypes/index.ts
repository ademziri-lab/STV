import type { SchemaTypeDefinition } from 'sanity'
import { aboutPageType } from './about-page'
import { bannerType } from './banner'
import { brandType } from './brand'
import { categoryType } from './category'
import { productType } from './product'
import { siteSettingsType } from './site-settings'

export const schemaTypes: SchemaTypeDefinition[] = [
  productType,
  categoryType,
  brandType,
  bannerType,
  siteSettingsType,
  aboutPageType,
]

export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes,
}