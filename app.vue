<script setup>
const route = useRoute();
const nuxtApp = useNuxtApp();
const loading = ref(false);
const { } = useWeb3Store();
const router = useRouter();

function getClientAppVersion() {
  return localStorage.getItem('APP_VERSION') ?? 0
}

function setClientAppVersion(version) {
  return localStorage.setItem('APP_VERSION', version)
}

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
});

useSeoMeta({
  ogUrl: "https://ecosystem.api3.org",
  ogType: "website",

  title: "API3 Ecosystem Site",
  ogTitle: "API3 Ecosystem Site",
  twitterTitle: "API3 Ecosystem Site",

  description:
    "Discover the API3 ecosystem and learn more about utilizing real-world data in your smart contracts",
  ogDescription:
    "Discover the API3 ecosystem and learn more about utilizing real-world data in your smart contracts",
  twitterDescription:
    "Discover the API3 ecosystem and learn more about utilizing real-world data in your smart contracts",

  ogImage: {
    url: "/images/api3-ecosystem-meta.jpg",
    width: 1200,
    height: 630,
    alt: "API3 Ecosystem Logo",
  },

  twitterImage: {
    url: "/images/api3-ecosystem-meta.jpg",
    width: 1200,
    height: 630,
    alt: "API3 Ecosystem Logo",
  },

  twitterCard: "summary_large_image",

  themeColor: "#7de2cb",
});

onMounted(() => {
  const { } = useWeb3();
  fetch("/version.json").then((serverPromise) =>
    serverPromise.json().then((response) => {
      const latestVersion = response.version
      const clientStoredVersion = getClientAppVersion()

      if (clientStoredVersion != latestVersion) {
        window.location.reload(true)
        setClientAppVersion(latestVersion)
      }
      else return
    }))
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
body>div[data-v-app] {
  display: none;
}
</style>
