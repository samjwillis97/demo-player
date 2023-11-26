import { derived, writable } from "svelte/store";
import { parseEvents, parseHeader, parseTicks } from "../../demoparser/pkg/demoparser2";
import { arrayRange, getPlayerInfoRoundStart, getRoundScores, teamNumberToLongString, teamNumberToString } from "$lib/helpers";
import { asyncDerived } from "@square/svelte-store";

export type fileRounds = {
  matchStartTick: number;
  matchEndTick: number;
  roundStartEvents: Map<string, unknown>[];
  roundEndEvents: Map<string, unknown>[];
}

const isValidHeadersResponse = (headers: unknown): headers is Map<string, string> => {
  return headers instanceof Map;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidEventResponse = (events: unknown): events is Map<string, unknown>[] => {
  return Array.isArray(events) && events.every((event) => event instanceof Map)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidTicksResponse = (ticks: unknown): ticks is Map<string, unknown>[] => {
  return Array.isArray(ticks) && ticks.every((event) => event instanceof Map)
}

const eventsToTrack = [
  "begin_new_match", "round_start", "round_end", "round_mvp", 
  "player_death", "bomb_planted", "bomb_defused", "hostage_rescued", 
  "weapon_fire", "flashbang_detonate", "hegrenade_detonate", 
  "molotov_detonate", "smokegrenade_detonate", "player_hurt", 
  "team_score_first_half", "team_score_second_half",
  "player_blind"
];

const tickEventsToTrack = [
  "X", "Y", "Z", "pitch", "yaw",
  "velocity_X", "velocity_Y", "velocity_Z",
  "has_defuser",
  "armor_value", "has_helmet",
  "health",
  "balance",
  "equipment_value_this_round", "cash_spent_this_round",
  "is_alive", "team_num", "player_name", 
  "kills_total", "assists_total", "damage_total",
  "deaths_total", "mvps", "headshot_kills_total", "score",
  "team_rounds_total",
  "player_steamid",
  "inventory"
];

export const currentRound = writable(1);

export const fileStore = writable<Uint8Array | undefined>();

export const headersAsync = asyncDerived(fileStore, async ($file) => {
  if (!$file) return undefined

  const headers = parseHeader($file);
  if (!isValidHeadersResponse(headers)) {
    throw new Error("Unable to Parse file")
  }

  console.log("ASYNC HEADER")
  console.log(headers)

  return headers
}, undefined)

export const headers = derived(fileStore, (file) => {
  if (!file) return undefined

  const headers = parseHeader(file);
  if (!isValidHeadersResponse(headers)) {
    throw new Error("Unable to Parse file")
  }

  console.log("HEADER")
  console.log(headers)

  return headers
}, undefined)

export const allEvents = derived(fileStore, (file) => {
  if (!file) return
  const allEvents = parseEvents(
    file,
    eventsToTrack, 
    ['game_time', 'team_num']
  )

  if (!isValidEventResponse(allEvents)) return undefined

  console.log("ALL EVENTS")
  console.log(allEvents)

  return allEvents
})

export const tickMap = derived([fileStore, allEvents], ([file, events]) => {
  if (!file || !events) return
  const ticks = new Int32Array(events.map((e) => {
      const tick = e.get('tick')
      if (!tick || typeof tick !== 'number') return undefined
      return tick
    })
    .filter((v) => v !== undefined) as number[])

  const tickEvents = parseTicks(
    file,
    tickEventsToTrack,
    ticks
  );

  if (!isValidTicksResponse(tickEvents)) return undefined

  const tickMap = new Map<number, Map<string, unknown>[]>();
  for (const event of tickEvents) {
    const tick = event.get('tick')
    if (typeof tick !== 'number') return undefined
    const events = tickMap.get(tick)
    if (!events) {
      tickMap.set(tick, [event])
    } else {
      events.push(event)
    }
  }

  console.log('Tick Events')
  console.log(tickMap)

  return tickMap
})

export const rounds = derived(allEvents, (events) => {
  if (!events) return undefined

  let matchStartTick = 0;
  const roundStartEvents = [];
  const roundEndEvents = [];

  for (const event of events) {
    if (!event || typeof event !== 'object') continue
    const tick = event.get('tick')
    switch (event.get('event_name')) {
      case 'begin_match':
        if (matchStartTick !== 0) break;
        if (typeof tick !== 'number') break;
        matchStartTick = tick;
        break;
      case 'round_start':
        roundStartEvents.push(event)
        break;
      case 'round_end':
        if (typeof tick !== 'number') break;
        if (tick < matchStartTick) break;
        roundEndEvents.push(event)
        break;
    }
  }
  const matchEndTick = Math.max(...roundEndEvents.map(e => e.get('tick') as number))

  const rounds = {
    matchStartTick,
    matchEndTick,
    roundStartEvents,
    roundEndEvents,
  }

  console.log("ROUNDS")
  console.log(rounds)

  return rounds
})

export const roundTicks = derived([fileStore, rounds, currentRound], ([file, rounds, currentRound]) => {
  if (!file || !rounds) return
  const ticks = new Int32Array(
    arrayRange(
      rounds.roundStartEvents[currentRound - 1].get('tick') as number,
      rounds.roundEndEvents[currentRound - 1].get('tick') as number
    )
  )

  const tickEvents = parseTicks(
    file,
    tickEventsToTrack,
    ticks
  );

  if (!isValidTicksResponse(tickEvents)) return undefined

  const tickMap = new Map<number, Map<string, unknown>[]>();
  for (const event of tickEvents) {
    const tick = event.get('tick')
    if (typeof tick !== 'number') return undefined
    const events = tickMap.get(tick)
    if (!events) {
      tickMap.set(tick, [event])
    } else {
      events.push(event)
    }
  }

  console.log('Round Tick Events')
  console.log(tickMap)

  return tickMap
})

export const scoresConst = derived([rounds, tickMap], ([rounds, tickMap]) => {
  if (!rounds || !tickMap) return undefined

  const scores = getRoundScores(rounds.roundEndEvents, tickMap)

  console.log("SCORES Resolved")
  console.log(scores)

  return scores
})

export const scores = derived([rounds, tickMap], ([rounds, tickMap]) => {
  if (!rounds || !tickMap) return undefined

  const scores = getRoundScores(rounds.roundEndEvents, tickMap)

  console.log("SCORES Resolved")
  console.log(scores)

  return scores
})

export const playerState = derived([currentRound, rounds, roundTicks], (
  [
    currentRound,
    rounds,
    tickMap 
  ]
) => {
  if (!rounds || !tickMap) return undefined
  const players = getPlayerInfoRoundStart(currentRound, rounds, tickMap)

  console.log("PLAYERS Resolved")
  console.log(players)

  return players
})

export const currentTeams = derived([currentRound, rounds], (
  [
    currentRound,
    rounds,
  ]
) => {
  if (!rounds) return undefined
  const gameLength = rounds.roundEndEvents.length

  const result = {
    2: {
      short: teamNumberToString(2, currentRound, gameLength),
      long: teamNumberToLongString(2, currentRound, gameLength)
    },
    3: {
      short: teamNumberToString(3, currentRound, gameLength),
      long: teamNumberToLongString(3, currentRound, gameLength)
    }
  }

  console.log("CURRENT TEAMS")
  console.log(result)

  return result
})

// NOTE: Could probably make the players and headers as derived
// // Ticks as well??
