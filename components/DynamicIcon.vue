<script setup>
import slug from "slug";

const props = defineProps(["icon"]);
</script>

<template>
  <picture v-if="icon">
    <img :src="`/images/icons/${slug(icon)}.svg`" alt="" />
  </picture>
</template>
