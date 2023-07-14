<script setup>
import slug from "slug";
slug.extend({ "/": "-" });
// console.log(wallet);

const ecosystem = useEcosystemStore();
</script>

<template>
  <PageHeader heading="Style Guide" />
  <SectionColumn>
    <!-- <div>
      <ChainIcon
        v-for="chain in ecosystem.chainOptions"
        :chain="chain.label"
        fill="none"
        stroke="var(--color)"
      />
    </div> -->

    <pre>
		{{ ecosystem.stats }}
	 </pre
    >
    <button @click="ecosystem.serverPage += 1">Update list</button>
    <p>{{ ecosystem.serverPage }}</p>
    <pre>{{ ecosystem.list }}</pre>
  </SectionColumn>
</template>

<style scoped>
div {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 15rem;
}
</style>
