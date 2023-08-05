<script setup>
const basics = ref([
  {
    name: "Paper",
    variable: "--paper",
  },
  {
    name: "Ink",
    variable: "--ink",
  },
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
]);

const colors = ref([
  {
    name: "Primary",
    variable: "--color",
  },
  {
    name: "Color Dark",
    variable: "--color-shade",
  },
  {
    name: "Color Darker",
    variable: "--color-dark",
  },
  {
    name: "Cololr Darkest",
    variable: "--color-darkest",
  },
  {
    name: "Highlight",
    variable: "--highlight",
  },
  {
    name: "Success",
    variable: "--success",
  },
  {
    name: "Warning",
    variable: "--warning",
  },
]);

const gradients = ref([
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
    name: "Gradient Color Darker",
    variable: "--gradient-dark-color",
  },
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

    <ul class="colors">
      <li v-for="color in basics" :key="color.name">
        <div
          class="pallete"
          :style="`background: var(${color.variable})`"
        ></div>
        <div class="color-name">
          <code>{{ color.variable }}</code>
        </div>
      </li>
    </ul>

    <ul class="colors">
      <li v-for="color in colors" :key="color.name">
        <div
          class="pallete"
          :style="`background: var(${color.variable})`"
        ></div>
        <div class="color-name">
          <code>{{ color.variable }}</code>
        </div>
      </li>
    </ul>
    <ul class="colors">
      <li v-for="color in gradients" :key="color.name">
        <div
          class="pallete"
          :style="`background: var(${color.variable})`"
        ></div>
        <div class="color-name">
          <code>{{ color.variable }}</code>
        </div>
      </li>
    </ul>
    <!-- <ul class="colors">
      <li v-for="texture in textures" :key="texture.name">
        <div
          class="pallete"
          :style="`backgroundImage: var(${texture.variable})`"
        ></div>
        <div class="texture-name">
          <code>{{ texture.variable }}</code>
        </div>
      </li>
    </ul> -->
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
