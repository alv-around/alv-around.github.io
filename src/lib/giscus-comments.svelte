<script lang="ts">
import { onMount } from "svelte";

const giscusConfig = {
    repo: "alv-around/alv-around.github.io",
    repoId: "R_kgDOO1A5eQ",
    category: "General",
    categoryId: "DIC_kwDOO1A5ec4C_ucy", //  String(import.meta.env.PUBLIC_GISCUS_CATEGORY_ID ?? "").trim(),
};

let container: HTMLDivElement | undefined;
const isConfigured = giscusConfig.categoryId.length > 0;

onMount(() => {
    if (!container || !isConfigured) {
        return;
    }

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", giscusConfig.repo);
    script.setAttribute("data-repo-id", giscusConfig.repoId);
    script.setAttribute("data-category", giscusConfig.category);
    script.setAttribute("data-category-id", giscusConfig.categoryId);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "light");
    script.setAttribute("data-lang", "en");

    container.appendChild(script);

    return () => {
        container?.replaceChildren();
    };
});
</script>

{#if isConfigured}
    <section class="comments" aria-label="Comments" bind:this={container}></section>
{/if}

<style>
.comments {
    margin-top: calc(var(--notepad-line-height) * 2);
    padding-bottom: calc(var(--notepad-line-height) * 2);
}
</style>
