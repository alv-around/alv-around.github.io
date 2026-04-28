<script lang=ts>
  let {slug, title, date, description} = $props();
</script>

<div>
  <div class="flex flex-row justify-between">
    <h3>
      <a href="/blog/{slug}" class="hover:underline decoration-2 underline-offset-4">
        {title}
      </a>
    </h3>
    <p class="text-gray-500">
      {date}
    </p>
  </div>

  <p>
    {description}
  </p>
</div>

<style>
</style>
