import { ReactNode, useState } from "react"
import { SelectedProgramContext } from "./SelectedProgramContext"
import { PROGRAM_PRESETS } from "./lib/program"

type SelectedProgramProviderProps = {
  children: ReactNode
}

export default function SelectedProgramProvider({ children }: SelectedProgramProviderProps) {
  const [selectedProgram, setSelectedProgram] = useState(PROGRAM_PRESETS.short)

  return <SelectedProgramContext.Provider value={{
    selectedProgram,
    setSelectedProgram,
  }}>
    {children}
  </SelectedProgramContext.Provider>
}
