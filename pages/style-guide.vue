<script setup>
import slug from "slug";
slug.extend({ "/": "-" });

const ecosystem = useEcosystemStore();
</script>

<template>
  <PageHeader heading="Style Guide" />
  <SectionColumn>
    <GithubGist />
  </SectionColumn>
</template>

<style scoped>
div {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 15rem;
}
</style>
