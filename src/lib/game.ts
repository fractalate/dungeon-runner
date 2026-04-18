import { Player } from "./player"
import { getScore, Program, Score } from "./program"
import { Timer } from "./timer"

export function gameRulePlayerFinishProgram(player: Player, score: Score): Player {
  const result = structuredClone(player)
  result.exp_gained += score.exp_gained
  result.programs_finished += 1
  return result
}

export class GameRuleDoProgram {
  player: Player
  timer: Timer
  program: Program
  setPlayer: (player: Player) => void
  state: "unchecked" | "ready" | "running" | "done"

  constructor(player: Player, timer: Timer, program: Program, setPlayer: (player: Player) => void) {
    this.player = player
    this.timer = timer
    this.program = program
    this.setPlayer = setPlayer
    this.state = "unchecked"

    this.check()
  }

  start() {
    this.timer.reset()
    this.timer.start()
  }

  pause() {
    this.timer.pause()
  }

  resume() {
    this.timer.resume()
  }

  check() {
    const time = this.timer.time()
    const score = getScore(this.program, time)

    if (this.state == "running" && time.state == "done") {
      this.setPlayer(gameRulePlayerFinishProgram(this.player, score))
      this.state = "done"
    } else if (this.state != "done") {
      this.state = "running"
    }
  }
}
