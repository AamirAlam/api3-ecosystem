<script setup>
import slug from "slug";

const ecosystem = useEcosystemStore();

const props = defineProps(["icon", "fill", "stroke"]);
</script>

<template>
  <picture v-tooltip="ecosystem?.productTypeToLabel?.[dapp?.productType]">
    <img :src="`/images/icons/${slug(props.icon)}.svg`" alt="" />
  </picture>
</template>

<style scoped>
picture {
  filter: hue-rotate(var(--hue-rotate));
}
</style>
