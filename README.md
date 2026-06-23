# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
cp .env.template .env.local
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Blog comments

Blog posts render Giscus comments when `PUBLIC_GISCUS_CATEGORY_ID` is set at build time.
Local values are loaded automatically from `.env.local`.

To finish enabling comments:

1. Enable GitHub Discussions for `alv-around/alv-around.github.io`.
2. Install the Giscus GitHub App for that repository.
3. Use the `General` discussion category in Giscus and copy its category ID.
4. Add that value to `.env.local` for local development.
5. Add that value as a GitHub Actions repository secret named `PUBLIC_GISCUS_CATEGORY_ID`.
