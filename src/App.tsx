import { Button } from "@/components/ui/button"
import { Timer } from "@/lib/timer"
import { useEffect, useState } from "react";

const splits = [
  5 * 60,
  60,
  90,
  60,
  90,
  60,
  90,
  60,
  90,
  60,
  90,
  60,
  90,
  60,
  90,
  60,
  90,
  5 * 60,
]
const stage = [
  "warmup",
  "run",
  "walk",
  "run",
  "walk",
  "run",
  "walk",
  "run",
  "walk",
  "run",
  "walk",
  "run",
  "walk",
  "run",
  "walk",
  "run",
  "walk",
  "cool down",
]

const timer = new Timer(splits)

function formatTime(seconds: number) {
  const min = Math.floor(seconds / 60)
  const sec = Math.round(seconds - min * 60)

  return ("" + min).padStart(2, "0") + ":" + ("" + sec).padStart(2, "0")
}

function startTimer() {
  timer.reset()
  timer.start()
}

export default function App() {
  const [_, setCurrentTime] = useState(new Date().getTime() / 1000);

  const {
    seconds_elapsed,
    seconds_remaining,
    split_number,
    split_seconds_elapsed,
    split_seconds_remaining,
  } = timer.time()

  const this_stage = seconds_elapsed > 0 ? stage[split_number] : "ready!"

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().getTime() / 1000)
    }, 250)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-4 py-safe pt-6 pb-6">
        <header className="sticky top-0 z-10 -mx-4 border-b bg-background/80 px-4 py-3 backdrop-blur">
          <h1 className="text-lg font-semibold">Dungeon Runner</h1>
        </header>

        <section className="flex flex-1 flex-col justify-center gap-4 py-6">
          <div className="rounded-2xl border bg-card p-4 shadow-sm">
            <p className="mt-2 text-sm text-muted-foreground">
              {this_stage}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              elapsed: {formatTime(seconds_elapsed)}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              remaining: {formatTime(seconds_remaining)}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              split number: {split_number}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              split seconds elapsed: {formatTime(split_seconds_elapsed)}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              split seconds remaining: {formatTime(split_seconds_remaining)}
            </p>
          </div>

          <Button size="lg" className="h-12 rounded-xl" onClick={() => startTimer()}>
            Continue
          </Button>
        </section>
      </div>
    </main>
  )
}
