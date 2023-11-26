<script lang="ts">
  import * as Avatar from "$lib/components/ui/avatar";
  import { currentTeams } from "$lib/stores/file"

  export let player: { name: string; team: 2 | 3; }

</script>

{#if player && $currentTeams}
	<div class="flex flex-row items-center gap-2">
		<Avatar.Root>
			<Avatar.Fallback>{$currentTeams[player.team].short}</Avatar.Fallback>
		</Avatar.Root>
		<p>{player.name}</p>
	</div>
{/if}
