<script setup>
import { CHAINS } from "@api3/chains";

const ecosystem = useEcosystemStore();

const spacings = ref([
  "--space-3xs",
  "--space-2xs",
  "--space-xs",
  "--space-s",
  "--space-m",
  "--space-l",
  "--space-xl",
  "--space-2xl",
  "--space-3xl",
]);
</script>

<template>
  <PageTitle heading="test ground" />
  <SectionColumn>
    <ul>
      <li v-for="chain in CHAINS">
        <ChainIcon :chain="chain.name" />
      </li>
    </ul>
  </SectionColumn>
</template>

<style scoped>
ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: var(--space-m);
}

div {
  background: var(--green);
  aspect-ratio: 1;
  width: var(--space);
}
</style>

<style></style>
