import { derived, writable } from "svelte/store";
import { parseEvents, parseHeader } from "../../demoparser/pkg/demoparser2";

const isValidHeadersResponse = (headers: unknown): headers is Map<string, string> => {
  return headers instanceof Map;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidEventResponse = (events: unknown): events is Map<string, unknown>[] => {
  return Array.isArray(events) && events.every((event) => event instanceof Map)
}

const eventsToTrack = [
  "begin_new_match", "round_start", "round_end", "round_mvp", 
  "player_death", "bomb_planted", "bomb_defused", "hostage_rescued", 
  "weapon_fire", "flashbang_detonate", "hegrenade_detonate", 
  "molotov_detonate", "smokegrenade_detonate", "player_hurt", 
  "team_score_first_half", "team_score_second_half",
  "player_blind"
];

export const fileStore = writable<Uint8Array | undefined>();

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
    roundEndEvents
  }

  console.log("ROUNDS")
  console.log(rounds)

  return rounds
})


// NOTE: Could probably make the players and headers as derived
// // Ticks as well??
