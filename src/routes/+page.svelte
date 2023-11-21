<script>
	import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
</script>

<div class="flex flex-col h-full center items-center">
	<h1 class="grow-0 py-4 px-3 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
		Demo Player
	</h1>

	<div class="grow flex w-full max-w-sm justify-center items-center">
		<div class="flex flex-col gap-1.5">
			<Label for="demo">Demo</Label>
			<Input id="demo" type="file" />
		</div>
	</div>

	<div class="h-20" />
</div>
