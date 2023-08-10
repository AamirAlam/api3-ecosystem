<template>
  <div class="loading-spinner">
    <!-- <div class="spinner-text">+</div> -->
    <picture class="loading-triangle">
      <LogoIcon />
    </picture>
  </div>
</template>

<style scoped>
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
.loading-triangle {
  animation: strokeAnimate 1.5s linear infinite;
  stroke-dasharray: 100;
  width: 100%;
}
</style>
