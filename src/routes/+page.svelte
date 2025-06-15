<script>
  const ghUserName = "alv-around";
  const ghSummaryStats = `https://github-readme-stats.vercel.app/api?username=${ghUserName}&show_icons=true`;
  const topLanguageStats = `https://github-readme-stats.vercel.app/api/top-langs/?username=${ghUserName}&layout=compact`;
</script>

<h1>Welcome to my world!</h1>
<p>
  I am software engineer interested in way to many stuff. This is my personal
  website
</p>

<h2>Stats</h2>
<!-- github user stats -->
<picture>
  <source
    srcset={ghSummaryStats}
    media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
  />
  <img src={ghSummaryStats} alt="Github Summary Stats" />
</picture>

<picture>
  <source srcset={topLanguageStats} media="(prefers-color-scheme: dark)" />
  <source
    srcset={topLanguageStats}
    media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
  />
  <img src={topLanguageStats} alt="Github Summary Stats" />
</picture>

<h2>Some of my interest are:</h2>
