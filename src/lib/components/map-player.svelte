<script lang="ts">
	import type { playerState } from '$lib/utils/types';
	import { onMount } from 'svelte';
  import { Canvas, Layer, type Render } from 'svelte-canvas';

  export let playerStates: playerState[]

  let background: HTMLImageElement
  let backgroundLoaded = false

  onMount(() => {
    background = new Image();
    background.src = "/demo-player/src/lib/assets/de_vertigo_radar_psd.png"
    background.addEventListener("load", () => {
      backgroundLoaded = true
    })
  })

  const renderBackground: Render = ({ context, width, height }) => {
    if (!background) return
    context.drawImage(background, 0, 0, width - 1, height - 1);
  };

  const renderPlayers = (states: playerState[]): Render => {
    console.log(states)
    return ({ context, width, height }) => {
      context.fillStyle = 'tomato';
      context.beginPath()

      // FIXME: Radius may need to be based on screen size
      context.arc(100, 100, 8, 0, 2 * Math.PI)
      context.fill()
    };
  }

  $: render = renderBackground

  $: playersRender = renderPlayers(playerStates)

</script>

<div class="w-full h-full">
	<Canvas class="w-full h-full">
		{#if backgroundLoaded}
			<Layer {render} />
			<Layer render={playersRender} />
		{/if}
	</Canvas>
</div>
