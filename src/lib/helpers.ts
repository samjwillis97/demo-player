import { z } from 'zod';
import type { fileRounds } from "./stores/file";

// at Game End
// 1 = spectator
// 2 = terrorist
// 3 = ct
//
// if you keep grabbing players with team = 2, it switches at halves
//

export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const getRoundStartEvents = (round: number, rounds: fileRounds, tickEvents: Map<number, Map<string, unknown>[]>) => {
  if (round >= rounds.roundStartEvents.length || round <= 0) {
    return undefined
  }

  const tick = rounds.roundStartEvents[round - 1].get('tick')
  if (typeof tick !== 'number') return undefined

  const events = tickEvents.get(tick)
  if (!events) return undefined

  return events
}

export const getPlayerInfoRoundStart = (
  round: number,
  rounds: fileRounds,
  tickEvents: Map<number, Map<string, unknown>[]>
) => {
  const roundEvents = getRoundStartEvents(round, rounds, tickEvents)
  if (!roundEvents) return undefined

  const data = roundEvents.map((v) => (
    {
      steamId: v.get('player_steamid'),
      name: v.get('player_name'),
      team: v.get('team_num'),
      health: v.get('health') ?? false,
      armor: v.get('armor_value') ?? 0,
      helmet: v.get('has_helmet') ?? false,
      defuser: v.get('has_defuser') ?? false,
      mvps: v.get('mvps') ?? 0,
      kills: v.get('kills_totals') ?? 0,
      deaths: v.get('deaths_total') ?? 0,
      assists: v.get('assists_total') ?? 0,
      damage: v.get('damage_total') ?? 0,
      cash: v.get('balance'), 
    }
  ))

  const parsed = z.array(
    z.object({
      steamId: z.string(),
      name: z.string(),
      team: z.literal(2).or(z.literal(3)),
      health: z.number(),
      armor: z.number(),
      helmet: z.boolean(),
      defuser: z.boolean(),
      mvps: z.number(),
      kills: z.number(),
      deaths: z.number(),
      assists: z.number(),
      damage: z.number(),
      cash: z.number(),
    })
  ).safeParse(data)

  if (!parsed.success) {
    return undefined
  }

  return parsed.data
}

export const getRoundEndTicks = (
  roundEndEvents: Map<string, unknown>[],
) => {
  const ticks: number[] = []
  for (const event of roundEndEvents) {
    const tick = event.get('tick')
    if (typeof tick !== 'number') continue
    ticks.push(tick)
  }
  return ticks
}

export const getRoundScores = (
  roundEndEvents: Map<string, unknown>[],
  tickEvents: Map<number, Map<string, unknown>[]>,
) => {
  const totalRounds = roundEndEvents.length
  const roundEndTicks = getRoundEndTicks(roundEndEvents)

  const roundScores = []

  let round = 1
  let previousFinalTTeamScore = 0
  for (const endTick of roundEndTicks) {
    const tickEvent = tickEvents.get(endTick)
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

  return roundScores
}

export const teamNumberToString = (team: number, round: number, totalRounds: number) => {
  return getTeamSide(team, round, totalRounds) === 2 ? 'T' : 'CT'
}

export const teamNumberToLongString = (team: number, round: number, totalRounds: number) => {
  return getTeamSide(team, round, totalRounds) === 2 ? 'Terrorists' : 'Counter Terrorists'
}

export const getTSideNumber = (round: number, totalRounds: number) => {
  return isOnFinishingSide(round, totalRounds) ? 2 : 3
}

export const getCTSideNumber = (round: number, totalRounds: number) => {
  return isOnFinishingSide(round, totalRounds) ? 3 : 2
}

export const getTFinishSideNumber = () => {
  return getTSideNumber(24,24)
}

export const getCTFinishSideNumber = () => {
  return getCTSideNumber(24,24)
}

export const getTeamSide = (team: 2 | 3 | number, round: number, totalRounds: number) => {
  return isOnFinishingSide(round, totalRounds) ? team : team === 2 ? 3 : 2
}

export const isOnFinishingSide = (round: number, totalRounds: number) => {
   if (totalRounds <= 24 || round <= 24) {
    return round > 12;
  }
  return (round - 24) % 6 > 3;
}


export const gameStateAtTick = (
  tick: number,
  gameTicks: Map<number, Map<string, unknown>[]>,
  events?: Map<string, unknown>[]
) => {

  const stateAtTick = gameTicks.get(tick)
  if (!stateAtTick) {
    // console.log(`nothing @ ${tick}`)
    return
  }
  // console.log(`found @ ${tick}`)
  // console.log(stateAtTick)
}

export const arrayRange = (start: number, stop: number, step: number = 1) =>
    Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
    );
