import { Button } from "@/components/ui/button"

export default function App() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-4 py-safe pt-6 pb-6">
        <header className="sticky top-0 z-10 -mx-4 border-b bg-background/80 px-4 py-3 backdrop-blur">
          <h1 className="text-lg font-semibold">Mobile App</h1>
          <p className="text-sm text-muted-foreground">
            Vite + React + TypeScript + Tailwind + shadcn/ui
          </p>
        </header>

        <section className="flex flex-1 flex-col justify-center gap-4 py-6">
          <div className="rounded-2xl border bg-card p-4 shadow-sm">
            <h2 className="text-base font-medium">Ready</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              This starter is sized for mobile-first browser use.
            </p>
          </div>

          <Button size="lg" className="h-12 rounded-xl">
            Continue
          </Button>
        </section>
      </div>
    </main>
  )
}
