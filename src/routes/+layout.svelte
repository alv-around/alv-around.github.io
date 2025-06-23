<script lang="ts">
  let { children } = $props();
  import "../app.css";
</script>

<nav>
  <a href="/">Home</a>
  <a href="/blog">Blog</a>
  <a href="/contact">Contact</a>
</nav>

{@render children()}
