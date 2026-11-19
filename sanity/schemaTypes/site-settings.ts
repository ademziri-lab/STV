import { defineArrayMember, defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Paramètres du site',
  type: 'document',
  groups: [
    { name: 'company', title: 'Entreprise', default: true },
    { name: 'contact', title: 'Coordonnées' },
    { name: 'home', title: 'Page d’accueil' },
  ],
  fields: [
    // ---------- Entreprise ----------
    defineField({
      name: 'companyName',
      title: 'Nom de l’entreprise',
      type: 'string',
      group: 'company',
      initialValue: 'Société Tunisienne de Ventilation',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description de l’entreprise',
      description: 'Une ou deux phrases, affichées dans le pied de page et utilisées par Google.',
      type: 'text',
      rows: 3,
      group: 'company',
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      description: 'Idéalement un fichier SVG ou PNG avec fond transparent.',
      type: 'image',
      group: 'company',
      fields: [
        defineField({
          name: 'alt',
          title: 'Texte alternatif',
          type: 'string',
          initialValue: 'STV, Société Tunisienne de Ventilation',
          validation: (rule) => rule.required(),
        }),
      ],
    }),

    // ---------- Coordonnées ----------
    defineField({
      name: 'phone',
      title: 'Téléphone',
      description: 'Exemple : +216 71 000 000',
      type: 'string',
      group: 'contact',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'E-mail de contact',
      description: 'Les messages du formulaire de contact seront envoyés à cette adresse.',
      type: 'string',
      group: 'contact',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'text',
      rows: 3,
      group: 'contact',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'openingHours',
      title: 'Horaires d’ouverture',
      description: 'Exemple : Lundi à vendredi, 8h00 à 17h00.',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'mapUrl',
      title: 'Lien Google Maps',
      description: 'Lien de partage de l’emplacement de STV sur Google Maps.',
      type: 'url',
      group: 'contact',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Réseaux sociaux',
      type: 'array',
      group: 'contact',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({
              name: 'platform',
              title: 'Réseau',
              type: 'string',
              options: {
                list: ['Facebook', 'Instagram', 'LinkedIn', 'YouTube', 'TikTok', 'X'],
                layout: 'dropdown',
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Lien',
              type: 'url',
              validation: (rule) =>
                rule.required().uri({ scheme: ['http', 'https'] }),
            }),
          ],
          preview: {
            select: { title: 'platform', subtitle: 'url' },
          },
        }),
      ],
    }),

    // ---------- Page d'accueil ----------
    defineField({
      name: 'heroTitle',
      title: 'Titre principal de l’accueil',
      description: 'Exemple : « Votre partenaire en ventilation en Tunisie ».',
      type: 'string',
      group: 'home',
      validation: (rule) => rule.required().max(90),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Texte sous le titre',
      type: 'text',
      rows: 3,
      group: 'home',
      validation: (rule) => rule.required().max(250),
    }),
    defineField({
      name: 'heroImage',
      title: 'Image de l’accueil',
      type: 'image',
      group: 'home',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texte alternatif',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Paramètres du site' }
    },
  },
})