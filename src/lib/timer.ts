/*
interface TimerListener {
  onStarted?: (timer: Timer) => void
  onSplit?: (timer: Timer, split_number: number) => void
  onFinished?: (timer: Timer) => void
}

class Timer {
  state: "ready" | "running" | "done"
  splits: number[]
  listeners: TimerListener[]

  constructor(splits: number[]) {
    for (const split of splits) {
      if (split <= 0) {
        throw new Error(`invalid split ${split}`)
      }
    }

    this.state = "ready"
    this.splits = [...splits]
    this.listeners = []
  }

  addListener(listener: TimerListener) {
    this.listeners.push(listener)
  }

  removeListener(listener: TimerListener) {
    this.listeners = this.listeners.filter((l) => l != listener)
  }

  start() {
    if (this.state != "ready") {
      throw new Error("not ready")
    }

    this.state = "running"

    this._startSplit(0)

    setImmediate(() => {
      for (const listener of this.listeners) {
        if (listener.onStarted) {
          listener.onStarted(this)
        }
      }
    });
  }

  _startSplit(split_number: number) {
    if (split_number < this.splits.length) {
      setTimeout(() => {
        this._startSplit(split_number + 1)
      }, this.splits[split_number] * 1000)

      setImmediate(() => {
        for (const listener of this.listeners) {
          if (listener.onSplit) {
            listener.onSplit(this, split_number)
          }
        }
      });
    } else {
      this._finish()
    }
  }

  _finish() {
    this.state = "done"

    setImmediate(() => {
      for (const listener of this.listeners) {
        if (listener.onFinished) {
          listener.onFinished(this)
        }
      }
    });
  }
}
*/

interface Time {
  seconds_elapsed: number
  seconds_remaining: number
  split_number: number
  split_seconds_elapsed: number
  split_seconds_remaining: number
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

    return {
      seconds_elapsed,
      seconds_remaining,
      split_number,
      split_seconds_elapsed,
      split_seconds_remaining,
    }
  }
}
