import { createContext } from "react"
import { Program, PROGRAM_PRESETS } from "./lib/program"

interface SelectedProgramContextType {
  selectedProgram: Program,
  setSelectedProgram: (program: Program) => void,
}

const NULL_SELECTED_PROGRAM_CONTEXT = {
  selectedProgram: PROGRAM_PRESETS.phase_a,
  setSelectedProgram: () => {},
}

export const SelectedProgramContext = createContext<SelectedProgramContextType>(NULL_SELECTED_PROGRAM_CONTEXT)
