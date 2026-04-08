import { ReactNode, useState } from "react"
import { SelectedProgramContext } from "./SelectedProgramContext"
import { PROGRAM_PRESETS } from "./lib/program"

type SelectedProgramProviderProps = {
  children: ReactNode
}

export default function SelectedProgramProvider({ children }: SelectedProgramProviderProps) {
  const [selectedProgram, setSelectedProgram] = useState(PROGRAM_PRESETS.program_a1)

  return <SelectedProgramContext.Provider value={{
    selectedProgram,
    setSelectedProgram,
  }}>
    {children}
  </SelectedProgramContext.Provider>
}
