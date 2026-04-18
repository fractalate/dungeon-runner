import { createContext } from "react"
import { Player } from "./lib/player"

interface PlayerContextType {
  player: Player,
  setPlayer: (player: Player) => void,
}

const NULL_PLAYER_CONTEXT = {
  player: {} as Player, // We want errors if the default value is used.
  setPlayer: () => {},
}

export const PlayerContext = createContext<PlayerContextType>(NULL_PLAYER_CONTEXT)
