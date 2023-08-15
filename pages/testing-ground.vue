<script setup>
const ecosystem = useEcosystemStore();
</script>

<template>
  <PageHeader heading="test ground" />
  <SectionColumn>
    <JoinNewsletter />
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
