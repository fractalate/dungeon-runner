export interface Split {
  duration: number
  title: string
}

export interface Program {
  name: string
  description: string
  splits: Split[]
}

function warm_up() {
  return {
    duration: 5 * 60,
    title: "Warm Up",
  }
}

function cool_down() {
  return {
    duration: 5 * 60,
    title: "Cool Down",
  }
}

function run(duration: number) {
  return {
    duration,
    title: "Run",
  }
}

function walk(duration: number) {
  return {
    duration,
    title: "Walk",
  }
}

export const PROGRAM_PRESETS: Record<string, Program> = {
  phase_a: {
    name: "Phase A",
    description: "1:00 on, 1:30 off, 20:00 active",
    splits: [
      warm_up(),
      run(60),
      walk(90),
      run(60),
      walk(90),
      run(60),
      walk(90),
      run(60),
      walk(90),
      run(60),
      walk(90),
      run(60),
      walk(90),
      run(60),
      walk(90),
      run(60),
      walk(90),
      cool_down(),
    ]
  },
  phase_b: {
    name: "Phase B",
    description: "1:00 on, 1:15 off, 20:00 active",
    splits: [
      warm_up(),
      run(60),
      walk(75),
      run(60),
      walk(75),
      run(60),
      walk(75),
      run(60),
      walk(75),
      run(60),
      walk(75),
      run(60),
      walk(75),
      run(60),
      walk(75),
      run(60),
      walk(75),
      run(60),
      walk(60),
      cool_down(),
    ]
  },
  phase_c: {
    name: "Phase C",
    description: "1:15 on, 1:15 off, 20:00 active",
    splits: [
      warm_up(),
      run(75),
      walk(75),
      run(75),
      walk(75),
      run(75),
      walk(75),
      run(75),
      walk(75),
      run(75),
      walk(75),
      run(75),
      walk(75),
      run(75),
      walk(75),
      run(75),
      walk(75),
      cool_down(),
    ]
  },
}


