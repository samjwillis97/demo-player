<script lang="ts">
  import initSync from "../demoparser/pkg/demoparser2.js";
  import { Label } from "$lib/components/ui/label";
  import { onMount } from "svelte";
	import { twMerge } from "tailwind-merge";
  import { asyncFile, currentRound, fileStore, roundTicks } from "$lib/stores/file"
	import Button from "$lib/components/ui/button/button.svelte";
  import { Menu } from 'lucide-svelte'
	import PlayerList from "$lib/components/player-list.svelte";
	import FooterBar from "$lib/components/footer-bar.svelte";
  import TitleBar from "$lib/components/title-bar.svelte"

  let files: FileList;
  let isLoading: boolean = false;

  let playersButtonVariant: "default" | "outline" = "default";
  let showNavigationButtonVariant: "default" | "outline" = "default";
  let showPlayers: boolean = true;
  let showNavigation: boolean = true;

  onMount(() => {
    console.log("ON MOUNT FUCKI")
    initSync();
  });

  $: if (files && files.length > 0) {
    handleFile(files[0]).then()
  }

  $: playersButtonVariant = showPlayers ? "default" : "outline"
  $: showNavigationButtonVariant= showNavigation ? "default" : "outline"

  roundTicks.subscribe((v) => {
        console.log('round tick sub')
      })

  const handleFile = async (file: File) => {
    if (!files || files.length === 0) return
    isLoading = true
    try {
      const fileArray = new Uint8Array(await file.arrayBuffer())
      console.log("Boutta set fileStore")
      asyncFile.set(fileArray)
    } finally {
      isLoading = false
    }
  }
</script>

<div class="flex flex-col h-full justify-center items-center">
	<TitleBar />

	<div class="grow flex w-full max-w-sm justify-center items-center">
		{#if !isLoading && !$fileStore}
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
			<Button on:click={() => currentRound.update(v => v +1)}>Up</Button>
		{/if}
		{#if isLoading}
			<p>Loading....</p>
		{/if}
		<div class="flex flex-col justify-">
			{#if !isLoading && $fileStore}
				{#if showPlayers}
					<!-- I think I want this in the top left of this panel -->
					<!-- <PlayerList /> -->
				{/if}
			{/if}
		</div>
	</div>

	{#if !isLoading && fileStore && showNavigation}
		<!-- <FooterBar /> -->
	{/if}
</div>

{#if $fileStore}
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
