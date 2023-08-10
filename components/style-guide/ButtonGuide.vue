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
    name: "Filled",
    class: "button filled",
  },

  {
    name: "Loud",
    class: "loud-button",
  },
  {
    name: "Loading",
    class: "button",
    isLoading: true,
  },

  {
    name: "Loading",
    class: "button filled",
    isLoading: true,
  },

  {
    name: "Disabled",
    class: "button",
    disabled: true,
  },
  {
    name: "Disabled",
    class: "text",
    disabled: true,
  },
  {
    name: "Disabled",
    class: "icon button",
    disabled: true,
  },
  {
    name: "Disabled",
    class: "button filled",
    disabled: true,
  },

  {
    name: "Disabled",
    class: "loud-button",
    disabled: true,
  },
]);
</script>

<template>
  <div class="buttons">
    <h2 class="attention-voice">Buttons and Anchors</h2>
    <p>These classes help style the buttons and anchors across the site.</p>
    <ul>
      <li v-for="button in buttons">
        <button
          :class="button.class"
          :disabled="button.disabled"
          v-tooltip="button.class"
          v-if="!button.isLoading"
        >
          {{ button.name }}
        </button>
        <div data-loading v-else>
          <div data-type="submit">
            <button
              :class="button.class"
              :disabled="button.disabled"
              v-tooltip="button.class"
            >
              {{ button.name }}
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
ul {
  display: grid;
  align-items: center;
  justify-items: center;

  grid-template-columns: 1fr 1fr;
  --gap: 3rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>
