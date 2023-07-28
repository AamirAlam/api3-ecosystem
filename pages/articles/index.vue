<script setup>
//random number between 0 and 5
const random = Math.floor(Math.random() * 6);

useServerSeoMeta({
  title: "Blog",
  description:
    "Unlock the potential of blockchain oracles for your dApps. Learn more about oracles, understand how to leverage real-world data feeds, and create smarter, more responsive decentralized applications. Dive into our comprehensive developer materials now.",
  ogDescription:
    "Unlock the potential of blockchain oracles for your dApps. Learn more about oracles, understand how to leverage real-world data feeds, and create smarter, more responsive decentralized applications. Dive into our comprehensive developer materials now.",
});
</script>

<template>
  <PageHeader heading="Articles" />
  <SectionColumn>
    <ArticleGrid :layout="4" />
  </SectionColumn>
</template>
