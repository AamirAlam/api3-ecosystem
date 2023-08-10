<script setup>
const ecosystem = useEcosystemStore();
</script>

<template>
  <PageHeader heading="test ground" />
  <SectionColumn>
    {{ ecosystem.chainOptions }}

    <ul>
      <li v-for="chain in ecosystem.chainOptions">
        <ChainIcon
          :chain="chain.label"
          fill="var(--color)"
          stroke="var(--paper)"
          strokeWidth="15%"
        />
      </li>
    </ul>
  </SectionColumn>
</template>

<style scoped>
ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20px, 1fr));
  gap: 1rem;
}
</style>

<style></style>
