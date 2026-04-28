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
        <h3 class="text-4xl font-bold mb-2">{data.title}</h3>
        <p class="text-gray-500">{data.date}</p>
        {#if data.description}
            <h4 class="italic text-gray-700">{data.description}</h4>
        {/if}
    </header>

    <Break />

    <div class="markdown-content">
        {@html data.content}
    </div>
</article>

<style>
</style>
