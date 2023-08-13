<script setup>
import gsap from "gsap";

onMounted(() => {
  gsap.fromTo(
    ".loading-triangle path",
    {
      scale: 0,
      transformOrigin: "center",
    },
    {
      duration: 1.5,
      scale: 2,
      transformOrigin: "center",
      ease: "power2.inOut",
      stagger: {
        each: 0.1,
        repeat: -1,
      },
    }
  );
});
</script>

<template>
  <div class="loading-spinner">
    <picture class="loading-triangle">
      <LogoIcon />
    </picture>
  </div>
</template>

<style scoped lang="scss">
.loading-spinner {
  position: relative;
  width: 50px;
  aspect-ratio: 1 / 1;
}

.spinner {
  border-top: 2px solid var(--color);
  border-radius: 50%;
  width: 100%;
  aspect-ratio: 1 / 1;
  animation: spin 2s ease-out infinite;
}
.loading-triangle {
  width: 100%;
}
</style>
