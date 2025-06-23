<script lang="ts">
  import { page } from "$app/state"; // Import the page store to access current URL

  //The URL destination of the navigation link.
  export let href: string;
</script>

<a
  {href}
  class:underline={page.url.pathname === href}
  class="hover:underline"
  aria-current={page.url.pathname === href ? "page" : undefined}
>
  <slot />
</a>

<style>
  /* You can add any component-specific styles here if needed.
     For this component, Tailwind utilities are mostly sufficient. */
</style>
