import { defineField, defineType } from 'sanity'

export const bannerType = defineType({
  name: 'banner',
  title: 'Bannière',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nom de la bannière',
      description:
        'Sert uniquement à vous repérer dans la liste. Il n’est pas affiché sur le site. Exemple : « Promo extracteurs novembre ».',
      type: 'string',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'desktopImage',
      title: 'Image pour ordinateur',
            description:
        'Format obligatoire : 1920 × 240 pixels (JPG ou PNG). Bande très large : écrivez un texte court et gros, qui reste lisible une fois l’image réduite. Le texte de la promotion doit être dans l’image.',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mobileImage',
           title: 'Image pour téléphone (recommandée)',
      description:
        'Format : 800 × 200 pixels. Gardez le bas de l’image sans texte (de petits points de navigation s’y affichent). Sans cette image, l’image pour ordinateur est utilisée et devient minuscule sur téléphone.',
      type: 'image',
    }),
    defineField({
      name: 'alt',
      title: 'Texte de l’image',
      description:
        'Recopiez le texte écrit dans l’image. Exemple : « -20 % sur les extracteurs jusqu’au 30 novembre ». Indispensable pour les personnes malvoyantes et pour Google.',
      type: 'string',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'link',
      title: 'Lien vers un produit ou une catégorie (facultatif)',
      description: 'Le visiteur arrive sur cette page en cliquant sur la bannière.',
      type: 'reference',
      to: [{ type: 'product' }, { type: 'category' }],
      weak: true,
    }),
    defineField({
      name: 'linkToContact',
      title: 'Renvoyer vers la page Contact',
      description: 'À utiliser à la place du lien ci-dessus.',
      type: 'boolean',
      initialValue: false,
      validation: (rule) =>
        rule.custom((value, context) => {
          const link = (context.document as { link?: unknown } | undefined)?.link
          return value && link
            ? 'Choisissez un seul lien : produit ou catégorie, ou la page Contact.'
            : true
        }),
    }),
    defineField({
      name: 'startDate',
      title: 'Date de début (facultatif)',
      description: 'Avant cette date, la bannière n’est pas affichée. Vide = affichée dès la publication.',
      type: 'datetime',
    }),
    defineField({
      name: 'endDate',
      title: 'Date de fin (facultatif)',
      description:
        'Après cette date, la bannière disparaît toute seule (dans la minute qui suit). Vide = sans limite.',
      type: 'datetime',
      validation: (rule) =>
        rule.custom((value, context) => {
          const start = (context.document as { startDate?: string } | undefined)
            ?.startDate
          return value && start && new Date(value) < new Date(start)
            ? 'La date de fin doit être après la date de début.'
            : true
        }),
    }),
    defineField({
      name: 'active',
      title: 'Bannière active',
      description: 'Désactivez pour la cacher sans la supprimer.',
      type: 'boolean',
      initialValue: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Ordre d’affichage',
      description: 'Plus le nombre est petit, plus la bannière apparaît en premier.',
      type: 'number',
      initialValue: 100,
      validation: (rule) => rule.required().integer().min(0),
    }),
  ],
  orderings: [
    {
      title: 'Ordre d’affichage',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'desktopImage',
      active: 'active',
      startDate: 'startDate',
      endDate: 'endDate',
    },
    prepare({ title, media, active, startDate, endDate }) {
      const fmt = (date: string) => new Date(date).toLocaleDateString('fr-FR')
      const period = `${startDate ? fmt(startDate) : 'dès maintenant'} → ${
        endDate ? fmt(endDate) : 'sans fin'
      }`
      return { title, media, subtitle: active ? period : 'Désactivée' }
    },
  },
})