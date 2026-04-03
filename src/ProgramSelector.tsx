import { useContext } from "react"
import { PROGRAM_PRESETS } from "./lib/program"
import { SelectedProgramContext } from "./SelectedProgramContext"
import { Button } from "./components/ui/button"

export default function ProgramSelector() {
  const { setSelectedProgram } = useContext(SelectedProgramContext)

  const result = Object.values(PROGRAM_PRESETS).map((program) => {
    return <Button key={program.name} size="lg" className="h-12 rounded-xl" onClick={() => setSelectedProgram(program)}>
      {program.name} - {program.description}
    </Button>
  })

  return result
}
