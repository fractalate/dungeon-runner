interface Time {
  seconds_elapsed: number
  seconds_remaining: number
  split_number: number
  split_seconds_elapsed: number
  split_seconds_remaining: number
  state: "ready" | "running" | "paused" | "done"
}

function getSeconds(): number {
  return new Date().getTime() / 1000
}

export class Timer {
  time_started: number
  time_paused: number
  splits: number[]

  constructor(splits: number[]) {
    this.splits = [...splits]
    this.time_started = 0
    this.time_paused = 0
  }

  start() {
    this.time_started = getSeconds()
  }

  pause() {
    this.time_paused = getSeconds()
  }

  resume() {
    const now = getSeconds()
    const seconds_paused = now - this.time_paused
    this.time_started += seconds_paused
    this.time_paused = 0
  }

  reset() {
    this.time_started = 0
    this.time_paused = 0
  }

  time(): Time {
    const now = getSeconds()

    let seconds_elapsed = 0
    let seconds_remaining = 0
    let split_number = 0
    let split_seconds_elapsed = 0
    let split_seconds_remaining = 0

    for (const split of this.splits) {
      seconds_remaining += split
    }

    if (this.time_started > 0) {
      if (this.time_paused > 0) {
        seconds_elapsed = this.time_paused - this.time_started
      } else {
        seconds_elapsed = now - this.time_started
      }
      if (seconds_elapsed > seconds_remaining) {
        seconds_elapsed = seconds_remaining
      }
      seconds_remaining -= seconds_elapsed

      split_seconds_elapsed = seconds_elapsed
      for (const split of this.splits) {
        if (split_seconds_elapsed < split) {
          split_seconds_remaining = split - split_seconds_elapsed
          break
        }
        if (split_number + 1 < this.splits.length) {
          split_number += 1
          split_seconds_elapsed -= split
        }
      }
    }

    let state: "ready" | "running" | "paused" | "done" = "ready"
    if (this.time_paused > 0) {
      state = "paused"
    } else if (this.time_started > 0 && seconds_remaining == 0) {
      state = "done"
    } else if (this.time_started > 0) {
      state = "running"
    }

    return {
      seconds_elapsed,
      seconds_remaining,
      split_number,
      split_seconds_elapsed,
      split_seconds_remaining,
      state,
    }
  }
}
