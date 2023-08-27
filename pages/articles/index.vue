<script setup>
//random number between 0 and 5
const random = Math.floor(Math.random() * 6);

useSeoMeta({
  title: "Blog",
  description:
    "Unlock the potential of blockchain oracles for your dApps. Learn more about oracles, understand how to leverage real-world data feeds, and create smarter, more responsive decentralized applications. Dive into our comprehensive developer materials now.",
  ogDescription:
    "Unlock the potential of blockchain oracles for your dApps. Learn more about oracles, understand how to leverage real-world data feeds, and create smarter, more responsive decentralized applications. Dive into our comprehensive developer materials now.",
});
</script>

<template>
  <PageTitle heading="Articles" />
  <SectionColumn>
    <h2 class="attention-voice">Featured</h2>
    <ArticleGrid :layout="5" />
  </SectionColumn>
  <SectionColumn>
    <h2 class="attention-voice">Recent</h2>
    <ArticleGridRecent />
  </SectionColumn>

  <!-- <SectionColumn>
    <h2 class="attention-voice">Popular</h2>
    <ArticleGrid :layout="3" cardCount="4" />
  </SectionColumn> -->
</template>

<style lang="scss" scoped>
h2 {
  margin-bottom: 2rem;
}
</style>
