import { Player, pushPlayerEvent } from "./player"
import { Program, Score } from "./program"

export function gameRulePlayerFinishProgram(player: Player, program: Program, score: Score): Player {
  return pushPlayerEvent(player, {
    ov: "player_event.program_complete",
    name: program.name,
    exp_gained: score.exp_gained,
  })
}

