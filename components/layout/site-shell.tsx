import { Suspense } from 'react'
import { Footer } from './footer'
import { Header } from './header'
import { SkipLink } from './skip-link'

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SkipLink />
      <Suspense fallback={<div className="h-16 border-b border-slate-200" />}>
        <Header />
      </Suspense>
      <main id="contenu" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <Footer />
    </div>
  )
}