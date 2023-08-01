<script setup>
import VueEasyLightbox from "vue-easy-lightbox";

const props = defineProps(["dapp"]);

const visibleRef = ref(false);
const indexRef = ref(0); // default 0

const onHide = () => (visibleRef.value = false);
const onShow = () => {
  visibleRef.value = true;
};
</script>

<template>
  <section class="screenshots">
    <h2 class="attention-voice">Screenshots</h2>
    <ul class="image-grid">
      <li
        v-for="image in dapp?.images.screenshots"
        :key="image"
        @click="onShow"
      >
        <img :src="image" :alt="image" />
      </li>

      <VueEasyLightbox
        :visible="visibleRef"
        :imgs="dapp?.images.screenshots"
        :index="indexRef"
        @hide="onHide"
        teleport="body"
      />
    </ul>
  </section>
</template>

<style scoped>
.image-grid {
  display: grid;
  gap: 0.3125rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-template-rows: auto auto;
}
</style>
