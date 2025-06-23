<script lang="ts">
  let { children } = $props();
  import "../app.css";
  import NavLink from "$lib/navLink.svelte";
</script>

<div class="container min-h-screen mx-auto px-4 notepad-background">
  <nav class="p-4 flex gap-16">
    <h1><NavLink href="/">Home</NavLink></h1>
    <h1><NavLink href="/blog">Blog</NavLink></h1>
    <h1><NavLink href="/contact">Contact</NavLink></h1>
  </nav>

  {@render children()}
</div>
