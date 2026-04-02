<script lang="ts">
  let { children } = $props();
  import "../app.css";
  import NavLink from "$lib/navLink.svelte";
</script>

<div class="grid grid-cols-[20%_60%_20%]">
  <div class="min-h-screen vertical-red-line"></div>
  <div>

    <div class="flex flex-row items-end justify-between h-32 border-b">
      <h1 class="m-0 leading-none">Alvaro Alonso</h1>

      <nav class="flex flex-row items-end gap-8">
        <h3><NavLink href="/">Home</NavLink></h3>
        <h3><NavLink href="/blog">Blog</NavLink></h3>
        <h3><NavLink href="/contact">Contact</NavLink></h3>
      </nav>
    </div>

    <div class="notepad-background min-h-screen">
      {@render children()}
    </div>

  </div>
  <div class="min-h-screen"></div>
</div>
