import adapter from '@sveltejs/adapter-static'; // Or whatever adapter you are using

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// This tells SvelteKit where your app will be served from.
		// For GitHub Pages, it's typically the repository name.
		paths: {
			base: process.env.BASE_PATH || '', // Dynamically sets base path from env variable
		},
		adapter: adapter({
      // default options are sufficient for most static deployments
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: false,
      strict: true
    }),
	}
};

export default config;
