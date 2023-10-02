<script setup>
import slug from "slug";
slug.extend({ "/": "-" });

const props = defineProps(["chain", "fill", "stroke", "strokeWidth"]);
const isTestnet = computed(() => props.chain?.includes("-testnet"));

let chain = slug(props.chain);
chain = chain.replace("-testnet", "");
chain = chain.replace("-goerli", "");
chain = chain.replace("-chain", "");

chain = chain === "sepolia" ? "ethereum" : chain;
chain = chain === "goerli" ? "ethereum" : chain;
chain = chain === "mainnet" ? "ethereum" : chain;
</script>

<template>
  <img :src="`/images/chains/${chain}.svg`" :alt="chain" />
</template>
