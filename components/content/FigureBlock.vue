<script setup>
const props = defineProps(["image", "alt", "caption"]);
</script>

<template>
  <figure>
    <NuxtImg loading="lazy" :src="image" :alt="alt" />
    <figcaption class="whisper-voice" v-if="caption">
      {{ caption }}
    </figcaption>
  </figure>
</template>

<style scoped lang="scss">
figure {
  margin: var(--space-l) 0;
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: var(--space-s);

  @media (min-width: 768px) {
    grid-column: 4 / -1 !important;
  }

  position: relative;
  //   left: -10%;

  &::after {
    position: absolute;
    inset: 0;

    content: "";
    z-index: 1;
  }
}
</style>
