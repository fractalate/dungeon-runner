import { useContext, useState } from "react"
import { Program, PROGRAM_PRESETS } from "./lib/program"
import { SelectedProgramContext } from "./SelectedProgramContext"
import { Button } from "./components/ui/button"

export default function ProgramSelector() {
  const { selectedProgram, setSelectedProgram } = useContext(SelectedProgramContext)
  const [ selectorOpen, setSelectorOpen ] = useState(false)

  const onOpenSelector = () => {
    setSelectorOpen(true)
  }

  const onSelectProgram = (program: Program) => {
    setSelectedProgram(program)
    setSelectorOpen(false)
  }

  if (!selectorOpen) {
    return <Button key={selectedProgram.name} size="lg" className="h-12 rounded-xl" onClick={() => onOpenSelector()}>
      {selectedProgram.name} - {selectedProgram.description} ▼
    </Button>
  }

  const result = []
  const programIdentifiers = Object.keys(PROGRAM_PRESETS) as (keyof typeof PROGRAM_PRESETS)[]
  for (const program of PROGRAM_PRESETS) {
    result.push(<Button key={program.name} size="lg" className="h-12 rounded-xl" onClick={() => onSelectProgram(program)}>
      { program.identifier == selectedProgram.identifier ? "▶ " : "" }
      {program.name} - {program.description}
      { program.identifier == selectedProgram.identifier ? " ◀" : "" }
    </Button>)
  }

  return result
}
