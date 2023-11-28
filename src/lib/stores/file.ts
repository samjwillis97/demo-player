import { derived, writable } from "svelte/store";
import  { parseEvents, parseHeader, parseTicks } from "../../demoparser/pkg/demoparser2";
import { arrayRange, getPlayerInfoRoundStart, getRoundScores, teamNumberToLongString, teamNumberToString } from "$lib/helpers";
import { asyncable, type Asyncable, type AsyncValue } from "svelte-asyncable";

export type AsyncResponse<T> = AsyncError | AsyncWrapper<T>

export type AsyncError = {
  isError: true;
  message: string;
}

export type AsyncWrapper<T> = {
  isError: false;
  data: T;
}

export type fileRounds = {
  matchStartTick: number;
  matchEndTick: number;
  roundStartEvents: Map<string, unknown>[];
  roundEndEvents: Map<string, unknown>[];
}

export interface roundInfo {
  matchStartTick: number;
  matchEndTick: number;
  roundStartEvents: Map<string, unknown>[]
  roundEndEvents: Map<string, unknown>[]
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

export const currentRound = writable(0);

// let value: boolean = false
let file: Uint8Array

export const fileStore = writable<Uint8Array>();

export const asyncFile = asyncable(
  async () => file,
  async ($v: Uint8Array) => {
    file = $v
  }
)

export const headersAsync = asyncable<
  AsyncResponse<Map<string, string>>,
  [Asyncable<Uint8Array>]
>(
  async (v: AsyncValue<Uint8Array>) => {
    const file = await v
    if (!file) {
      return {
        isError: true,
        message: "missing file"
      }
    }

    const headers = parseHeader(file);
    if (!isValidHeadersResponse(headers)) {
      return {
        isError: true,
        message: "unable to parse file"
      }
    }

    console.log("ASYNC HEADER")
    console.log(headers)
    currentRound.set(1)

    return {
      isError: false,
      data: headers
    }
  },
  undefined,
  [asyncFile], 
)

export const asyncEvents = asyncable<
  AsyncResponse<Map<string, unknown>[]>,
  [Asyncable<Uint8Array>]
>(
  async(v: AsyncValue<Uint8Array>) => {
    const file = await v
    if (!file) return {
      isError: true,
      message: "missing file"
    }

    const allEvents = parseEvents(
      file,
      eventsToTrack, 
      ['game_time', 'team_num']
    )

    if (!isValidEventResponse(allEvents)) return {
      isError: true,
      message: "unable to parse events"
    }

    console.log("ALL EVENTS")
    console.log(allEvents)

    return {
      isError: false,
      data: allEvents
    }
  },
  undefined,
  [asyncFile]
)

export const asyncRounds = asyncable<
  AsyncResponse<roundInfo>,
  [Asyncable<AsyncResponse<Map<string, unknown>[]>>]
>(
  async(v: AsyncValue<AsyncResponse<Map<string, unknown>[]>>) => {
    const events = await v;
    if (events.isError) return events

    let matchStartTick = 0;
    const roundStartEvents = [];
    const roundEndEvents = [];

    for (const event of events.data) {
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

    return {
      isError: false,
      data: rounds
    }
  },
  undefined,
  [asyncEvents]
)

export const asyncTickMap = asyncable<
  AsyncResponse<Map<number, Map<string, unknown>[]>>,
  [Asyncable<Uint8Array>, Asyncable<AsyncResponse<Map<string, unknown>[]>>]
>(
  async (asyncFile: AsyncValue<Uint8Array>, asyncEvents: AsyncValue<AsyncResponse<Map<string, unknown>[]>>) => {
    const file = await asyncFile
    const events = await asyncEvents

    if (!file) return {
      isError: true,
      message: "Missing file"
    }

    if (events.isError) return events

    const ticks = new Int32Array(events.data.map((e) => {
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

    if (!isValidTicksResponse(tickEvents)) return {
      isError: true,
      message: "Unable to parse ticks"
    }

    const tickMap = new Map<number, Map<string, unknown>[]>();
    for (const event of tickEvents) {
      const tick = event.get('tick')
      if (typeof tick !== 'number') continue
      const events = tickMap.get(tick)
      if (!events) {
        tickMap.set(tick, [event])
      } else {
        events.push(event)
      }
    }

    console.log('Tick Events')
    console.log(tickMap)

    return {
      isError: false,
      data: tickMap
    }
  },
  undefined,
  [asyncFile, asyncEvents]
)


export const asyncScores = asyncable<
AsyncResponse<{ score: string; winningSide: string; 2: number; 3: number }[]>,
[Asyncable<AsyncResponse<roundInfo>>, Asyncable<AsyncResponse<Map<number, Map<string, unknown>[]>>>]
>(
  async (asyncRounds: AsyncValue<AsyncResponse<roundInfo>>, asyncTicks: AsyncValue<AsyncResponse<Map<number, Map<string, unknown>[]>>>) => {
    const rounds = await asyncRounds;
    const tickMap = await asyncTicks;

    if (rounds.isError) return rounds;
    if (tickMap.isError) return tickMap;
 
    const scores = getRoundScores(rounds.data.roundEndEvents, tickMap.data)

    console.log("SCORES Resolved")
    console.log(scores)

    return {
      isError: false,
      data: scores
    }
  },
  undefined,
  [asyncRounds, asyncTickMap]
)


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

export const roundTicks = asyncable(
  async (
    asyncFile: AsyncValue<Uint8Array>,
    asyncRounds: AsyncValue<AsyncResponse<roundInfo>>,
    currentRound: number
  ) => {
    console.log('starting round Ticks')
    const file = await asyncFile;
    const rounds = await asyncRounds
    if (!file || rounds.isError) return
    const ticks = new Int32Array(
      arrayRange(
        rounds.data.roundStartEvents[currentRound - 1].get('tick') as number,
        rounds.data.roundEndEvents[currentRound - 1].get('tick') as number
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
  },
  undefined,
  [asyncFile, asyncRounds, currentRound], 
)

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

export const playerState = derived([currentRound, rounds, tickMap], (
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
