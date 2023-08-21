<script setup>
const hue = ref(160);

watch(hue, (newVal, oldVal) => {
  document.documentElement.style.setProperty("--hue", `${newVal}`);
});
</script>

<template>
  <div class="color slider">
    <form-field>
      <FormKit
        type="range"
        v-model="hue"
        min="0"
        max="360"
        step="1"
        :label="`Hue: ${hue}`"
        label-class="$reset notice-voice"
        help="You can change the hue of the colors by using the slider below."
      />
    </form-field>
  </div>
</template>

<style scoped lang="scss">
form-field {
  @media (min-width: 768px) {
    max-width: 50%;
  }
}
</style>
