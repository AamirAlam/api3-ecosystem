<script setup>
const ecosystem = useEcosystemStore();
</script>

<template>
  <PageTitle heading="test ground" />
  <SectionColumn>
    <GithubGist
      gistUrl="https://gist.github.com/vanshwassan/0b50c7b36b1e7ebed85549754578ed79"
    />
  </SectionColumn>
</template>

<style scoped>
ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 1rem;
}

.pallete {
  width: 100%;
  aspect-ratio: 1 /1;
}
</style>

<style></style>
