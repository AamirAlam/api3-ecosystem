<script setup></script>

<template>
  <div class="mask">
    <div class="loader"></div>
  </div>
</template>

<style scoped lang="scss">
.mask {
  position: fixed;
  inset: 0;
  background: var(--paper);
  z-index: 1031;
}

.loader {
  display: block;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-right: solid 2px var(--green);
  border-radius: 50%;
  --size: 50px;
  width: var(--size);
  height: var(--size);
  -webkit-animation: loader 400ms linear infinite;
  animation: loader 400ms linear infinite;
}

@-webkit-keyframes loader {
  0% {
    -webkit-transform: translate(-50%, -50%) rotate(0deg);
  }

  100% {
    -webkit-transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes loader {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
