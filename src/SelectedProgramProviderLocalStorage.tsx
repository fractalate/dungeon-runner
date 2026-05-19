import { ReactNode, useMemo, useState } from "react"
import { SelectedProgramContext } from "./SelectedProgramContext"
import { Program, PROGRAM_PRESETS } from "./lib/program"

type SelectedProgramProviderProps = {
  children: ReactNode
}

export default function SelectedProgramProviderLocalStorage({ children }: SelectedProgramProviderProps) {
  const storedProgram = useMemo(() => {
    const programIdentifier = localStorage.getItem("program.current")

    if (programIdentifier) {
      for (const program of PROGRAM_PRESETS) {
        if (program.identifier == programIdentifier) {
          return program
        }
      }
    }

    console.log("no selected program. selecting default")

    return PROGRAM_PRESETS[0]
  }, [])
  
  const [selectedProgram, _setSelectedProgram] = useState(storedProgram)

  const setSelectedProgram = (program: Program) => {
    if (selectedProgram.identifier != program.identifier) {
      localStorage.setItem("program.current", program.identifier)
      _setSelectedProgram(structuredClone(program))
    }
  }
  
  return <SelectedProgramContext.Provider value={{
    selectedProgram,
    setSelectedProgram,
  }}>
    {children}
  </SelectedProgramContext.Provider>
}
