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

  const onSelectProgram = (programIdentifier: string, program: Program) => {
    setSelectedProgram(programIdentifier, program)
    setSelectorOpen(false)
  }

  if (!selectorOpen) {
    return <Button key={selectedProgram.name} size="lg" className="h-12 rounded-xl" onClick={() => onOpenSelector()}>
      {selectedProgram.name} - {selectedProgram.description}
    </Button>
  }

  const result = []
  const programIdentifiers = Object.keys(PROGRAM_PRESETS) as (keyof typeof PROGRAM_PRESETS)[]
  for (const programIdentifier of programIdentifiers) {
    const program = PROGRAM_PRESETS[programIdentifier]
    result.push(<Button key={program.name} size="lg" className="h-12 rounded-xl" onClick={() => onSelectProgram(programIdentifier, program)}>
      {program.name} - {program.description}
    </Button>)
  }

  return result
}
