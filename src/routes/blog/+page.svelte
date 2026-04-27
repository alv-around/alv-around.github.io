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
    <p>Blog posts comming soon!</p>

    <ul class="tenor-gif-wrapper">
      <div
        class="tenor-gif-embed"
        data-postid="18638261"
        data-share-method="host"
        data-aspect-ratio="1.33333"
        data-width="100%"
      >
        <a
          href="https://tenor.com/view/unfinished-project-another-project-idea-squirtle-squad-reunion-hive-hivechat-gif-18638261"
          >Unfinished Project Another Project Idea GIF</a
        >
        from
        <a href="https://tenor.com/search/unfinished+project-gifs"
          >Unfinished Project GIFs</a
        >
      </div>
      <script
        type="text/javascript"
        async
        src="https://tenor.com/embed.js"
      ></script>
    </ul>
  {/if}
</div>

