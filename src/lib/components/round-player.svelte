<script lang="ts">
  import { gameStateAtTick, getRoundTimeInSeconds } from "$lib/helpers";
	import type { gameEvent, rounds } from "$lib/utils/types";
	import { Play, Pause } from "lucide-svelte";
	import Button from "./ui/button/button.svelte";
	import { createEventDispatcher } from "svelte";
	import Slider from "./ui/slider/slider.svelte";

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

  let previousSliderValue: number = 0
  let sliderValue: number[]

  // FIXME: Problem here is any changes of dependants will trigger this to re run..
  $: {
    if (round !== currentRound && round > 0 && roundTicks) {
      currentRound = round
      const roundIndex = round - 1

      startTick = roundInfo.roundStartEvents[roundIndex].get('tick') as number
      endTick = roundInfo.roundEndEvents[roundIndex].get('tick') as number

      totalTicks = endTick - startTick
      totalRoundTime = getRoundTimeInSeconds(round, roundInfo)
      setTickRate()
    }
  }

  $: {
     if (sliderValue && sliderValue.length > 0) {
       const currentSlider = sliderValue[0]
       if (currentSlider !== previousSliderValue) {
         previousSliderValue = currentSlider
         updateState(currentSlider)
       }
     }
  }

  const nextTick = () => {
    if (!sliderValue || sliderValue.length < 1) return

    const tick = sliderValue[0] + 1
    if (tick >= endTick) return
    sliderValue = [tick]
    try {
      updateState(tick)
    } catch {
      nextTick()
    }
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
</script>

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
		<div class="grow h-full pr-2">
			<Slider
				class="h-full w-full"
				bind:value={sliderValue}
				bind:min={startTick}
				bind:max={endTick}
			/>
		</div>
	</div>
{/if}
<!-- {/if} -->
