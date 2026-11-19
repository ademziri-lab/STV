'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...tool]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'

// Documents that must exist only once
const singletonTypes = ['siteSettings', 'aboutPage']

// The only actions allowed on those documents
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  name: 'default',
  title: 'STV Catalogue',
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({structure}),
    // Vision (GROQ playground) is for developers, so it only shows locally
    ...(process.env.NODE_ENV === 'development'
      ? [visionTool({defaultApiVersion: apiVersion})]
      : []),
  ],
  document: {
    // Remove the single pages from the "+" create menu
    newDocumentOptions: (prev, {creationContext}) =>
      creationContext.type === 'global'
        ? prev.filter((template) => !singletonTypes.includes(template.templateId))
        : prev,
    // Remove delete, unpublish and duplicate on the single pages
    actions: (prev, {schemaType}) =>
      singletonTypes.includes(schemaType)
        ? prev.filter(({action}) => action && singletonActions.has(action))
        : prev,
  },
})