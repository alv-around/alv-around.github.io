<script lang="ts">
    import Break from "$lib/break.svelte";
    
    // @ts-ignore
    let { data } = $props() as any;
</script>

<svelte:head>
    <title>{data.title} | Alv-Around</title>
    {#if data.description}
        <meta name="description" content={data.description} />
    {/if}
</svelte:head>

<article class="pt-8 max-w-full">
    <header>
        <h3 class="text-4xl font-bold">{data.title}</h3>
        <p class="text-gray-500">{data.date}</p>
        {#if data.description}
            <h4 class="italic text-gray-700">{data.description}</h4>
        {/if}
    </header>

    <Break />

    <div class="markdown-content text-xl">
        {@html data.content}
    </div>
</article>

<style>

.markdown-content :global(pre) {
  background-color: rgba(0, 0, 0, 0.04); /* Subtle gray background like standard markdown */
  color: #1f2937; /* Dark text */
  position: relative;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 0.8rem;
  line-height: var(--notepad-line-height);
  overflow-x: auto;
  margin: var(--notepad-line-height);
  border: 0px solid rgba(0, 0, 0, 0.08);
}

/* Language Label */
.markdown-content :global(pre[data-lang]::before) {
  content: attr(data-lang);
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.2rem 0.5rem;
  background-color: rgba(0, 0, 0, 0.06);
  color: #6b7280;
  font-size: 0.7rem;
  text-transform: lowercase;
  border-bottom-left-radius: 0.375rem;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

.markdown-content :global(code) {
  font-family: inherit;
}
</style>




