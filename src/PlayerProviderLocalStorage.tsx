import { ReactNode, useMemo, useState } from "react"
import { PlayerContext } from "./PlayerContext"
import { Player } from "./lib/player"

type PlayerProviderLocalStorageProps = {
  children: ReactNode
}

export default function PlayerProviderLocalStorage({ children }: PlayerProviderLocalStorageProps) {
  const stored_player = useMemo(() => {
    const playerData = localStorage.getItem("player.current")

    if (playerData) {
      try {
        return JSON.parse(playerData) as Player
      } catch (err) {
        console.error(err)
      }
    }

    console.log("couldn't load player data. making new player")

    return {
      level: 1,
      exp_gained: 0,
      programs_finished: 0,
    } as Player
  }, [])

  const [player, _setPlayer] = useState(stored_player)

  const setPlayer = (new_player: Player) => {
    localStorage.setItem("player.previous", JSON.stringify(player))
    localStorage.setItem("player.current", JSON.stringify(new_player))
    _setPlayer(structuredClone(new_player))
  }

  return <PlayerContext.Provider value={{
    player,
    setPlayer,
  }}>
    {children}
  </PlayerContext.Provider>
}
