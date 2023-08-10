<script setup>
const settings = ref([
  {
    name: "border",
    variable: "--border",
  },
  {
    name: "border-radius",
    variable: "--corners",
  },
  {
    name: "shadow",
    variable: "--shadow",
  },
  {
    name: "gradient-text-color",
    variable: ".gradient-text-color",
  },
  {
    name: "gradient-border",
    variable: ".gradient-border",
  },
]);
</script>

<template>
  <div class="misc-guide">
    <h2 class="attention-voice">Misc</h2>
    <p>
      These are the misc variables used in the app. They are defined in
      <code>settings.css</code> and are available as CSS variables which are
      used throughout the app.
    </p>
    <ul class="settings">
      <li v-for="setting in settings" :key="setting.name">
        <div :class="setting.name">
          <code>{{ setting.variable }}</code>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.misc-guide {
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
  div.border {
    border: var(--border);
  }
  div.border-radius {
    background: var(--color);
  }
  div.shadow {
    box-shadow: var(--shadow-lines);
  }
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
