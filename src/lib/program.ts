import { MoveUpLeft, Split, X } from "lucide-react"
import { Time } from "./timer"

export interface Split {
  duration: number
  title: string
  effort_level: "walk" | "run" | "sprint"
  additional_multiplier?: null | number
}

export interface Program {
  name: string
  description: string
  splits: Split[]
}

function warm_up(): Split {
  return {
    duration: 5 * 60,
    title: "Warm Up",
    effort_level: "walk",
  }
}

function cool_down(duration?: number): Split {
  return {
    duration: duration && duration > 0 ? duration : 5 * 60,
    title: "Cool Down",
    effort_level: "walk",
    additional_multiplier: 0.2,
  }
}

function run(duration: number): Split {
  return {
    duration,
    title: "Run",
    effort_level: "run",
  }
}

function sprint(duration: number): Split {
  return {
    duration,
    title: "Sprint",
    effort_level: "sprint",
  }
}

function walk(duration: number): Split {
  return {
    duration,
    title: "Walk",
    effort_level: "walk",
  }
}

export const PROGRAM_PRESETS = {
  /*
  short: {
    name: "Test",
    description: "for quick tests",
    splits: [
      run(15),
      sprint(15),
      walk(15),
    ],
  },
  */
  program_a1: {
    name: "Program A1",
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
  program_a2: {
    name: "Program A2",
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
  program_b1: {
    name: "Program B1",
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
  program_b2: {
    name: "Program B2",
    description: "1:15 on, 1:00 off, 20:00 active",
    splits: [
      warm_up(),
      run(75),
      walk(60),
      run(75),
      walk(60),
      run(75),
      walk(60),
      run(75),
      walk(60),
      run(75),
      walk(60),
      run(75),
      walk(60),
      run(75),
      walk(60),
      run(75),
      walk(60),
      run(75),
      walk(45),
      cool_down(),
    ]
  },
  bike_hiit_a1: {
    name: "Bike HIIT A1",
    description: "1:00 sprint, 1:30 walk, 1:30 run, 20:00 active",
    splits: [
      warm_up(),
      sprint(60),
      walk(90),
      run(90),
      walk(90),
      sprint(60),
      walk(90),
      run(90),
      walk(90),
      sprint(60),
      walk(90),
      run(90),
      walk(90),
      sprint(60),
      walk(90),
      sprint(60),
      cool_down(),
    ]
  },
  bike_hiit_a2: {
    name: "Bike HIIT A2",
    description: "1:15 sprint, 1:30 walk, 1:15 run, 20:30 active",
    splits: [
      warm_up(),
      sprint(75),
      walk(90),
      run(75),
      walk(90),
      sprint(75),
      walk(90),
      run(75),
      walk(90),
      sprint(75),
      walk(90),
      run(75),
      walk(90),
      sprint(75),
      walk(90),
      sprint(75),
      cool_down(4*60 + 30),
    ]
  },
}

export interface Score {
  multiplier: number,
  exp_gained: number,
}

interface SplitScore {
  additional_multiplier: number,
  exp_gained: number,
}

const POINTS_PER_SECOND = 3

function updateScore(score: Score, split: Split, secondsInSplit: number): Score {
  let effort_factor = 0.0
  let increments = 0.0
  if (split.effort_level == "run") {
    effort_factor = 0.1
    increments = Math.floor(secondsInSplit / 5 + 0.00001)
  } else if (split.effort_level == "sprint") {
    effort_factor = 0.1
    increments = Math.floor(secondsInSplit / 2 + 0.5 + 0.00001)
  } else { // "walk"
    effort_factor = -0.1
    increments = Math.floor(secondsInSplit / 10 + 0.5 + 0.00001)
  }

  // Exp is gained continuously.
  let exp_gained_multiplier = score.multiplier + effort_factor * increments * (1 + increments) / 2
  if (exp_gained_multiplier < 1.0) {
    // XXX We *should* account for the gains to exp due to multiplier that
    // would happen before the multiplier dips below 1, but multiplier is
    // expected to be generally above 1 so it's not account for.
    exp_gained_multiplier = 1.0
  }

  let exp_gained = POINTS_PER_SECOND * secondsInSplit * exp_gained_multiplier
  if (split.additional_multiplier) {
    exp_gained += POINTS_PER_SECOND * secondsInSplit * split.additional_multiplier
  }

  // We report the effective multiplier at the end of the time period.
  let multiplier = score.multiplier + increments * effort_factor
  if (multiplier < 1.0) {
    multiplier = 1.0
  } else {
    multiplier = Math.floor(multiplier * 100) / 100
  }

  return {
    multiplier,
    exp_gained: score.exp_gained + exp_gained,
  }
}

export function getScore(program: Program, time: Time): Score {
  let score: Score = {
    multiplier: 1.0,
    exp_gained: 0.0,
  }

  for (let i = 0; i < program.splits.length; ++i) {
    const split = program.splits[i]

    let secondsInSplit = split.duration
    if (i == time.split_number) {
      secondsInSplit = time.split_seconds_elapsed
    }

    score = updateScore(score, split, secondsInSplit)

    if (i >= time.split_number) {
      if (split.additional_multiplier) {
        score.multiplier += split.additional_multiplier 
      }
      break;
    }
  }

  return score
}
