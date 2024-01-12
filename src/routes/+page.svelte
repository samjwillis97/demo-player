<script lang="ts">
  import { onMount } from "svelte";
  import parser from "../demoparser/main.go";

  onMount(async () => {
    console.log(await parser.test());
  });
</script>

<div class="flex flex-col h-full justify-center items-center" />
