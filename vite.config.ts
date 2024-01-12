import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import goWasm from 'vite-plugin-golang-wasm';

export default defineConfig({
	plugins: [
    sveltekit(),
    goWasm(),
  ]
});
