<script lang="ts">
  let { link, title, language, stars, description } = $props();

  function getLanguageColor(lang: string): string {
    const colors: Record<string, string> = {
      Go: "bg-cyan-200",
      TypeScript: "bg-blue-200",
      JavaScript: "bg-yellow-200",
      Python: "bg-green-200",
      Rust: "bg-orange-200",
      Nix: "bg-indigo-200",
    };

    return colors[lang] || "bg-zinc-500";
  }
</script>

<a
  href={link}
  target="_blank"
  class="block p-4 border-2 border-rose-200 rounded-lg hover:bg-rose-300 transition-colors hover:scale-105 hover:animate-jiggle"
>
  <div class="flex justify-between items-center">
    <h3 class="text-xl font-semibold">{title}</h3>

    <div class="flex gap-4 text-sm shrink-0">
      <span
        class={`${getLanguageColor(language)} px-2 py-0.5 rounded-full`}
      >
        {language}
      </span>
      <span class="border border-zinc-300 px-2 py-0.5 rounded-full">
        ⭐ {stars}
      </span>
    </div>
  </div>

  <p class="text-sm text-zinc-600 mt-1">{description}</p>
</a>
