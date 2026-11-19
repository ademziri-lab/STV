
import { defineField, defineType } from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Catégorie',
  type: 'document',
  
  fields: [
    defineField({
      name: 'title',
      title: 'Nom de la catégorie',
      type: 'string',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'slug',
      title: 'Adresse web (slug)',
      description:
        'Partie de l’adresse du site. Cliquez sur « Generate » pour la créer automatiquement.',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'parent',
      title: 'Catégorie parente',
      description:
        'Laissez vide pour une catégorie principale. Choisissez une catégorie pour créer une sous-catégorie.',
      type: 'reference',
      to: [{ type: 'category' }],
      options: { filter: '!defined(parent)' },
      validation: (rule) =>
        rule.custom((value, context) => {
          const selfId = context.document?._id?.replace(/^drafts\./, '')
          return value?._ref && value._ref === selfId
            ? 'Une catégorie ne peut pas être sa propre parente.'
            : true
        }),
    }),
    defineField({
      name: 'description',
      title: 'Description courte',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texte alternatif',
          description: 'Décrit l’image pour les personnes malvoyantes et Google.',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Ordre d’affichage',
      description: 'Plus le nombre est petit, plus la catégorie apparaît en premier.',
      type: 'number',
      initialValue: 100,
      validation: (rule) => rule.required().integer().min(0),
    }),
  ],
  orderings: [
    {
      title: 'Ordre d’affichage',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' },
        { field: 'title', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: { title: 'title', parent: 'parent.title', media: 'image' },
    prepare({ title, parent, media }) {
      return {
        title,
        subtitle: parent ? `Sous-catégorie de ${parent}` : 'Catégorie principale',
        media,
      }
    },
  },
})