import { useContext } from "react"
import { PlayerContext } from "./PlayerContext"

export default function PlayerStats() {
  const { player } = useContext(PlayerContext)

  return <div>
    Exp Gained: {player.exp_gained}
  </div>
}
