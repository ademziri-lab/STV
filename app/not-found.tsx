import { SiteShell } from '@/components/layout/site-shell'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

export default function NotFound() {
  return (
    <SiteShell>
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="font-display text-7xl font-bold text-brand-500">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold text-ink">
          Page introuvable
        </h1>
        <p className="mt-3 max-w-md text-slate-600">
          La page que vous cherchez n’existe pas ou a été déplacée.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/">Retour à l’accueil</Button>
          <Button href="/produits" variant="outline">
            Voir les produits
          </Button>
        </div>
      </Container>
    </SiteShell>
  )
}