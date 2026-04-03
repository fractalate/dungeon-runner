import Activity from "./Activity"
import SelectedProgramProvider from "./SelectedProgramProvider"
import TimerProvider from "./TimerProvider"

export default function App() {
  return <SelectedProgramProvider>
    <TimerProvider>
      <Activity />
    </TimerProvider>
  </SelectedProgramProvider>
}
