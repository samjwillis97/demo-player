<script lang="ts">
  import { gameStateAtTick } from "$lib/helpers";
	import type { gameEvent, rounds } from "$lib/utils/types";

  export let round = 0
  export let roundTicks: Map<number, gameEvent[]>
  export let roundInfo: rounds

  let navigatorTick = 0
  let startTick = 0
  let endTick = 0
  let totalTicks = 0

  $: {
    if (round > 0 && roundTicks) {
      const roundIndex = round - 1
      startTick = roundInfo.roundStartEvents[roundIndex].get('tick') as number
      endTick = roundInfo.roundEndEvents[roundIndex].get('tick') as number
      totalTicks = endTick - startTick
      navigatorTick = startTick

      gameStateAtTick(navigatorTick, roundTicks)
    }
  }
</script>

<!-- {#if $rounds} -->
<div class="flex flex-row w-full h-10 items-center gap-5">
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
<!-- {/if} -->
