import { Button } from "@/components/ui/button"
import { useContext, useEffect, useState } from "react"
import useSound from "use-sound"
import jostle from "./jostle.mp3"
import { TimerContext } from "./TimerContext"
import { SelectedProgramContext } from "./SelectedProgramContext"
import ProgramSelector from "./ProgramSelector"

function formatTime(seconds: number) {
  const min = Math.floor(seconds / 60)
  const sec = Math.round(seconds - min * 60)

  return ("" + min).padStart(2, "0") + ":" + ("" + sec).padStart(2, "0")
}

export default function Activity() {
  const [_, setCurrentTime] = useState(new Date().getTime() / 1000)
  const { timer } = useContext(TimerContext)
  const { selectedProgram } = useContext(SelectedProgramContext)
  const [playJostle] = useSound(jostle)
  const {
    seconds_elapsed,
    seconds_remaining,
    split_number,
    split_seconds_elapsed,
    split_seconds_remaining,
    state,
  } = timer.time()
  const this_stage = seconds_elapsed > 0 ? selectedProgram.splits[split_number].title : "Ready!"

  const startTimer = async () => {
    if ("wakeLock" in navigator) {
      await navigator.wakeLock.request("screen")
    }
    timer.reset()
    timer.start()
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().getTime() / 1000)
    }, 250)
    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    if (state != "ready") {
      playJostle()
    }
  }, [state, split_number, timer.time_started]) // XXX Really not supposed to use timer.time_started here

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-4 py-safe pt-6 pb-6">
        <header className="sticky top-0 z-10 -mx-4 border-b bg-background/80 px-4 py-3 backdrop-blur">
          <h1 className="text-lg font-semibold">Dungeon Runner</h1>
          <ProgramSelector />
        </header>

        <section className="flex flex-1 flex-col justify-center gap-4 py-6">
          <div className="rounded-2xl border bg-card p-4 shadow-sm">
            <p className="mt-2 text-md">
              {selectedProgram.name}
            </p>
            <p className="mt-2 text-sm">
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
            Start!
          </Button>
        </section>
      </div>
    </main>
  )
}
