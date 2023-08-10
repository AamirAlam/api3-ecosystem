<script setup>
const route = useRoute();
</script>

<template>
  <SiteHeader />
  <main :class="route.name">
    <slot />
  </main>

  <SiteFooter v-if="route.name != 'add-dapp' || route.name !== 'add-dapp-2'" />

  <BlobAnimation />
</template>
