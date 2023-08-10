<script setup>
const colors = ref([
  [
    {
      name: "Paper",
      variable: "--paper",
    },
    {
      name: "Ink",
      variable: "--ink",
    },
  ],
  [
    {
      name: "Gray",
      variable: "--gray",
    },
    {
      name: "Gray Light",
      variable: "--gray-light",
    },
    {
      name: "Gray Lighter",
      variable: "--gray-lighter",
    },
    {
      name: "Gray Dark",
      variable: "--gray-dark",
    },
    {
      name: "Gray Darker",
      variable: "--gray-darker",
    },
  ],

  [
    {
      name: "Primary",
      variable: "--color",
    },
    {
      name: "Secondary",
      variable: "--highlight",
    },
    {
      name: "Tertiary",
      variable: "--tertiary-color",
    },
  ],
  [
    {
      name: "Color Lighter",
      variable: "--color-light",
    },
    {
      name: "Color Lighter",
      variable: "--color-lighter",
    },
    {
      name: "Cololr Lightest",
      variable: "--color-lightest",
    },
  ],
  [
    {
      name: "Color Darker",
      variable: "--color-dark",
    },
    {
      name: "Color Darker",
      variable: "--color-darker",
    },
    {
      name: "Cololr Darkest",
      variable: "--color-darkest",
    },
  ],

  [
    {
      name: "Success",
      variable: "--success",
    },
    {
      name: "Warning",
      variable: "--warning",
    },
  ],
  [
    {
      name: "Gradient Dark",
      variable: "--gradient-dark",
    },
    {
      name: "Gradient Light",
      variable: "--gradient-light",
    },
    {
      name: "Gradient Color",
      variable: "--gradient-color",
    },
    {
      name: "Gradient Color Lighter",
      variable: "--gradient-color-light",
    },
    {
      name: "Gradient Color Darker",
      variable: "--gradient-color-dark",
    },
  ],
]);

const textures = ref([
  {
    name: "Texture",
    variable: "--texture",
  },
  {
    name: "checkers",
    variable: "--checkers",
  },
  {
    name: "Diagonal",
    variable: "--diagnol",
  },
  {
    name: "Points",
    variable: "--points",
  },
]);
</script>

<template>
  <div class="color-guide">
    <h2 class="attention-voice">Colors</h2>
    <p>
      These are the colors used in the app. They are defined in
      <code>settings.css</code> and are available as CSS variables which are
      used throughout the app.
    </p>

    <ul class="colors" v-for="colorGroup in colors">
      <li v-for="color in colorGroup" :key="color.name">
        <div
          class="pallete"
          :style="`background: var(${color.variable})`"
        ></div>
        <div class="color-name">
          <code>{{ color.variable }}</code>
        </div>
      </li>
    </ul>
  </div>

  <ColorSlider />
</template>

<style scoped lang="scss">
.colors {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
div.pallete {
  width: 100%;
  height: 100px;
  border-radius: var(--corners);
  margin-bottom: 0.5rem;
}
</style>
