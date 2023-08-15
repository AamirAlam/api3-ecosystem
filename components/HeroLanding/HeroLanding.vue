<script setup>
import { useInterfaceStore } from "@/stores/interface";
import { gsap } from "gsap";

const ui = useInterfaceStore();

// const content = await queryContent("/home").findOne().heroLanding; #todo

onMounted(() => {
  const pageLoad = gsap.timeline({
    //  scrollTrigger: {
    //    trigger: "hero-landing",
    //  },
  });

  pageLoad.fromTo(
    "hero-landing .page-title",
    {
      delay: "0.5",
      duration: 0.5,
      y: 50,
      opacity: 0,
      ease: "power4.out",
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power4.out",
    }
  );

  pageLoad.from("hero-landing .intro-paragraph", {
    duration: 0.5,
    y: 50,
    opacity: 0,
    ease: "power4.out",
  });

  pageLoad
    .to(
      "hero-landing",
      {
        duration: 0.5,
        "--before-width": "100%",
        opacity: 1,
        ease: "power4.inOut",
      },
      "-=1"
    )
    .fromTo(
      "hero-landing",
      {
        "--after-height": "0",
      },

      {
        duration: 0.5,
        "--after-height": ui.isMobile ? "25%" : "50%",
        ease: "power4.in",
      },
      "-=0.5"
    );
  pageLoad.from("hero-landing hero-card", {
    duration: 0.5,
    x: 50,
    opacity: 0,
    ease: "power4.out",
    stagger: 0.2,
  });

  pageLoad.from(
    "hero-landing .line-decoration path",
    {
      duration: 0.5,
      scale: 0,
      transformOrigin: "bottom right",
      stagger: { each: 0.1, from: "random" },
      ease: "power4.out",
    },
    "-=1"
  );
});
</script>

<template>
  <SectionColumn>
    <hero-landing>
      <picture class="line-decoration decoration">
        <LineDecoration />
      </picture>
      <ClientOnly>
        <h1
          class="page-title gradient-text-color-light"
          :class="{ 'booming-voice': !ui.isMobile, 'loud-voice': ui.isMobile }"
        >
          Connecting the First-Party Oracle Ecosystem

          <!-- {{ content.title }} -->
        </h1>
      </ClientOnly>

      <div class="intro-paragraph">
        <!-- <picture>
          <LogoWithLines />
        </picture> -->
        <p class="notice-voice">
          Welcome to the API3 ecosystem a space for blockchain enthusiasts,
          developers, and visionaries from across the globe using API3 data
          feeds.
        </p>
      </div>
      <HeroCards />
      <picture class="hero-graphic" v-if="ui.heroImage && ui.isDesktop">
        <img :src="ui.heroImage" alt="" />
      </picture>
    </hero-landing>
  </SectionColumn>
</template>

<style scoped lang="scss">
.hero-graphic {
  position: absolute;
  top: 6rem;
  right: 150px;
  width: 400px;
  z-index: -1;
  //   filter: hue-rotate(96deg);
  opacity: 0.25;
}
hero-landing {
  display: grid;
  row-gap: 3rem;
  position: relative;
  //   overflow-x: hidden;

  @media (min-width: 768px) {
    row-gap: 5rem;

    grid-template-columns: repeat(12, 1fr);
    //  min-height: calc(100vh - 100px);
  }

  .line-decoration {
    position: absolute;
    top: -15px;
    right: -15px;
    scale: 0.6;
    transform-origin: top right;

    opacity: 0.5;
    @media (min-width: 768px) {
      scale: 1;
    }
  }

  .page-title {
    grid-column: 1 / -1;

    text-wrap: balance;

    @media (min-width: 1194px) {
      grid-column: 2 / -5;
    }
    grid-row: 1 / span 1;
    padding: 15px 0;
    align-self: center;
  }

  .intro-paragraph {
    grid-row: 2 / span 1;
    grid-column: 1 / -1;

    display: grid;
    gap: 0.5rem;
    align-content: start;

    @media (min-width: 768px) {
      /* grid-column: 1 / -7;
     grid-template-columns: 0.1fr 1fr; */

      gap: 2rem;
    }
    @media (min-width: 1194px) {
      grid-template-columns: inherit;
      p {
        grid-column: 2 / -1;
      }
    }

    picture {
      max-width: 50px;
      height: 100%;
      display: grid;
      justify-content: center;

      @media (min-width: 768px) {
        max-width: 200px;
      }

      svg {
        width: 105px;
      }
    }

    .notice-voice {
      font-size: var(--step-0);
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: -1px;
    left: 0;

    width: var(--before-width);
    height: 1px;

    background: var(--color);
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;

    width: 1px;
    background: var(--gradient-color);

    height: var(--after-height);
    @media (min-width: 768px) {
      height: var(--after-height);
    }
  }
}

hero-landing {
  opacity: 0;
}
</style>
