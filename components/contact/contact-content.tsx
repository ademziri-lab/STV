import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { CopyButton } from '@/components/ui/copy-button'
import type { RawParams } from '@/lib/catalog'
import {
  buildGmailLink,
  buildMailto,
  parseContactParams,
} from '@/lib/contact'
import { site } from '@/lib/site'
import { getSiteSettings } from '@/sanity/lib/fetchers'

function InfoCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="font-display text-lg font-bold text-ink">{title}</h2>
      {children}
    </div>
  )
}

export async function ContactContent({
  searchParams,
}: {
  searchParams: Promise<RawParams>
}) {
  const [raw, settings] = await Promise.all([searchParams, getSiteSettings()])
  const request = parseContactParams(raw)
  const { produit, ref } = request

  const phone = settings?.phone ?? site.phone
  const email = settings?.email ?? site.email
  const address = settings?.address ?? site.address

  return (
    <div>
      {produit && (
        <div className="mb-8 rounded-2xl border border-brand-200 bg-brand-50 p-6">
          <p className="text-sm font-semibold tracking-wider text-brand-800 uppercase">
            Demande de devis
          </p>
          <p className="mt-2 font-display text-xl font-bold text-ink">{produit}</p>
          {ref && <p className="text-sm text-slate-600">Référence : {ref}</p>}
          <p className="mt-3 text-slate-700">
            Utilisez l’un des boutons de la carte « E-mail » ci-dessous : votre
            message sera déjà rédigé avec ce produit. Vous pouvez aussi nous
            appeler.
          </p>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <InfoCard title="Téléphone">
          <p className="mt-2 text-slate-600">
            Appelez-nous pour un conseil ou une demande de devis.
          </p>
          <p className="mt-3 font-display text-xl font-bold text-ink">{phone}</p>
          <Button
            href={`tel:${phone.replaceAll(' ', '')}`}
            className="mt-auto self-start"
          >
            Appeler
          </Button>
        </InfoCard>

        <InfoCard title="E-mail">
          <p className="mt-2 text-slate-600">
            Décrivez votre besoin, nous vous répondrons par e-mail.
          </p>
          <p className="mt-3 font-medium break-all text-ink">{email}</p>
          <div className="mt-auto flex flex-wrap gap-3 pt-4">
            <Button href={buildMailto(email, request)}>Écrire un e-mail</Button>
            <Button
              href={buildGmailLink(email, request)}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
            >
              Ouvrir Gmail
              <span className="sr-only"> (nouvel onglet)</span>
            </Button>
            <CopyButton text={email} label="Copier l’adresse" />
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Pas de messagerie installée ? Utilisez Gmail ou copiez l’adresse.
          </p>
        </InfoCard>

        <InfoCard title="Adresse">
          <p className="mt-2 whitespace-pre-line text-slate-600">{address}</p>
          {settings?.mapUrl && (
            <Button
              href={settings.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              className="mt-auto self-start"
            >
              Voir sur Google Maps
              <span className="sr-only"> (nouvel onglet)</span>
            </Button>
          )}
        </InfoCard>

        {settings?.openingHours && (
          <InfoCard title="Horaires">
            <p className="mt-2 text-slate-600">{settings.openingHours}</p>
          </InfoCard>
        )}
      </div>
    </div>
  )
}