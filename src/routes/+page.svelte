<script lang="ts">
  import initSync from "../demoparser/pkg/demoparser2.js";
  import { Label } from "$lib/components/ui/label";
  import { onMount } from "svelte";
	import { twMerge } from "tailwind-merge";
  import { getRoundScores, getEventTicks, getEvents, getHeaders, getRounds, getAllRoundTicks } from "$lib/utils/file"
	import Button from "$lib/components/ui/button/button.svelte";
  import { Menu } from 'lucide-svelte'
	import PlayerList from "$lib/components/player-list.svelte";
	import FooterBar from "$lib/components/footer-bar.svelte";
  import TitleBar from "$lib/components/title-bar.svelte"
	import type { gameEvent, playerState, roundScore, rounds, teamNames } from "$lib/utils/types";
	import { getCurrentTeams, getPlayerInfoRoundStart } from "$lib/helpers.js";

  let files: FileList;
  let isLoading: boolean = false;

  let playersButtonVariant: "default" | "outline" = "default";
  let showNavigationButtonVariant: "default" | "outline" = "default";
  let showPlayers: boolean = true;
  let showNavigation: boolean = true;

  onMount(() => {
    initSync();
  });

  let currentRound: number = 0;
  let fileArray: Uint8Array;
  let headers: Map<string, string>;
  let roundInfo: rounds;
  let scores: roundScore[];
  let eventTicks: Map<number, gameEvent[]>

  let playerStates: playerState[];
  let sideInfo: teamNames;

  $: playersButtonVariant = showPlayers ? "default" : "outline";
  $: showNavigationButtonVariant= showNavigation ? "default" : "outline";


  $: if (files && files.length > 0) {
    handleFile(files[0]).then();
  }

  const handleFile = async (file: File) => {
    if (!files || files.length === 0) return;
    isLoading = true;
    try {
      fileArray = new Uint8Array(await file.arrayBuffer());

      headers = getHeaders(fileArray);
      currentRound = 1;

      const events = getEvents(fileArray)
      eventTicks = getEventTicks(fileArray, events)

      roundInfo = getRounds(events);
      scores = getRoundScores(roundInfo, eventTicks)

      handleRoundChange().then();
    } finally {
      isLoading = false;
    }
  }

  const handleFooterClick = async (event: CustomEvent<{target: 'round-navigator'; round: number }> ) => {
    switch (event.detail.target) {
      case 'round-navigator':
        currentRound = event.detail.round;
        await handleRoundChange()
    }
  }

  const handleRoundChange = async () => {
    playerStates = getPlayerInfoRoundStart(currentRound, roundInfo, eventTicks)
    sideInfo = getCurrentTeams(currentRound, roundInfo.roundEndEvents.length)
    setTimeout(() => {proccessRoundEvents()})
  }

  const proccessRoundEvents = async () => {
    isLoading = true;
    getAllRoundTicks(fileArray, roundInfo, currentRound)
    isLoading = false;
  }

</script>

<div class="flex flex-col h-full justify-center items-center">
	<TitleBar map={headers?.get('map_name')} round={currentRound} {isLoading} score="1:1" />

	<div class="grow flex w-full max-w-sm justify-center items-center">
		{#if !isLoading && !fileArray}
			<div class="flex flex-col gap-1.5">
				<Label for="demo">Demo</Label>
				<input
					disabled={isLoading}
					id="demo"
					type="file"
					class={twMerge(
        "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        )}
					bind:files
				/>
			</div>
			<Button on:click={() => { currentRound++ }}>Up</Button>
		{/if}
		<div />
		<div class="flex flex-col justify-">
			{#if !isLoading && fileArray}
				{#if showPlayers}
					<!-- I think I want this in the top left of this panel -->
					<PlayerList currentTeams={sideInfo} {playerStates} />
				{/if}
			{/if}
		</div>
	</div>

	{#if !isLoading && fileArray && showNavigation}
		<FooterBar {scores} round={currentRound} on:click={handleFooterClick} />
	{/if}
</div>

{#if fileArray}
	<div class="fixed top-4 left-4">
		<div class="flex flex-col gap-1.5">
			<Button variant={playersButtonVariant} on:click={() => showPlayers = !showPlayers}>
				<Menu class="h-4 w-4" /> &nbsp; Players
			</Button>
			<Button
				variant={showNavigationButtonVariant}
				on:click={() => showNavigation = !showNavigation}
			>
				<Menu class="h-4 w-4" /> &nbsp; Nav Bar
			</Button>
		</div>
	</div>
{/if}
