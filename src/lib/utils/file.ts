import { z } from "zod";
import { parseEvents, parseHeader, parseTicks } from "../../demoparser/pkg/demoparser2";
import { eventsToTrack, tickEventsToTrack, type gameEvent, type rounds } from "./types";
import { arrayRange, getCTSideNumber, getRoundEndTicks, getTSideNumber } from "$lib/helpers";

export const getHeaders = (file: Uint8Array) => {
    const headers = parseHeader(file);
    const schema = z.map(z.string(), z.string())
    const response = schema.safeParse(headers)
    if (!response.success) {
      throw new Error("Invalid Header Response")
    }

    return response.data
}

export const getEvents = (file: Uint8Array) => {
  const allEvents = parseEvents(
    file,
    eventsToTrack, 
    ['game_time', 'team_num']
  )

  const parsed = z.array(z.map(z.string(), z.unknown())).safeParse(allEvents)

  if (!parsed.success) {
    throw new Error("Invalid event response")
  }

  return parsed.data
}

export const getRounds = (events: gameEvent[]) => {
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

  return rounds
}

export const getEventTicks = (file: Uint8Array, events: gameEvent[]) => {
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

  const parsed = z.array(z.map(z.string(), z.unknown())).safeParse(tickEvents)
  if (!parsed.success) throw new Error('Unable to parse event ticks')

  const tickMap = new Map<number, Map<string, unknown>[]>();
  for (const event of parsed.data) {
    const tick = event.get('tick')
    if (typeof tick !== 'number') continue
    const events = tickMap.get(tick)
    if (!events) {
      tickMap.set(tick, [event])
    } else {
      events.push(event)
    }
  }

  return tickMap
}

export const getRoundScores = (rounds: rounds, gameEventTicks: Map<number, gameEvent[]>) => {
  const totalRounds = rounds.roundEndEvents.length
  const roundEndTicks = getRoundEndTicks(rounds.roundEndEvents)

  const roundScores = []

  let round = 1
  let previousFinalTTeamScore = 0
  for (const endTick of roundEndTicks) {
    const tickEvent = gameEventTicks.get(endTick)
    if (!tickEvent) continue

    const finalTTeamScore = tickEvent.find((player) => {
      const team = player.get('team_num')
      if (typeof team !== 'number') return false
      if (team === getTSideNumber(round, totalRounds)) return true
    })?.get('team_rounds_total') as number

    const finalCTTeamScore = tickEvent.find((player) => {
      const team = player.get('team_num')
      if (typeof team !== 'number') return false
      if (team === getCTSideNumber(round, totalRounds)) return true
    })?.get('team_rounds_total') as number

    roundScores.push({
      score: `${finalTTeamScore}:${finalCTTeamScore}`,
      winningSide: finalTTeamScore > previousFinalTTeamScore ? 'T' : 'CT',
      2: finalTTeamScore,
      3: finalCTTeamScore
    })

    previousFinalTTeamScore = finalTTeamScore
    round++
  }

  const schema = z.array(
    z.object({
      score: z.string(),
      winningSide: z.literal('T').or(z.literal('CT')),
      2: z.number(),
      3: z.number(),
    })
  ).safeParse(roundScores)

  if (!schema.success) throw new Error("Invalid round scores")

  return schema.data
}

export const getAllRoundTicks = (
  file: Uint8Array,
  rounds: rounds,
  round: number
) => {
    const ticks = new Int32Array(
      arrayRange(
        rounds.roundStartEvents[round - 1].get('tick') as number,
        rounds.roundEndEvents[round - 1].get('tick') as number
      )
    )

    const tickEvents = parseTicks(
      file,
      tickEventsToTrack,
      ticks
    );

    const parsed = z.array(z.map(z.string(), z.unknown())).safeParse(tickEvents)
    if (!parsed.success) throw new Error('Unable to parse event ticks')

    const tickMap = new Map<number, Map<string, unknown>[]>();
    for (const event of parsed.data) {
      const tick = event.get('tick')
      if (typeof tick !== 'number') return undefined
      const events = tickMap.get(tick)
      if (!events) {
        tickMap.set(tick, [event])
      } else {
        events.push(event)
      }
    }

    return tickMap
}
