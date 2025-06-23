<script lang="ts">
  let { children } = $props();
  import "../app.css";
  import "@fontsource-variable/caveat";
  import NavLink from "$lib/navLink.svelte";
</script>

<div class="container mx-auto px-4 text-gray font-caveat">
  <nav class="p-4 flex gap-16">
    <h1><NavLink href="/">Home</NavLink></h1>
    <h1><NavLink href="/blog">Blog</NavLink></h1>
    <h1><NavLink href="/contact">Contact</NavLink></h1>
  </nav>

  <div class="container notepad-background">
    {@render children()}
  </div>
</div>
