<script lang="ts">
	let { children } = $props();
</script>

<nav>
	<a href="/">Home</a>
	<a href="/blog">Blog</a>
  <a href="/contact">Contact</a>
</nav>

{@render children()}
