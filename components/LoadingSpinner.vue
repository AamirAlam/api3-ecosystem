<template>
  <div class="loading-spinner">
    <div class="spinner"></div>
    <!-- <div class="spinner-text">+</div> -->
  </div>
</template>

<style>
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
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
