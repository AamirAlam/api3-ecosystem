<template>
  <div class="loading-progress">
    <div class="progress-bar" :style="{ width: progress + '%' }"></div>
  </div>
</template>

<style>
.loading-progress {
  width: 250px;
  height: 4px;
  border: 1px solid var(--gray);
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

<script>
export default {
  props: {
    start: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      progress: 0,
    };
  },
  watch: {
    start(newVal) {
      if (newVal) {
        this.resetProgress();
        this.startProgress();
      }
    },
  },
  methods: {
    resetProgress() {
      this.progress = 0;
    },
    startProgress() {
      const totalIterations = 100;
      const loadingTime = 20000; // 5 seconds in milliseconds
      const iterationDuration = loadingTime / totalIterations;
      let currentProgress = 0;

      const updateProgress = () => {
        if (currentProgress < totalIterations) {
          currentProgress++;
          this.progress = (currentProgress / totalIterations) * 100;
          setTimeout(updateProgress, iterationDuration);
        }
      };

      updateProgress();
    },
  },
  created() {
    this.startProgress();
  },
};
</script>
