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
      if (programIdentifier in PROGRAM_PRESETS) {
        return PROGRAM_PRESETS[programIdentifier as keyof typeof PROGRAM_PRESETS]
      }
    }

    console.log("no selected program. selecting default")

    return PROGRAM_PRESETS.program_a1
  }, [])
  
  const [selectedProgram, _setSelectedProgram] = useState(storedProgram)

  const setSelectedProgram = (program_identifier: string, program: Program) => {
    if (program_identifier in PROGRAM_PRESETS) {
      localStorage.setItem("program.current", program_identifier)
    } else {
      localStorage.removeItem("program.current")
    }
    _setSelectedProgram(structuredClone(program))
  }
  
  return <SelectedProgramContext.Provider value={{
    selectedProgram,
    setSelectedProgram,
  }}>
    {children}
  </SelectedProgramContext.Provider>
}
