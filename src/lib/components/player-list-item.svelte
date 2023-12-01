<script lang="ts">
  import * as Avatar from "$lib/components/ui/avatar";
	import type { playerState, teamNames } from "$lib/utils/types";

  export let player: playerState
  export let currentTeams: teamNames

</script>

{#if player && currentTeams}
	<div class="flex flex-row items-center gap-2">
		<Avatar.Root>
			<Avatar.Fallback>{currentTeams[player.team].short}</Avatar.Fallback>
		</Avatar.Root>
		<p>{player.name}</p>
	</div>
{/if}
