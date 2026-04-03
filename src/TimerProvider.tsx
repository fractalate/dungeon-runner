import { ReactNode, useContext, useMemo } from "react"
import { SelectedProgramContext } from "./SelectedProgramContext"
import { Timer } from "./lib/timer"
import { TimerContext } from "./TimerContext"

interface TimerProviderProps {
  children: ReactNode
}

export default function TimerProvider({ children }: TimerProviderProps) {
  const { selectedProgram } = useContext(SelectedProgramContext)

  const timer = useMemo(() => {
    const splits = selectedProgram.splits.map((split) => split.duration)
    return new Timer(splits)
  }, [selectedProgram])

  return <TimerContext.Provider value={{
    timer,
  }}>
    {children}
  </TimerContext.Provider>
}
