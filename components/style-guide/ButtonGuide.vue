<script setup>
const buttons = ref([
  {
    name: "Primary",
    class: "button",
  },
  {
    name: "Text",
    class: "text",
  },
  {
    name: "Icon",
    class: "icon button",
  },
  {
    name: "Button Filled",
    class: "button filled",
  },
  {
    name: "Button Loud",
    class: "loud-button",
  },
  {
    name: "Disabled",
    class: "button disabled",
    disabled: true,
  },
]);
</script>

<template>
  <div class="buttons">
    <h2 class="attention-voice">Buttons and Anchors</h2>
    <ul>
      <li v-for="button in buttons">
        <button :class="button.class" :disabled="button.disabled">
          {{ button.name }}
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
</style>
