import Activity from "./Activity"
import PlayerProviderLocalStorage from "./PlayerProviderLocalStorage"
import SelectedProgramProvider from "./SelectedProgramProvider"
import TimerProvider from "./TimerProvider"

export default function App() {
  return <PlayerProviderLocalStorage>
    <SelectedProgramProvider>
      <TimerProvider>
        <Activity />
      </TimerProvider>
    </SelectedProgramProvider>
  </PlayerProviderLocalStorage>
}
