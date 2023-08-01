<script setup>
const route = useRoute();
const nuxtApp = useNuxtApp();
const loading = ref(false);

nuxtApp.hook("page:start", () => {
  loading.value = true;
});

nuxtApp.hook("page:finish", async () => {
  loading.value = false;
  await nextTick();
});

useHead({
  bodyAttrs: {
    class: route.name,
  },
});
</script>

<template>
  <NuxtLayout>
    <!-- <NuxtLoadingIndicator color="var(--gradient-color)" /> -->
    <!-- <LoadingScreen v-if="loading" /> -->
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html * {
  --fk-font-family: var(--font);
  --fk-font-size: 1rem;
  --fk-font-weight: 400;
  --fk-line-height: 1.4;
  --fk-color-input: var(--ink);
}
form {
  --multistep-radius: var(--corners);
  --multistep-color-success: var(--color);
  --fk-color-help: var(--ink);
  fill: black !important;

  /* vueform/multistep */

  --ms-bg: var(--paper);
  --ms-border-color: var(--ink);
  --ms-radius: var(--corners);

  --ms-tag-bg: var(--color);
  --ms-tag-color: var(--paper);
  --ms-tag-radius: var(--corners);

  --ms-dropdown-bg: var(--paper);
  --ms-dropdown-border-color: var(--ink);
  --ms-dropdown-color: var(--ink);
  --ms-dropdown-radius: var(--corners);
}
</style>
