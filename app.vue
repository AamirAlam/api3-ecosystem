<script setup>
const route = useRoute();
const nuxtApp = useNuxtApp();
const loading = ref(false);
const {} = useWeb3Store();
const router = useRouter();

nuxtApp.hook("page:start", () => {
  loading.value = true;
});

nuxtApp.hook("page:finish", async () => {
  loading.value = false;
  await nextTick();
});

useHead({
  htmlAttrs: {
    lang: "en",
  },
  bodyAttrs: {
    class: route.name,
  },
});

useSeoMeta({
  ogUrl: "https://ecosystem.api3.org",

  title: "API3 Ecosystem",
  ogTitle: "API3 Ecosystem",
  twitterTitle: "API3 Ecosystem",

  description:
    "Discover the API3 ecosystem and learn more about utilizing real-world data in your smart contracts",
  ogDescription:
    "Discover the API3 ecosystem and learn more about utilizing real-world data in your smart contracts",
  twitterDescription:
    "Discover the API3 ecosystem and learn more about utilizing real-world data in your smart contracts",

  ogImage: "/images/api3-ecosystem-meta.jpg",
  twitterImage: "/images/api3-ecosystem-meta-twitter.jpg",

  twitterCard: "summary",
});

onMounted(() => {
  const {} = useWeb3();
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
body > div[data-v-app] {
  display: none;
}
</style>
