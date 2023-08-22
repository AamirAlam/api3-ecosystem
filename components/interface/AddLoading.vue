<script setup>
const props = defineProps(["start"]);

const progress = ref(0);

watch(
  () => props.start,
  (newVal) => {
    if (newVal) {
      resetProgress();
      startProgress();
    }
  }
);

function resetProgress() {
  progress.value = 0;
}

function startProgress() {
  const totalIterations = 100;
  const loadingTime = 20000; // 5 seconds in milliseconds
  const iterationDuration = loadingTime / totalIterations;
  let currentProgress = 0;

  const updateProgress = () => {
    if (currentProgress < totalIterations) {
      currentProgress++;
      progress.value = (currentProgress / totalIterations) * 100;
      setTimeout(updateProgress, iterationDuration);
    }
  };

  updateProgress();
}

onMounted(() => {
  startProgress();
});
</script>

<template>
  <div class="loading-progress">
    <div class="progress-bar" :style="{ width: progress + '%' }"></div>
  </div>
</template>

<style>
.loading-progress {
  width: 250px;
  height: 4px;
  border: var(--border);
  border-radius: 2px;
  /* overflow: hidden; */
}

/* Media query for small screens (max-width: 640px) */
@media screen and (max-width: 640px) {
  .loading-progress {
    width: 200px;
  }
}

.progress-bar {
  height: 100%;
  background-color: #ffffff;
  transition: width 0.3s ease-in-out;
}
</style>
