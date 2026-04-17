<script>
  import Badge from "$lib/badge.svelte"; // Adjust path if you put it in src/lib/components/Badge.svelte
  import Break from "$lib/break.svelte";

  const ghUserName = "alv-around"; // TODO: add configuration, so sensitive information is not displayed
  const gh = `https://github.com/${ghUserName}`;
  const statsBackgroundColor = "00000000"; // transparent
  const ghSummaryStats = `https://github-readme-stats.vercel.app/api?username=${ghUserName}&show_icons=true&bg_color=${statsBackgroundColor}`;
  const topLanguageStats = `https://github-readme-stats.vercel.app/api/top-langs/?username=${ghUserName}&layout=compact&bg_color=${statsBackgroundColor}`;
</script>

<Break />
<h4>
  Hi! Am Alvaro, welcome to my world!
  I am software engineer interested distributed systems, system architecture, and cryptography (among others...). 
  From time to time I tincker with my linux PC and home server.
  I care about open source, the free web and digital sovereignty.
</h4>
<Break />

<h4>These are some of the techologies/topics I am interested:</h4>
<div class="mx-3">
  <div class="flex flex-wrap justify-center gap-1">
    <Badge text="Rust" color="orange" />
    <Badge text="Python" color="pink" />
    <Badge text="Typescript" color="indigo" />
    <Badge text="Kubernetes" color="red" />
    <Badge text="Docker" color="purple" />
    <Badge text="Nix" color="yellow" />
    <Badge text="Postgres" color="blue" />
    <Badge text="Ansible" color="red" />
    <Badge text="Zero-Knowledge" color="pink" />
    <Badge text="Linux" />
    <Badge text="AWS" color="orange" />
    <Badge text="GCP" color="purple" />
    <Badge text="Redis" color="red" />
    <Badge text="RabbitMQ" color="green" />
    <Badge text="Grafana" color="orange" />
    <Badge text="Prometheus" color="orange" />
    <Badge text="MongoDB" color="green" />
    <Badge text="LLVM"/>
    <Badge text="Elasticsearch" color="yellow" />
    <Badge text="Kibana" color="green" />
    <Badge text="Axum" color="red" />
    <Badge text="FastAPI" color="blue" />
    <Badge text="Django" color="indigo" />
    <Badge text="React" color="purple" />
    <Badge text="Vue" color="green" />
    <Badge text="Svelte" color="orange" />
  </div>
</div>

<h2>Stats</h2>

<h4>
<!-- INFO: for Salmon color use: text-coral-400 -->
For more details of the projects I work on check my
<a href={gh} class="underline text-teal-500">github profile</a>.
</h4>
<Break />

<div class="mx-3">
  <div class="flex gap-1 item-start">
    <picture>
      <source
        srcset={ghSummaryStats}
        media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
      />
      <img
        src={ghSummaryStats}
        alt="Github Summary Stats"
        class="h-40 w-auto object-contain"
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
        class="h-40 w-auto object-contain"
      />
    </picture>
  </div>
</div>

<style lang="postcss">
  @reference "tailwindcss";
</style>
