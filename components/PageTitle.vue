<script setup>
import { gsap } from "gsap";
const props = defineProps(["heading", "voice", "innerClass"]);

onMounted(() => {
  const pageLoad = gsap.timeline();

  pageLoad.fromTo(
    ".page-title",
    {
      y: 50,
      opacity: 0,
      duration: 0,
      delay: "0.5",
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power4.out",
    }
  );
});
</script>

<template>
  <SectionColumn :innerClass="'page-title ' + innerClass">
    <h1 :class="voice ? voice : 'loud-voice'">
      {{ heading }}
    </h1>
    <slot />
  </SectionColumn>
</template>

<style scoped lang="scss">
.page-title {
  display: grid;
  justify-content: start;
  padding: var(--space-2xl) 15px;

  //   opacity: 0;

  @media (min-width: 768px) {
    margin-top: var(--space-l);
  }
}

main.ecosystem-detail .page-title {
  padding: var(--space-xl) 0px;
}
</style>
