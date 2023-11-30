<script lang="ts">
	import { currentRound } from "$lib/stores/file";

  let round: number = 0

  $: {
    console.log($currentRound)
    round = $currentRound
  }
</script>

