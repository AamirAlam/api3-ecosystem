<script setup>
import { useInterfaceStore } from "~/stores/interface";

const props = defineProps(["heading", "paragraph", "cta", "link", "image"]);

const ui = useInterfaceStore();

const titleClasses = computed(() =>
  ui.isMobile ? "attention-voice" : "loud-voice"
);
</script>

<template>
  <graphic-text>
    <text-content>
      <ClientOnly>
        <picture v-if="ui.isMobile">
          <img :src="image" alt="" />
        </picture>
        <h3 :class="titleClasses">
          {{ heading }}
        </h3>
      </ClientOnly>
      <p class="calm-voice">
        {{ paragraph }}
      </p>

      <NuxtLink class="text" :to="link" v-if="link && cta">
        {{ cta }}
      </NuxtLink>
    </text-content>

    <picture v-if="!ui.isMobile">
      <img :src="image" alt="" />
    </picture>
  </graphic-text>
</template>

<style scoped lang="scss">
graphic-text {
  display: grid;
  align-items: center;
  gap: var(--space-l);

  grid-template-columns: repeat(auto-fit, minmax(min(400px, 100%), 1fr));

  picture {
    max-width: 80%;
  }
}

text-content {
  display: grid;
  grid-template-columns: 0.2fr 1fr;

  p {
    grid-column: 1/-1;
  }

  @media (min-width: 768px) {
    grid-template-columns: unset;
  }
}

graphic-text.reverse {
  text-content {
    @media (min-width: 768px) {
      order: 2;
    }
  }
}
</style>
