import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Off on purpose: Next.js caches the results itself, and we refresh that
  // cache with a webhook. This way we never cache stale CDN data.
  useCdn: false,
})