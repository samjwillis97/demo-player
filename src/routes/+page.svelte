<script lang="ts">
  import initSync, { parseHeader } from "../demoparser/pkg/demoparser2.js";
  import { Label } from "$lib/components/ui/label";
  import { onMount } from "svelte";
	import { twMerge } from "tailwind-merge";

  let files: FileList;
  let title: string = "Sam's Demo Player";
  // let isLoading: boolean = false;

  onMount(() => {
    initSync();
  });

  const isValidHeadersResponse = (headers: unknown): headers is Map<string, string> => {
    return headers instanceof Map;
  }

  $: if (files && files.length > 0) {
    fileHandler(files[0]).then((v) => {
      const headers = parseHeader(v);
      if (!isValidHeadersResponse(headers)) {
        throw new Error("Unable to Parse file")
      }

      const demoMapName = headers.get("map_name")
      if (demoMapName) {
        title = getMapName(demoMapName)
      }
    })
    .catch((err: Error) => {
      console.log(err)
    })
    .finally(() => {
    })
  }

  const getMapName = (originalName: string): string => {
    switch (originalName) {
      case 'de_vertigo':
        return "Vertigo";
    }
  }

  const fileHandler = async (file: File) => {
    const chunks: Uint8Array[] = [];
    const reader = file.stream().getReader();

    const readChunk = async () => {
      const { done, value } = await reader.read();
      return { done, value };
    }
    
    let result = await readChunk();
    while (!result.done && result.value) {
      chunks.push(result.value);
      result = await readChunk();
      console.log('here')
    }

    const combinedUint8Array = new Uint8Array(
      chunks.reduce((acc, chunk) => acc.concat(Array.from(chunk)), [] as number[])
    );

    return combinedUint8Array
  }



</script>

<div class="flex flex-col h-full center items-center">
	<h1 class="grow-0 py-4 px-3 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
		{title}
	</h1>

	<div class="grow flex w-full max-w-sm justify-center items-center">
		<div class="flex flex-col gap-1.5">
			<Label for="demo">Demo</Label>
			<input
				id="demo"
				type="file"
				class={twMerge(
        "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        )}
				bind:files
			/>
		</div>
	</div>

	<div class="h-20" />
</div>
