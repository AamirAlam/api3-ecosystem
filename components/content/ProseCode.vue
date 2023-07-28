<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    code?: string;
    language?: string | null;
    filename?: string | null;
    highlights?: Array<number>;
  }>(),
  { code: "", language: null, filename: null, highlights: [] }
);
</script>

<template>
  <div>
    <span>
      {{ language }}
    </span>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
div {
  position: relative;
  border-radius: var(--corners);
  margin: 2rem 0;
  padding: 2rem 1rem;
  background: var(--gradient-dark);
  overflow: hidden;
  span {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: var(--step--1);
    cursor: pointer;
  }

  :deep(code) {
    color: unset;
  }

  &:hover {
    overflow: visible;
  }
}
</style>
