<script lang="ts">
  import { scores, currentRound } from "$lib/stores/file"
</script>

{#if $scores}
	<div class="flex flex-row flex-none overflow-x-auto">
		{#each $scores as score, index}
			<button
				class="w-12 px-3 py-2 text-center font-semibold even:bg-stone-900"
				class:text-sky-500={score.winningSide === 'CT'}
				class:text-amber-500={score.winningSide === 'T'}
				on:click={() => {
          console.log('setting Current Round')
          currentRound.set(index + 1)
        }}
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
{/if}
