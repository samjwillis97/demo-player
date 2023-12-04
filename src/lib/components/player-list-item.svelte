<script lang="ts">
  import * as Avatar from "$lib/components/ui/avatar";
	import type { playerState, teamNames } from "$lib/utils/types";

  export let player: playerState
  export let currentTeams: teamNames

</script>

{#if player && currentTeams}
	<div class="flex flex-col">
		<div class="flex flex-row items-center gap-2">
			<Avatar.Root>
				<Avatar.Fallback>{currentTeams[player.team].short}</Avatar.Fallback>
			</Avatar.Root>
			<p>{player.name}</p>
		</div>
		<div class="bg-amber-500/30 h-1" style={`width: ${player.armor ?? 0}%;`} />
		<div class="bg-sky-500/30 h-2" style={`width: ${player.health ?? 0}%;`} />
	</div>
{/if}
