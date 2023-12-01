<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import PlayerListItem from "$lib/components/player-list-item.svelte";
	import type { playerState, teamNames } from "$lib/utils/types";

  const tSide = 2;
  const ctSide = 3;

  export let playerStates: playerState[]
  export let currentTeams: teamNames

</script>

<Card.Root class="w-128">
	<Card.Header>
		<Card.Title>Players</Card.Title>
	</Card.Header>
	<Card.Content class="h-64 overflow-y-auto">
		{#if currentTeams && playerStates}
			<div class="flex flex-col gap-2">
				{#each playerStates.filter((v) => v.team === tSide) as player}
					<PlayerListItem {currentTeams} {player} />
				{/each}
				<div class="h-12" />
				{#each playerStates.filter((v) => v.team === ctSide) as player}
					<PlayerListItem {currentTeams} {player} />
				{/each}
			</div>
		{:else}
			<div>
				<p>Error Loading Players</p>
			</div>
		{/if}
	</Card.Content>
</Card.Root>
