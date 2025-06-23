<script lang="ts">
  let { children } = $props();
  import "../app.css";
  // Supports weights 400-700
  import "@fontsource-variable/caveat";
</script>

<div class="container mx-auto px-4 text-gray font-caveat">
  <nav class="p-4 flex gap-16">
    <h1><a href="/" class="hover:underline">Home</a></h1>
    <h1><a href="/blog" class="hover:underline">Blog</a></h1>
    <h1><a href="/contact" class="hover:underline">Contact</a></h1>
  </nav>

  <div class="container notepad-background">
    {@render children()}
  </div>
</div>
