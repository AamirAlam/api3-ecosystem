<script setup>
const selected = ref("");

const content = reactive({
  buttons: ["Testers", "DAO Members", "Developers"],
  panelHeading: computed(
    () => `Join the ${selected.value} by minting this NFT`
  ),
});
</script>

<template>
  <SectionColumn>
    <aside>
      <button
        class="loud-button"
        v-for="buttonText in content.buttons"
        @click="selected = buttonText"
      >
        {{ buttonText }}
      </button>
    </aside>
    <div class="panel">
      <h1 class="loud-voice">{{ content.panelHeading }}</h1>
      <button class="button text">Mint</button>
    </div>
  </SectionColumn>
</template>

<style scoped lang="scss">
section {
  :deep(inner-column) {
    display: grid;
    gap: 3rem;
    grid-template-columns: 0.5fr 1fr;
    height: 80vh;
  }

  aside {
    display: grid;
    align-content: center;
    gap: 3rem;
  }

  .panel {
    display: grid;
    gap: 3rem;

    place-content: center;
    text-align: center;
  }
}
</style>
