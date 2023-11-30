<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import RoundNavigator from "./round-navigator.svelte";
	import RoundPlayer from "./round-player.svelte";
	import type { roundScore } from "$lib/utils/types";

  export let round = 0
  export let scores: roundScore[] = []

  const dispatch = createEventDispatcher();

  const handleNavigatorClick = (event: CustomEvent<{ round: number }> ) => {
    dispatch('click', {
      round: event.detail.round,
      target: 'round-navigator',
    })
  }


</script>

<div class="flex flex-col w-full">
	<RoundNavigator {scores} {round} on:click={handleNavigatorClick} />
	<RoundPlayer />
</div>
