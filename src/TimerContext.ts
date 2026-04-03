import { createContext } from "react"
import { Timer } from "./lib/timer"

interface TimerContextType {
  timer: Timer,
}

const GLOBAL_TIMER = new Timer([1])

const NULL_TIMER_CONTEXT = {
  timer: GLOBAL_TIMER,
}

export const TimerContext = createContext<TimerContextType>(NULL_TIMER_CONTEXT)
