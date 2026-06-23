<script lang="ts">
import { onMount } from "svelte";
import Break from "$lib/break.svelte";
import GiscusComments from "$lib/giscus-comments.svelte";

// @ts-ignore
let { data } = $props() as any;

const highlightCssHref =
    "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.11.1/build/styles/tokyo-night-dark.min.css";
const highlightJsSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/highlight.min.js";

function ensureHighlightTheme() {
    if (document.querySelector(`link[href="${highlightCssHref}"]`)) {
        return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = highlightCssHref;
    document.head.appendChild(link);
}

function loadHighlightJs() {
    if (window.hljs) {
        return Promise.resolve();
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
        `script[src="${highlightJsSrc}"]`,
    );

    if (existingScript) {
        return new Promise<void>((resolve, reject) => {
            existingScript.addEventListener("load", () => resolve(), {
                once: true,
            });
            existingScript.addEventListener("error", () => reject(), {
                once: true,
            });
        });
    }

    return new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = highlightJsSrc;
        script.defer = true;
        script.addEventListener("load", () => resolve(), { once: true });
        script.addEventListener("error", () => reject(), { once: true });
        document.head.appendChild(script);
    });
}

function highlightCodeBlocks() {
    document
        .querySelectorAll<HTMLElement>(".markdown-content pre code")
        .forEach((codeBlock) => {
            const languageClass = [...codeBlock.classList].find((className) =>
                className.startsWith("language-"),
            );
            const language = languageClass?.replace("language-", "");

            if (language) {
                codeBlock.closest("pre")?.setAttribute("data-lang", language);
            }

            window.hljs?.highlightElement(codeBlock);
        });
}

onMount(() => {
    ensureHighlightTheme();
    loadHighlightJs()
        .then(highlightCodeBlocks)
        .catch(() => {
            // Keep readable code blocks if the CDN is unavailable.
        });
});
</script>

<svelte:head>
    <title>{data.title} | Alv-Around</title>
    {#if data.description}
        <meta name="description" content={data.description} />
    {/if}
</svelte:head>

<article class="pt-8 max-w-full">
    <header>
        <h3 class="text-4xl font-bold">{data.title}</h3>
        <p class="text-gray-500">{data.date}</p>
        {#if data.description}
            <h4 class="italic text-gray-700">{data.description}</h4>
        {/if}
    </header>

    <Break />

    <div class="markdown-content text-xl">
        {@html data.content}
    </div>

    <GiscusComments />
</article>

<style>

.markdown-content :global(pre) {
  background-color: #1a1b26;
  color: #c0caf5;
  position: relative;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 0.9rem;
  line-height: 1.7;
  overflow-x: auto;
  margin: var(--notepad-line-height) 0;
  border: 1px solid rgba(122, 162, 247, 0.2);
  border-radius: 0.5rem;
  box-shadow: 0 0.75rem 2rem rgba(26, 27, 38, 0.18);
}

.markdown-content :global(pre code) {
  display: block;
  padding: 1.25rem;
  min-width: max-content;
  font-family: inherit;
  line-height: inherit;
}

/* Language Label */
.markdown-content :global(pre[data-lang]::before) {
  content: attr(data-lang);
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.15rem 0.55rem;
  background-color: rgba(122, 162, 247, 0.16);
  color: #7aa2f7;
  font-size: 0.72rem;
  text-transform: lowercase;
  border-bottom-left-radius: 0.375rem;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  letter-spacing: 0;
}

.markdown-content :global(:not(pre) > code) {
  padding: 0 0.25rem;
  background-color: rgba(26, 27, 38, 0.09);
  border-radius: 0.25rem;
  color: #414868;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 0.9em;
}
</style>

