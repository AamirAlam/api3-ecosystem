<template>
  <div class="loading-spinner">
    <div class="spinner"></div>
    <!-- <div class="spinner-text">+</div> -->
  </div>
</template>

<style>
.loading-spinner {
  position: relative;
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
  width: 100px;
  height: 100px;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.3);
  border-top: 1px solid #ffffff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
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
