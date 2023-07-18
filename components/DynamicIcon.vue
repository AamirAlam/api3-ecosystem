<script setup>
import slug from "slug";

const props = defineProps(["icon"]);

const icon = computed(() => {
  return props.icon;
});

const fileExists = ref(false);

watch(icon, async (newVal, oldVal) => {
  try {
    const response = await axios.head(`/images/icons/${slug(newVal)}.svg`);
    fileExists.value = response.status === 200;
  } catch (error) {
    fileExists.value = false;
  }
});
</script>

<template>
  <picture v-if="fileExists">
    <img :src="`/images/icons/${slug(icon)}.svg`" alt="" />
  </picture>
</template>
