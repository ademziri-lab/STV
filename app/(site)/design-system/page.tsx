import type { Metadata } from 'next'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Input, Textarea } from '@/components/ui/input'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'

export const metadata: Metadata = {
  title: 'Design system',
  robots: { index: false },
}

export default function DesignSystemPage() {
  return (
    <main className="py-16">
      <Container className="space-y-16">
        <SectionHeading
          as="h1"
          eyebrow="Test"
          title="Système de design STV"
          description="Page temporaire pour vérifier les composants de base."
        />

        <section className="space-y-4">
          <h2 className="font-display text-xl font-bold">Boutons</h2>
          <div className="flex flex-wrap items-center gap-3">
            <Button>Principal</Button>
            <Button variant="secondary">Secondaire</Button>
            <Button variant="outline">Contour</Button>
            <Button variant="ghost">Discret</Button>
            <Button disabled>Désactivé</Button>
            <Button href="/">Lien vers l’accueil</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Petit</Button>
            <Button size="md">Moyen</Button>
            <Button size="lg">Grand</Button>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-xl font-bold">Badges</h2>
          <div className="flex flex-wrap gap-2">
            <Badge>Ventilateurs</Badge>
            <Badge variant="neutral">Extracteurs</Badge>
            <Badge variant="outline">Accessoires</Badge>
          </div>
        </section>

        <section className="max-w-lg space-y-4">
          <h2 className="font-display text-xl font-bold">Formulaire</h2>
          <Input label="Nom complet" placeholder="Ex. Ahmed Ben Ali" required />
          <Input
            label="E-mail"
            type="email"
            hint="Nous ne partagerons jamais votre adresse."
          />
          <Input label="Téléphone" error="Numéro de téléphone invalide." />
          <Textarea label="Message" placeholder="Votre demande..." />
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-xl font-bold">
            Animation (faites défiler)
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[0, 0.1, 0.2].map((delay) => (
              <Reveal key={delay} delay={delay}>
                <div className="rounded-xl bg-brand-50 p-6">
                  <p className="font-medium text-brand-900">
                    Carte avec apparition
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </Container>
    </main>
  )
}