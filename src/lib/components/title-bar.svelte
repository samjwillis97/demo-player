<script lang="ts">
	import { asyncFile, asyncScores, currentRound, headersAsync } from "$lib/stores/file";

  let title: string = "Sam's Demo Player";

  const getMapName = (originalName: string) => {
    switch (originalName) {
      case 'de_mirage':
        return "Mirage";
      case 'de_vertigo':
        return "Vertigo";
    }
    return "Unknown Map: " + originalName
  }


</script>

<div class="grow-0 py-4 px-3">
	<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
		{#await $asyncFile}
			{title}
		{:then}
			{#await $headersAsync}
				Loading...
			{:then headersAsync}
				{#if !headersAsync.isError}
					{getMapName(headersAsync.data.get('map_name') ?? '')}
				{:else}
					{title}
				{/if}
			{/await}
		{/await}
	</h1>
	<div class="flex flex-row justify-between w-48">
		{#if $currentRound > 0}
			<h4 class="scroll-m-20 text-xl font-semibold tracking-tight">
				Round {$currentRound}
			</h4>
			{#await $asyncScores then asyncScores}
				{#if !asyncScores.isError}
					<h4 class="scroll-m-20 text-xl font-semibold tracking-tight">
						{asyncScores.data[$currentRound - 2]?.score ?? '0:0'}
					</h4>
				{/if}
			{/await}

			<!--{#if $scores}
			<h4 class="scroll-m-20 text-xl font-semibold tracking-tight">
				{gameScores[$currentRound - 2]?.score ?? '0:0'}
			</h4>
    {/if} -->
		{/if}
	</div>
</div>
