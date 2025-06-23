<script lang="ts">
  let { children } = $props();
  import "../app.css";
  import NavLink from "$lib/navLink.svelte";
</script>

<div class="container min-h-screen mx-auto px-4 vertical-red-line">
  <nav class="flex gap-16">
    <h1><NavLink href="/">Home</NavLink></h1>
    <h1><NavLink href="/blog">Blog</NavLink></h1>
    <h1><NavLink href="/contact">Contact</NavLink></h1>
  </nav>

  <div class="notepad-background min-h-screen">
    {@render children()}
  </div>
</div>
