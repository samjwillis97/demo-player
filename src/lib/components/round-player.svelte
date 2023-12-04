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

  let currentRound = 0
  let startTick = 0
  let endTick = 0
  let totalTicks = 0
  let totalRoundTime = 0
  let ticksPerSecond = 0
  let playbackSpeed = 1
  let isPlaying = false
  let currentState: gameEvent[]
  let playSetInterval: number


  let currentTick = 0
  let progressPercentage: number = 0

  let totalWidth: number

  let isMouseDragging = false

  // FIXME: Problem here is any changes of dependants will trigger this to re run..
  $: {
    if (round !== currentRound && round > 0 && roundTicks) {
      currentRound = round
      const roundIndex = round - 1
      
      endTick = roundInfo.roundEndEvents[roundIndex].get('tick') as number
      startTick = roundInfo.roundStartEvents[roundIndex].get('tick') as number

      currentTick = startTick

      totalTicks = endTick - startTick
      totalRoundTime = getRoundTimeInSeconds(round, roundInfo)

      setTickRate()
      updateProgess()
    }
  }

  const setTickByPercentage = (percentage: number) => {
    currentTick = Math.round(totalTicks * (percentage / 100)) + startTick
  }

  const getProgressPercentage = () => {
    return ((currentTick - startTick) / totalTicks) * 100
  }

  const updateProgess = () => {
    progressPercentage = getProgressPercentage()
  }

  const getCurrentTick = () => {
    try {
      updateState(currentTick)
    } catch {
      nextTick()
    }
  }

  const nextTick = () => {
    currentTick++
    if (currentTick >= endTick) return
    updateProgess()
    getCurrentTick()
  }

  const updateState = (tick: number) => {
    try {
      currentState = gameStateAtTick(tick, roundTicks)
      dispatch('newTick', { state: currentState })
    } catch (e) {
      console.log(e)
    }
  }

  const updatePlaybackSpeed = () => {
    const validSpeeds = [0.5, 1, 2, 4]
    let nextSpeedIndex = validSpeeds.indexOf(playbackSpeed) + 1

    if (nextSpeedIndex >= validSpeeds.length) nextSpeedIndex = 0

    playbackSpeed = validSpeeds[nextSpeedIndex]
    setTickRate()

    if (isPlaying) {
      togglePlay()
      togglePlay()
    }
  }

  const setTickRate = () => {
    ticksPerSecond = (totalTicks/totalRoundTime) * playbackSpeed
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

  const handlePlayedClick = (e: MouseEvent) => {
    const selectedPercentage = (e.offsetX / totalWidth) * 100
    setTickByPercentage(selectedPercentage)
    updateProgess()
    getCurrentTick()
  }

  const handleUnplayedClick = (e: MouseEvent) => {
    const playedPercentage = getProgressPercentage()
    const unplayedPercentage = (e.offsetX / totalWidth) * 100
    setTickByPercentage(playedPercentage + unplayedPercentage)
    updateProgess()
    getCurrentTick()
  }

  const handleMouseUp = () => {
    isMouseDragging = false
  }

  const handleMouseDown = () => {
    isMouseDragging = true
  }

  const handlePlayedMouseMove = (e: MouseEvent) => {
    if (!isMouseDragging) return
    handlePlayedClick(e)
  }

  const handleUnplayedMouseMove = (e: MouseEvent) => {
    if (!isMouseDragging) return
    handleUnplayedClick(e)
  }
</script>

<!-- eslint-disable svelte/valid-compile -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->

<!-- {#if $rounds} -->
{#if round && totalTicks > 0}
	<div class="flex flex-row w-full h-10 justify-between gap-10">
		<div class="grow-0 w-96 flex flex-row justify-center items-center gap-5">
			<Button on:click={updatePlaybackSpeed}>{playbackSpeed}x Speed</Button>
			<Button on:click={togglePlay}>
				{#if isPlaying}
					<Pause /> &nbsp; Pause
				{:else}
					<Play /> &nbsp; Play
				{/if}
			</Button>
		</div>
		<div class="grow h-full flex flex-row" bind:clientWidth={totalWidth}>
			<span
				class="bg-stone-500"
				style={`width: ${progressPercentage}%;`}
				on:click={handlePlayedClick}
				on:mouseup={handleMouseUp}
				on:mousedown={handleMouseDown}
				on:mousemove={handlePlayedMouseMove}
			/>
			<span
				class="bg-stone-800 grow"
				on:click={handleUnplayedClick}
				on:mouseup={handleMouseUp}
				on:mousedown={handleMouseDown}
				on:mousemove={handleUnplayedMouseMove}
			/>
		</div>
	</div>
{/if}
<!-- {/if} -->
