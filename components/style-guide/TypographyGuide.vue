<script setup>
const fonts = ref(["--font"]);

const fontWeights = ref(["light", "medium", "semibold"]);

const fontSizes = ref([
  "step--2",
  "step--1",
  "step-0",
  "step-1",
  "step-2",
  "step-3",
  "step-4",
  "step-5",
]);
</script>

<template>
  <h2 class="attention-voice">Typography</h2>
  <ul>
    <li>
      <voice-card>
        <h3>Font Families</h3>
        <ul>
          <li v-for="font in fonts">
            <p :style="{ fontFamily: `var(${font})` }">{{ font }}</p>
          </li>
        </ul>
      </voice-card>
    </li>
    <li>
      <voice-card>
        <h3>Font Weights</h3>
        <ul>
          <li v-for="weight in fontWeights">
            <p :style="weight">{{ weight }}</p>
          </li>
        </ul>
      </voice-card>
    </li>
    <li>
      <voice-card>
        <h3>Font Sizes</h3>
        <ul>
          <li v-for="size in fontSizes">
            <p :style="size">{{ size }}</p>
          </li>
        </ul>
      </voice-card>
    </li>
  </ul>
</template>
