<script setup>
const props = defineProps(["social", "fill"]);

const capitalizedSocial =
  props.social[0].toUpperCase() + props.social.toLowerCase().slice(1);

console.log(capitalizedSocial);

const dynamicComponent = defineAsyncComponent(() =>
  import(`@/components/icons/socials/${capitalizedSocial}Icon.vue`)
);
</script>

<template>
  <Component
    :is="dynamicComponent"
    :style="`
   ${fill ? `fill: ${fill};` : 'fill: #81838C'}
  `"
  />
</template>
