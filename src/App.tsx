import Activity from "./Activity"
import PlayerProviderLocalStorage from "./PlayerProviderLocalStorage"
import SelectedProgramProviderLocalStorage from "./SelectedProgramProviderLocalStorage"
import TimerProvider from "./TimerProvider"

export default function App() {
  return <PlayerProviderLocalStorage>
    <SelectedProgramProviderLocalStorage>
      <TimerProvider>
        <Activity />
      </TimerProvider>
    </SelectedProgramProviderLocalStorage>
  </PlayerProviderLocalStorage>
}
