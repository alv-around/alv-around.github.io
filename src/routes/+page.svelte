<script>
  import Badge from "$lib/badge.svelte"; // Adjust path if you put it in src/lib/components/Badge.svelte

  const ghUserName = "alv-around"; // TODO: add configuration, so sensitive information is not displayed
  const statsBackgroundColor = "00000000"; // transparent
  const ghSummaryStats = `https://github-readme-stats.vercel.app/api?username=${ghUserName}&show_icons=true&bg_color=${statsBackgroundColor}`;
  const topLanguageStats = `https://github-readme-stats.vercel.app/api/top-langs/?username=${ghUserName}&layout=compact&bg_color=${statsBackgroundColor}`;
</script>

<h4>
  I am software engineer interested in way to many stuff. Welcome to my world!
</h4>

<h4>Here are some of my interests:</h4>
<div class="flex gap-3 mb-4">
  <Badge text="Software Development" color="yellow" />
  <Badge text="Distributed Systems" color="blue" />
  <Badge text="Open Source" color="green" />
  <Badge text="Cryptography" color="pink" />
  <Badge text="System Architecture" color="indigo" />
  <Badge text="Rust" color="red" />
  <Badge text="Linux" color="purple" />
</div>

<h2>Stats</h2>
<!-- github user stats -->
<div class="flex gap-1 item-start">
  <picture>
    <source
      srcset={ghSummaryStats}
      media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
    />
    <img
      src={ghSummaryStats}
      alt="Github Summary Stats"
      class="h-42 w-auto object-contain"
    />
  </picture>

  <picture>
    <source
      srcset={topLanguageStats}
      media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
    />
    <img
      src={topLanguageStats}
      alt="Github Summary Stats"
      class="h-42 w-auto object-contain"
    />
  </picture>
</div>

<style lang="postcss">
  @reference "tailwindcss";
</style>
