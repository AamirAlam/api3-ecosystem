<template>
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11 12H29" stroke="var(--ink)" stroke-linecap="round" />
    <path d="M11 20H29" stroke="var(--ink)" stroke-linecap="round" />
    <path d="M11 28H29" stroke="var(--ink)" stroke-linecap="round" />
  </svg>
</template>

<style scoped lang="scss">
path {
  stroke-width: 2px;

  @media (min-width: 768px) {
    stroke-width: 8px;
  }
}
</style>
