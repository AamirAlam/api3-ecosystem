<script setup>
const corners = ref(16);
const lineWidth = ref(1);

const borders = ref([
  {
    name: `line-width`,
    variable: "--border",
  },
  {
    name: "corners",
    variable: "--border",
  },
  {
    name: "border",
    variable: "--border",
  },
  {
    name: "border-light",
    variable: "--border-light",
  },
  {
    name: "border-color",
    variable: "--border-color",
  },
  {
    name: "border-highlight",
    variable: "--border-highlight",
  },
]);

watch(corners, (newVal, oldVal) => {
  document.documentElement.style.setProperty("--corners", `${newVal}px`);
});
watch(lineWidth, (newVal, oldVal) => {
  document.documentElement.style.setProperty("--line-width", `${newVal}px`);
});
</script>

<template>
  <div class="border-guide">
    <h2 class="attention-voice">Borders and Lines</h2>
    <p>
      These are the different Lines, their width, radius and colors. They are
      defined in
      <code>settings.css</code> for how they are used for borders.
    </p>
    <ul class="borders">
      <li v-for="border in borders" :key="border.name">
        <div :style="`border: var(${border.variable})`">
          <code>--{{ border.name }}</code>
        </div>
      </li>
    </ul>
  </div>

  <div class="slider corners">
    <form-field>
      <FormKit
        type="range"
        v-model="corners"
        min="0"
        max="50"
        step="1"
        :label="`Corners: ${corners}px`"
        label-class="$reset notice-voice"
        help="You can change the radius of the lines by using the slider below."
      />
    </form-field>
  </div>
  <div class="slider line-width">
    <form-field>
      <FormKit
        type="range"
        v-model="lineWidth"
        min="0"
        max="10"
        step="1"
        :label="`Line Width: ${lineWidth}px`"
        label-class="$reset notice-voice"
        help="You can change the line-width of the lines by using the slider below."
      />
    </form-field>
  </div>
</template>

<style scoped lang="scss">
.border-guide {
  ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));

    @media (min-width: 768px) {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
  }
  div {
    width: 100%;
    height: 100px;
    border-radius: var(--corners);
    display: grid;
    place-items: center;

    animation: borderRadius 0.5s ease-in-out infinite alternate;
  }
}
form-field {
  max-width: 50%;
}
@keyframes borderRadius {
  0% {
    border-radius: 0;
  }
  100% {
    border-radius: var(--corners);
  }
}
</style>
