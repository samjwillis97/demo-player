<script lang="ts">
	import type { roundScore} from "$lib/utils/types";
	import { createEventDispatcher } from "svelte";

  export let round = 0
  export let scores: roundScore[] = []

  const dispatch = createEventDispatcher<{click: {round: number}}>();

  const newRound = (newRound : number) => {
    round = newRound
    dispatch('click', {
      round: newRound
    })
  }

</script>

<div class="flex flex-row flex-none overflow-x-auto">
	{#each scores as score, index}
		<button
			class="w-12 px-3 py-2 text-center font-semibold even:bg-stone-900"
			class:text-sky-500={score.winningSide === 'CT'}
			class:text-amber-500={score.winningSide === 'T'}
			on:click={() => newRound(index + 1)}
		>
			{index + 1}
		</button>
		{#if index === 11}
			<div class="border px-3 py-2">HT</div>
		{/if}
		{#if index > 23 && (((index + 1) - 24) % 3) === 0}
			{#if (((index + 1) - 24) % 6) === 0}
				<div class="border px-3 py-2">HT</div>
			{:else}
				<div class="border px-3 py-2">OT</div>
			{/if}
		{/if}
	{/each}
</div>
