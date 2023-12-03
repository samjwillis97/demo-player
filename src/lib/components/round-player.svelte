<script lang="ts">
  import { gameStateAtTick, getRoundTimeInSeconds } from "$lib/helpers";
	import type { gameEvent, rounds } from "$lib/utils/types";
	import { Play, Pause } from "lucide-svelte";
	import Button from "./ui/button/button.svelte";
	import { createEventDispatcher } from "svelte";

  export let round = 0
  export let roundTicks: Map<number, gameEvent[]>
  export let roundInfo: rounds

  const dispatch = createEventDispatcher<{
    newTick: {
      state: gameEvent[]
    }
  }>();

  let previousRound = 0
  let navigatorTick = 0
  let startTick = 0
  let endTick = 0
  let totalTicks = 0
  let totalRoundTime = 0
  let ticksPerSecond = 0
  let playbackSpeed = 1
  let isPlaying = false
  let currentState: gameEvent[]
  let playSetInterval: number

  // FIXME: Problem here is any changes of dependants will trigger this to re run..
  $: {
    if (round !== previousRound && round > 0 && roundTicks) {
      const roundIndex = round - 1
      startTick = roundInfo.roundStartEvents[roundIndex].get('tick') as number
      endTick = roundInfo.roundEndEvents[roundIndex].get('tick') as number
      totalTicks = endTick - startTick
      totalRoundTime = getRoundTimeInSeconds(round, roundInfo)
      ticksPerSecond = (totalTicks/totalRoundTime) * playbackSpeed
      navigatorTick = startTick
    }
  }

  const nextTick = () => {
    if (navigatorTick >= endTick) return
    navigatorTick++
    try {
      updateState()
    } catch {
      nextTick()
    }
  }

  const updateState = () => {
    currentState = gameStateAtTick(navigatorTick, roundTicks)
    dispatch('newTick', { state: currentState })
  }

  const updatePlaybackSpeed = () => {
    const validSpeeds = [0.5, 1, 2, 4]
    let nextSpeedIndex = validSpeeds.indexOf(playbackSpeed) + 1

    if (nextSpeedIndex >= validSpeeds.length) nextSpeedIndex = 0

    playbackSpeed = validSpeeds[nextSpeedIndex]
  }

  const togglePlay = () => {
    if (isPlaying && playSetInterval !== undefined) {
      clearInterval(playSetInterval)
    } else {
      playSetInterval = startPlay()
    }

    isPlaying = !isPlaying
    
  }

  const startPlay = () => {
    const interval = 1000 / ticksPerSecond
    return setInterval(() => {
      nextTick()
    }, interval)
  }
</script>

<!-- {#if $rounds} -->
<div class="flex flex-row w-full h-10 justify-between gap-10">
	<div class="flex flex-row justify-center items-center gap-5">
		<p>
			Start Tick: {startTick}
		</p>
		<p>
			End Tick: {endTick}
		</p>
		<p>
			Current Tick: {navigatorTick}
		</p>
	</div>
	<div class="flex flex-row justify-center items-center gap-5">
		<Button on:click={updatePlaybackSpeed}>{playbackSpeed}x Speed</Button>
		<Button on:click={togglePlay}>
			{#if isPlaying}
				<Pause /> &nbsp; Pause
			{:else}
				<Play /> &nbsp; Play
			{/if}
		</Button>
	</div>
</div>
<!-- {/if} -->
