<script lang="ts">
  import BlogPreview from "$lib/blog-preview.svelte";
  import Break from "$lib/break.svelte";

  // TODO: remove flag 
  // @ts-ignore
  let { data } = $props() as any;
</script>

<div>
    <Break />

    {#each data.posts as post}
      <BlogPreview {...post} />
      <Break />
    {/each}

  {#if data.posts.length === 0}
    <p>No blog posts found.</p>
  {/if}
</div>

