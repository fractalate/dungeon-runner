import { ReactNode, useCallback, useContext } from "react"
import { PlayerContext } from "./PlayerContext"
import { Button } from "./components/ui/button"
import { doPlayerEvent } from "./lib/player"

export default function PlayerEventInfo(): ReactNode {
  const { player, setPlayer } = useContext(PlayerContext)

  const doEvent = useCallback(() => {
    setPlayer(doPlayerEvent(player))
  }, [player])

  if (player.events.length == 0) {
    return <></>
  }

  const event = player.events[0]

  let info = null

  if (event.ov == "player_event.chest_open") {
    info = <div>You've found a chest!</div>
  } else if (event.ov == "player_event.chest_open_result") {
    info = <div>You open the chest and gain {event.exp_gained} exp!</div>
  } else if (event.ov == "player_event.level_up") {
    info = <div>You've reached level {event.level}!</div>
  } else if (event.ov == "player_event.program_complete") {
    info = <div>Program complete! Good job! You earned {event.exp_gained} exp!</div>
  } else {
    return event
  }

  return <>
    {info}
    <Button onClick={() => doEvent()}>Yay!</Button>
  </>
}
