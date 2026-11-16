import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-surface px-4">
      <Image
        src="/images/stv-logo.png"
        alt="STV, Société Tunisienne de Ventilation"
        width={280}
        height={280}
        priority
        className="h-auto w-64"
      />
      <h1 className="font-display text-3xl font-bold text-brand-900">
        Catalogue de ventilation
      </h1>
      <p className="max-w-md text-center text-brand-700">
        Test de la fondation du projet : thème, polices et logo.
      </p>
      <button className="rounded-lg bg-brand-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-brand-700">
        Bouton de test
      </button>
    </main>
  )
}