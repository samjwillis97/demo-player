<script lang="ts">
  import { Label } from "$lib/components/ui/label";
  import { twMerge } from "tailwind-merge";
  import parser from "../demoparser/main.go";

  let isLoading: boolean = false
  let files: FileList

  $: if (files && files.length > 0) {
    handleFile(files[0]).then();
  }

  const handleFile = async (file: File) => {
    if (!files || files.length === 0) return;
    isLoading = true;


    const fileBuffer = await file.arrayBuffer();
    console.log(await parser.passFileToGo(fileBuffer));
    console.log(await parser.parseFile(new Uint8Array(fileBuffer)))

    isLoading = false;
  }

</script>

<div class="flex flex-col h-full justify-center items-center">
	<div class="flex flex-col max-w-sm gap-1.5">
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
</div>
