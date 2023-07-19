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
const {} = useWeb3();

useHead({
  bodyAttrs: {
    class: route.name,
  },
});

onMounted(() => {
  var scale = "scale(1)";
  document.body.style.webkitTransform = scale; // Chrome, Opera, Safari
  document.body.style.msTransform = scale; // IE 9
  document.body.style.transform = scale; // General
});
</script>

<template>
  <NuxtLayout>
    <!-- <NuxtLoadingIndicator color="var(--gradient-color)" /> -->
    <!-- <LoadingScreen v-if="loading" /> -->
    <NuxtPage />
  </NuxtLayout>
</template>
