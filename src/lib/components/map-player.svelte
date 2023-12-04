<script lang="ts">
	import { onMount } from 'svelte';
  import { Canvas, Layer, type Render } from 'svelte-canvas';
	import { spring } from 'svelte/motion';

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

  const playerRadius = spring(1, {stiffness: 0.15, damping: 0.3 })
  $: playerRadius.set(40)

  const renderPlayers : Render = ({ context, width, height }) => {
    context.fillStyle = 'tomato';
    context.beginPath()
    context.arc(100, 100, $playerRadius, 0, 2 * Math.PI)
    context.fill()
  };

  $: render = renderBackground

  $: playersRender = renderPlayers

</script>

<div class="w-full h-full">
	<Canvas class="w-full h-full">
		{#if backgroundLoaded}
			<Layer {render} />
			<Layer render={playersRender} />
		{/if}
	</Canvas>
</div>
