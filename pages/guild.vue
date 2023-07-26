<script setup>
const selected = ref("");

const content = reactive({
  buttons: ["Testers", "DAO Members", "Developers"],
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
      <h2 class="loud-voice">
        Join the <span class="gradient-text">{{ selected }}</span> by minting
        this NFT
      </h2>
      <button class="button text">Mint</button>
    </div>
  </SectionColumn>
</template>

<style scoped lang="scss">
section {
  :deep(inner-column) {
    display: grid;
    gap: 3rem;

    height: 80vh;

    @media (min-width: 768px) {
      grid-template-columns: 0.5fr 1fr;
    }
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
