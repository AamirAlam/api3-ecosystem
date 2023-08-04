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
