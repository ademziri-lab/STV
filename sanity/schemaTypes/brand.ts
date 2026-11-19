
import { defineField, defineType } from 'sanity'

export const brandType = defineType({
  name: 'brand',
  title: 'Marque',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Nom de la marque',
      type: 'string',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'slug',
      title: 'Adresse web (slug)',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          title: 'Texte alternatif',
          description: 'Par exemple : « Logo Soler & Palau ».',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'website',
      title: 'Site web du fabricant',
      type: 'url',
      validation: (rule) =>
        rule.uri({ scheme: ['http', 'https'] }),
    }),
  ],
  preview: {
    select: { title: 'name', media: 'logo' },
  },
})