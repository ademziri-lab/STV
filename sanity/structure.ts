import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenu')
    .items([
      S.documentTypeListItem('product').title('Produits'),
      S.documentTypeListItem('category').title('Catégories'),
      S.documentTypeListItem('brand').title('Marques'),
            S.documentTypeListItem('banner').title('Bannières'),
      S.divider(),
      S.listItem()
        .title('Page À propos')
        .id('aboutPage')
        .child(
          S.document()
            .schemaType('aboutPage')
            .documentId('aboutPage')
            .title('Page À propos'),
        ),
      S.listItem()
        .title('Paramètres du site')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Paramètres du site'),
        ),
    ])