<script setup>
import { useInterfaceStore } from "@/stores/interface";
import { gsap } from "gsap";

const ui = useInterfaceStore();

// const content = await queryContent("/home").findOne().heroLanding; #todo
console.log(ui.isMobile);
const titleClasses = computed(() =>
  ui.isMobile ? "attention-voice" : "loud-voice"
);

console.log(titleClasses.value);
onMounted(() => {
  //

  //hero landing on load animations
  const pageLoad = gsap.timeline({
    //  scrollTrigger: {
    //    trigger: "hero-landing",
    //  },
  });
});
</script>

<template>
  <SectionColumn class="hero-landing-section">
    <hero-landing>
      <text-content>
        <ClientOnly>
          <h1 class="page-title" :class="titleClasses">
            Connecting the <span>First-Party</span> Oracle Ecosystem
            <!-- {{ content.title }} -->
          </h1>
        </ClientOnly>

        <p class="calm-voice">
          Welcome to the API3 ecosystem a space for blockchain enthusiasts,
          developers, and visionaries from across the globe using API3 data
          feeds.
        </p>

        <button class="button">Join The Ecosystem</button>
      </text-content>
      <HeroCards />
    </hero-landing>
    <picture class="curves-decoration-2">
      <CurvesDecoration2 />
    </picture>
  </SectionColumn>
</template>

<style scoped lang="scss">
.hero-landing-section {
  position: relative;
  overflow-x: hidden;

  picture.curves-decoration-2 {
    position: absolute;
    top: 12.5%;
    left: 50%;
    transform: translate(-50%, -50%) scaleY(2);

    width: 200vw;
    z-index: -10;

    @media (min-width: 768px) {
      top: 45%;
      width: 150vw;
      transform: translate(-50%, -50%) scaleY(0.9);
    }

    //  display: none;
  }
}

hero-landing {
  //   opacity: 0;
  //   height: 80vh;
  display: grid;
  align-content: center;
  padding: var(--space-2xl) 0;

  gap: var(--space-2xl);

  text-content {
    display: grid;
    gap: var(--space-s);
    padding: var(--space-s);
    text-align: center;
    justify-items: center;

    .page-title {
      text-wrap: balance;

      span {
        white-space: nowrap;
      }
    }

    .button {
      margin-top: var(--space-m);
    }
  }
}
</style>
