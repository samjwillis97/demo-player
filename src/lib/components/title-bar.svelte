<script lang="ts">
	import { currentRound, headers } from "$lib/stores/file";

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
		{#if !$headers}
			{title}
		{:else}
			{getMapName($headers.get('map_name') ?? '')}
		{/if}
	</h1>
	<div class="flex flex-row justify-between w-48">
		<h4 class="scroll-m-20 text-xl font-semibold tracking-tight">
			Round {$currentRound}
		</h4>
		<!--{#if $scores}
			<h4 class="scroll-m-20 text-xl font-semibold tracking-tight">
				{gameScores[$currentRound - 2]?.score ?? '0:0'}
			</h4>
    {/if} -->
	</div>
</div>
