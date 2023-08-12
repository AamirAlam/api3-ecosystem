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
    <!-- <div class="spinner-text">+</div> -->
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
  /* animation: strokeAnimate 1.5s linear infinite; */
  /* stroke-dasharray: 100; */
  width: 100%;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes strokeAnimate {
  0% {
    stroke-dashoffset: 400;
  }

  100% {
    stroke-dashoffset: 0;
  }
}
</style>
