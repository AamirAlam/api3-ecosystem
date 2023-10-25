<script setup>
const route = useRoute();
</script>

<template>
  <div class="curves-wrapper" v-if="route.name != 'index'">
    <picture class="curves-decoration-3">
      <CurvesDecoration3 />
    </picture>
  </div>

  <SiteHeader />
  <main :class="route.name">
    <slot />
  </main>

  <SiteFooter v-if="route.name != 'add-dapp' || route.name !== 'add-dapp-2'" />

  <!-- <BlobAnimation /> -->
</template>

<style scoped lang="scss">
.curves-wrapper {
  position: absolute;
  overflow-x: hidden;
  height: 100%;
  width: 100%;
  z-index: -10;

  picture.curves-decoration-3 {
    position: absolute;
    top: 100px;
    left: -200px;
    //  transform: translate(-50%, -50%) rotate(10deg) scaleY(1.8);

    width: 300vw;
    //   display: none;

    @media (min-width: 768px) {
      display: block;
      top: -5%;
      left: -40%;

      width: 200vw;
      z-index: -10;
    }
  }
}
</style>
