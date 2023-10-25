<script setup>
//random number between 0 and 5

useSeoMeta({
  ogUrl: "https://ecosystem.api3.org/articles",

  title: "Blog",
  ogTitle: "Blog",
  twitterTitle: "Blog",

  description:
    "Unlock the potential of blockchain oracles. Learn more about oracles, understand how to leverage real-world data feeds, and create smarter, more responsive dApps.",
  ogDescription:
    "Unlock the potential of blockchain oracles. Learn more about oracles, understand how to leverage real-world data feeds, and create smarter, more responsive dApps.",
  twitterDescription:
    "Unlock the potential of blockchain oracles. Learn more about oracles, understand how to leverage real-world data feeds, and create smarter, more responsive dApps.",
});
</script>

<template>
  <PageTitle heading="Articles" />
  <SectionColumn>
    <h2 class="attention-voice">Featured</h2>
    <ArticleGrid :layout="0" isFeaturedSort="true" />
  </SectionColumn>

  <SectionColumn>
    <h2 class="attention-voice">Popular</h2>
    <ArticleGrid :layout="1" cardCount="4" isPopularSort="true" />
  </SectionColumn>

  <SectionColumn>
    <h2 class="attention-voice">Recent</h2>
    <ArticleGrid layout="3" cardCount="4" isRecentSort="true" />
  </SectionColumn>

  <!-- <SectionColumn>
    <h2 class="attention-voice">Popular</h2>
    <ArticleGrid :layout="3" cardCount="4" />
  </SectionColumn> -->
</template>

<style lang="scss" scoped>
h2 {
  margin-bottom: var(--space-l);
}
</style>
