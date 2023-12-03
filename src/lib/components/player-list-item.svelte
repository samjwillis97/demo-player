<script lang="ts">
  import * as Avatar from "$lib/components/ui/avatar";
	import type { playerState, teamNames } from "$lib/utils/types";

  export let player: playerState
  export let currentTeams: teamNames

  let width = 0

  $: {
    width = player.health
  }

</script>

{#if player && currentTeams}
	<div class="flex flex-col">
		<div class="flex flex-row items-center gap-2">
			<Avatar.Root>
				<Avatar.Fallback>{currentTeams[player.team].short}</Avatar.Fallback>
			</Avatar.Root>
			<p>{player.name}</p>
		</div>
		{#if width > 0}
			<div class={`bg-sky-500/30 h-2 w-[${width}%]`} />
		{/if}
	</div>
{/if}
