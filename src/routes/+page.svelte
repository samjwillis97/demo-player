<script lang="ts">
  import initSync from "../demoparser/pkg/demoparser2.js";
  import { Label } from "$lib/components/ui/label";
  import { onMount } from "svelte";
	import { twMerge } from "tailwind-merge";
  import { fileStore, headers } from "$lib/stores/file"
	import Button from "$lib/components/ui/button/button.svelte";
  import { Menu } from 'lucide-svelte'
	import * as Card from "$lib/components/ui/card";
  import * as Avatar from "$lib/components/ui/avatar";

  let files: FileList;
  let title: string = "Sam's Demo Player";
  let isLoading: boolean = false;

  let playersButtonVariant: "default" | "outline" = "default";
  let showPlayers: boolean = true;
  let loadingPlayers: boolean = false;

  const getMapName = (originalName: string) => {
    switch (originalName) {
      case 'de_mirage':
        return "Mirage";
      case 'de_vertigo':
        return "Vertigo";
    }
  }

  onMount(() => {
    initSync();
  });

  $: if (files && files.length > 0) {
    handleFile(files[0]).then()
  }

  $: playersButtonVariant = showPlayers ? "default" : "outline"

  headers.subscribe((v) => {
    if (!v) return

    const demoMapName = v.get("map_name")
    if (demoMapName) {
      title = getMapName(demoMapName) ?? "Unknown Map 🤔"
    }
  })

  const handleFile = async (file: File) => {
    if (!files || files.length === 0) return
    isLoading = true
    try {
      console.log("Handling Upload")
      const fileArray = new Uint8Array(await file.arrayBuffer())
      fileStore.set(fileArray)
    } finally {
      console.log("Upload Handled")
      isLoading = false
    }
  }
</script>

<div class="flex flex-col h-full center items-center">
	<h1 class="grow-0 py-4 px-3 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
		{title}
	</h1>

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
		{/if}
		{#if isLoading}
			<p>Loading....</p>
		{/if}
		{#if !isLoading && $fileStore}
			{#if showPlayers}
				<div>
					<Card.Root>
						<Card.Header>
							<Card.Title>Players</Card.Title>
						</Card.Header>
						<Card.Content>
							<div class="flex flex-row items-center gap-2">
								<Avatar.Root>
									<Avatar.Fallback>CT</Avatar.Fallback>
								</Avatar.Root>
								<p>Player Name</p>
							</div>
						</Card.Content>
					</Card.Root>
				</div>
			{/if}
		{/if}
	</div>

	<div class="h-20" />
</div>

{#if $fileStore}
	<div class="fixed top-4 left-4">
		<div class="flex flex-col gap-1.5">
			<Button variant={playersButtonVariant} on:click={() => showPlayers = !showPlayers}>
				<Menu class="h-4 w-4" /> &nbsp; Players
			</Button>
		</div>
	</div>
{/if}
