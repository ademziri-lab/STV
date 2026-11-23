import type { RawParams } from '@/lib/catalog'

// Retire les caractères de contrôle et limite la longueur
function clean(value: string | string[] | undefined, max: number) {
  const text = (Array.isArray(value) ? value[0] : value) ?? ''
  return [...text]
    .map((char) => {
      const code = char.charCodeAt(0)
      return code < 32 || code === 127 ? ' ' : char
    })
    .join('')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max)
}

type ContactRequest = { produit: string; ref: string }

export function parseContactParams(raw: RawParams): ContactRequest {
  return { produit: clean(raw.produit, 120), ref: clean(raw.ref, 60) }
}

// Objet et texte du message, déjà rédigés
function buildMessage({ produit, ref }: ContactRequest) {
  const subject = produit
    ? `Demande de devis : ${produit}`
    : 'Demande d’information'

  const lines = produit
    ? [
        'Bonjour,',
        '',
        'Je souhaite obtenir un devis pour le produit suivant :',
        `- Produit : ${produit}`,
        ...(ref ? [`- Référence : ${ref}`] : []),
        '',
        'Quantité souhaitée :',
        '',
        'Mes coordonnées :',
        '- Nom :',
        '- Entreprise :',
        '- Téléphone :',
        '',
        'Merci.',
      ]
    : [
        'Bonjour,',
        '',
        'Je vous contacte au sujet de :',
        '',
        '',
        'Mes coordonnées :',
        '- Nom :',
        '- Entreprise :',
        '- Téléphone :',
        '',
        'Merci.',
      ]

  return { subject, body: lines.join('\n') }
}

// Lien pour la messagerie installée sur l'appareil
export function buildMailto(email: string, request: ContactRequest) {
  const { subject, body } = buildMessage(request)
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    body.replaceAll('\n', '\r\n'),
  )}`
}

// Lien pour écrire directement dans Gmail, dans le navigateur
export function buildGmailLink(email: string, request: ContactRequest) {
  const { subject, body } = buildMessage(request)
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    email,
  )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}