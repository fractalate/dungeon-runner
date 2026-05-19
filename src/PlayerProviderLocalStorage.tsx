import { ReactNode, useMemo, useState } from "react"
import { PlayerContext } from "./PlayerContext"
import { newPlayerObject, Player, upgradePlayerObject } from "./lib/player"

type PlayerProviderLocalStorageProps = {
  children: ReactNode
}

export default function PlayerProviderLocalStorage({ children }: PlayerProviderLocalStorageProps) {
  const stored_player: Player = useMemo(() => {
    const playerData = localStorage.getItem("player.current")

    if (playerData) {
      try {
        return upgradePlayerObject(JSON.parse(playerData))
      } catch (err) {
        console.error(err)
      }
    }

    console.log("couldn't load player data. making new player")

    return newPlayerObject()
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
