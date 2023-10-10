<script setup>
import { useInterfaceStore } from "@/stores/interface";
import { useEcosystemStore } from "@/stores/ecosystem";

const ui = useInterfaceStore();
const ecosystem = useEcosystemStore();
</script>

<template>
  <div class="actions">
    <button
      class="text filter"
      @click="ui.toggleModal"
      :class="!ui.isMobile ? 'whisper-voice' : ''"
    >
      <picture>
        <img src="@/assets/images/interface/filter.svg" alt="" />
      </picture>
      <span v-if="!ecosystem.isFilterApplied"> Filters </span>
      <span v-else> Showing {{ ecosystem?.list?.length }} dApps </span>
    </button>
    <button
      class="text green"
      :class="{ disabled: !ecosystem.isFilterApplied }"
      @click="ecosystem.clearFilters"
    >
      <span :class="!ui.isMobile ? 'whisper-voice' : ''"> Clear all </span>
    </button>
  </div>
</template>

<style scoped lang="scss">
.actions {
  border-top: var(--border-dark);
  border-bottom: var(--border-dark);

  padding: var(--space-2xs);

  button {
    white-space: nowrap;
  }
  button.filter {
    display: flex;
    align-items: center;
    gap: var(--space-2xs);
  }
}
</style>
