import type { Metadata } from 'next'
import { Inter, Manrope } from 'next/font/google'
import './globals.css'


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})
const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ),
  title: {
    default: 'STV, Société Tunisienne de Ventilation',
    template: '%s | STV',
  },
  description:
    'Catalogue de produits de ventilation en Tunisie : ventilateurs, extracteurs, centrales de traitement d’air, conduits et accessoires.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  )
}