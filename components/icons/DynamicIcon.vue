<script setup>
import slug from "slug";

const props = defineProps(["icon", "fill", "stroke"]);

const capitalizedIcon =
  props.icon[0].toUpperCase() + props.icon.toLowerCase().slice(1);

const dynamicComponent = defineAsyncComponent(() =>
  import(`@/components/icons/${capitalizedIcon}Icon.vue`)
);
</script>

<template>
  <picture>
    <Component
      :is="dynamicComponent"
      :style="`
   ${fill ? `fill: ${fill};` : 'fill: var(--gray);'}
	${
    stroke
      ? `stroke: ${stroke}; stroke-width: var(--line-width);`
      : 'stroke: none;'
  }

  `"
    />
  </picture>
</template>

<style scoped>
picture {
  filter: hue-rotate(var(--hue-rotate));
}
</style>

<style scoped>
:deep(path, rect, circle, polygon, polyline, line) {
  vector-effect: none;
}
</style>
