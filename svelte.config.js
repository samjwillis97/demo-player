import { vitePreprocess } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static';

const dev = 'production' === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess({})],
  kit: {
      adapter: adapter({
        pages: 'build',
        assets: 'build'
      }),
      paths: {
        // change below to your repo name
        base: dev ? '' : '/demo-player'
      }
      // hydrate the <div id="svelte"> element in src/app.html
      // target: '#svelte'
  }
};

export default config;
