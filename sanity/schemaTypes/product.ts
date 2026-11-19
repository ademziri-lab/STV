
import { defineArrayMember, defineField, defineType } from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Produit',
  type: 'document',
  
  groups: [
    { name: 'general', title: 'Général', default: true },
    { name: 'media', title: 'Images' },
    { name: 'details', title: 'Fiche technique' },
    { name: 'seo', title: 'Référencement' },
  ],
  fields: [
    // ---------- Général ----------
    defineField({
      name: 'name',
      title: 'Nom du produit',
      type: 'string',
      group: 'general',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Adresse web (slug)',
      description:
        'Cliquez sur « Generate ». Ne la changez pas après publication, car l’ancienne adresse ne fonctionnerait plus.',
      type: 'slug',
      group: 'general',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sku',
      title: 'Référence produit',
      description: 'Référence du fabricant ou de STV. Elle peut être utilisée dans la recherche.',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'reference',
      group: 'general',
      to: [{ type: 'category' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'brand',
      title: 'Marque',
      type: 'reference',
      group: 'general',
      to: [{ type: 'brand' }],
    }),
    defineField({
      name: 'shortDescription',
      title: 'Description courte',
      description: 'Une ou deux phrases, affichées sur la carte produit (200 caractères maximum).',
      type: 'text',
      rows: 3,
      group: 'general',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'featured',
      title: 'Produit mis en avant',
      description: 'Affiche le produit sur la page d’accueil.',
      type: 'boolean',
      group: 'general',
      initialValue: false,
    }),

    // ---------- Images ----------
    defineField({
      name: 'images',
      title: 'Images du produit',
      description:
        'La première image est l’image principale. Vous pouvez les réordonner en les glissant.',
      type: 'array',
      group: 'media',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Texte alternatif',
              description: 'Décrivez ce que montre l’image. Exemple : « Ventilateur hélicoïdal mural blanc ».',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required().min(1).max(10),
    }),

    // ---------- Fiche technique ----------
    defineField({
      name: 'description',
      title: 'Description détaillée',
      type: 'array',
      group: 'details',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Paragraphe', value: 'normal' },
            { title: 'Titre', value: 'h3' },
          ],
          lists: [
            { title: 'Liste à puces', value: 'bullet' },
            { title: 'Liste numérotée', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Gras', value: 'strong' },
              { title: 'Italique', value: 'em' },
            ],
            annotations: [],
          },
        }),
      ],
    }),
    defineField({
      name: 'specifications',
      title: 'Caractéristiques techniques',
      description: 'Une ligne par caractéristique. Exemple : Débit d’air → 2500 m³/h.',
      type: 'array',
      group: 'details',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'specification',
          fields: [
            defineField({
              name: 'label',
              title: 'Caractéristique',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'value',
              title: 'Valeur',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
          },
        }),
      ],
    }),
    defineField({
      name: 'documents',
      title: 'Documents PDF',
      description: 'Fiches techniques, catalogues, notices à télécharger.',
      type: 'array',
      group: 'details',
      of: [
                defineArrayMember({
          type: 'object',
          name: 'productDocument',
          fields: [
            defineField({
              name: 'title',
              title: 'Titre du document',
              description: 'Exemple : « Fiche technique ».',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'file',
              title: 'Fichier PDF',
              type: 'file',
              options: { accept: 'application/pdf' },
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: 'title' },
          },
        }),
      ],
    }),
    defineField({
      name: 'manufacturerUrl',
      title: 'Lien vers la page du fabricant',
      type: 'url',
      group: 'details',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),

    // ---------- Référencement ----------
    defineField({
      name: 'seoTitle',
      title: 'Titre pour Google',
      description: 'Facultatif. Sinon le nom du produit est utilisé. 60 caractères maximum.',
      type: 'string',
      group: 'seo',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: 'seoDescription',
      title: 'Description pour Google',
      description: 'Facultatif. Sinon la description courte est utilisée. 160 caractères maximum.',
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: (rule) => rule.max(160),
    }),
  ],
  orderings: [
    {
      title: 'Nom (A à Z)',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      sku: 'sku',
      category: 'category.title',
      media: 'images.0',
    },
    prepare({ title, sku, category, media }) {
      return {
        title,
        subtitle: [category, sku].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})