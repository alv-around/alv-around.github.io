<script lang="ts">
  let { children } = $props();
  import "../app.css";
  import NavLink from "$lib/navLink.svelte";
</script>

<div class="grid grid-cols-[10%_90%]">
  <div class="min-h-screen vertical-red-line"></div>
  <div class="flex flex-col">
    <nav class="flex flex-row place-items-center gap-16">
      <h1><NavLink href="/">Home</NavLink></h1>
      <h1><NavLink href="/blog">Blog</NavLink></h1>
      <h1><NavLink href="/contact">Contact</NavLink></h1>
    </nav>

    <div class="notepad-background min-h-screen min-w-screen">
      {@render children()}
    </div>
  </div>
</div>
