<script lang="ts">
	import { gameStateAtTick } from "$lib/helpers";
	import { rounds, currentRound, roundTicks} from "$lib/stores/file";

  let navigatorTick = 0
  let startTick = 0
  let endTick = 0
  let totalTicks = 0

  $: {
    if ($rounds) {
      const roundIndex = $currentRound - 1
      startTick = $rounds.roundStartEvents[roundIndex].get('tick') as number
      endTick = $rounds.roundEndEvents[roundIndex].get('tick') as number
      totalTicks = endTick - startTick
      navigatorTick = startTick

      console.log(`Start: ${startTick}, End: ${endTick}, Total: ${totalTicks}`)
      while (navigatorTick <= endTick && $roundTicks) {
        gameStateAtTick(navigatorTick, $roundTicks)
        navigatorTick++
      }
    }
  }
</script>

<div class="w-full h-10">Player Goes Here</div>
