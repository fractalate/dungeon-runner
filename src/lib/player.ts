export interface Player {
  level: number,
  exp_gained: number,
  programs_finished: number,
  events: PlayerEvent[],
}

export function upgradePlayerObject(player: Player): Player {
  player = structuredClone(player)
  if (player.level == null) {
    player.level = 1
  }
  if (player.exp_gained == null) {
    player.exp_gained = 0
  }
  if (player.programs_finished == null) {
    player.programs_finished = 0
  }
  if (player.events == null) {
    player.events = []
  }
  return player
}

export function newPlayerObject(): Player {
  return {
    level: 1,
    exp_gained: 0,
    programs_finished: 0,
    events: [],
  }
}

function popPlayerEvent(player: Player): Player {
  const result = structuredClone(player)
  result.events.shift()
  return result
}

export function pushPlayerEvent(player: Player, event: PlayerEvent): Player {
  const result = structuredClone(player)
  result.events.push(event)
  result.events.sort((a, b) => PLAYER_EVENT_PRIORITY[a.ov] - PLAYER_EVENT_PRIORITY[b.ov])
  return result
}

export function getExpForLevel(level: number) {
  if (level <= 1) {
    return 0
  }
  return (Math.floor(Math.pow(1.3, level - 1) * 10) - 10) * 1000
}

export type PlayerEvent =
  | PlayerEventChestOpen
  | PlayerEventChestOpenResult
  | PlayerEventLevelUp
  | PlayerEventProgramComplete

export interface PlayerEventGainExp {
  ov: "player_event.gain_exp",
  exp_gained: number,
}

export interface PlayerEventChestOpen {
  ov: "player_event.chest_open",
  level: number,
}

export interface PlayerEventChestOpenResult {
  ov: "player_event.chest_open_result",
  exp_gained: number,
}

export interface PlayerEventLevelUp {
  ov: "player_event.level_up",
  level: number,
}

export interface PlayerEventProgramComplete {
  ov: "player_event.program_complete",
  name: string,
  exp_gained: number,
}

// Lower priority means it happens first.
const PLAYER_EVENT_PRIORITY = {
  "player_event.level_up": 30,

  "player_event.chest_open_result": 39,
  "player_event.chest_open": 40,

  "player_event.program_complete": 60,
}

function doPlayerEventChestOpen(player: Player, event: PlayerEventChestOpen): Player {
  player = popPlayerEvent(player)
  const expCurrentLevel = getExpForLevel(event.level)
  const expNextLevel = getExpForLevel(event.level + 1)
  const levelFraction = Math.random() * 0.65 + 0.20
  const exp_gained = Math.round((expNextLevel - expCurrentLevel) * levelFraction)
  return pushPlayerEvent(player, {
    ov: "player_event.chest_open_result",
    exp_gained,
  })
}

function doPlayerEventChestOpenResult(player: Player, event: PlayerEventChestOpenResult): Player {
  player = popPlayerEvent(player)
  player = _gainExp(player, event.exp_gained)
  return player
}

function doPlayerEventLevelUp(player: Player, _event: PlayerEventLevelUp): Player {
  return popPlayerEvent(player)
}

function doPlayerEventProgramComplete(player: Player, event: PlayerEventProgramComplete): Player {
  player = popPlayerEvent(player)
  player.programs_finished += 1
  player = pushPlayerEvent(player, {
    ov: "player_event.chest_open",
    level: player.level,
  })
  player = _gainExp(player, event.exp_gained)
  return player
}

function _gainExp(player: Player, exp_gained: number): Player {
  player.exp_gained += exp_gained
  while (player.exp_gained >= getExpForLevel(player.level + 1)) {
    player.level += 1
    player = pushPlayerEvent(player, {
      ov: "player_event.level_up",
      level: player.level,
    })
  }
  return player
}

export function doPlayerEvent(player: Player): Player {
  if (player.events.length == 0) {
    return player
  }
  const event = player.events[0]
  if (event.ov == "player_event.chest_open") {
    return doPlayerEventChestOpen(player, event)
  } else if (event.ov == "player_event.chest_open_result") {
    return doPlayerEventChestOpenResult(player, event)
  } else if (event.ov == "player_event.level_up") {
    return doPlayerEventLevelUp(player, event)
  } else if (event.ov == "player_event.program_complete") {
    return doPlayerEventProgramComplete(player, event)
  } else {
    return event // Error when not all cases are handled.
  }
}
