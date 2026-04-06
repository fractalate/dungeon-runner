import { createContext } from "react"

export interface Player {
  level: number,
  exp_gained: number,
  programs_finished: number,
}

interface PlayerContextType {
  player: Player,
  setPlayer: (player: Player) => void,
}

const NULL_PLAYER_CONTEXT = {
  player: {} as Player, // We want errors if the default value is used.
  setPlayer: () => {},
}

export const PlayerContext = createContext<PlayerContextType>(NULL_PLAYER_CONTEXT)
