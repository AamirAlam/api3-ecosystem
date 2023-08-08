<script setup>
const props = defineProps(["social", "fill", "stroke"]);

const capitalizedSocial =
  props.social[0].toUpperCase() + props.social.toLowerCase().slice(1);

const dynamicComponent = defineAsyncComponent(() =>
  import(`@/components/icons/socials/${capitalizedSocial}Icon.vue`)
);
</script>

<template>
  <Component
    :is="dynamicComponent"
    :style="`
   ${fill ? `fill: ${fill};` : 'fill: var(--gray);'}
	${stroke ? `stroke: ${stroke}; stroke-width: 0.1;` : 'stroke: none;'}

  `"
  />
</template>
