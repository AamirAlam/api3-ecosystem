<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
definePageMeta({
  //   layout: "home",
  meta: [
    {
      hid: "home",
      name: "home",
    },
  ],
});

useSeoMeta({
  title: "API3 Ecosystem Home",
});

onMounted(() => {
  //   document.body.scrollTop = document.documentElement.scrollTop = 0;
  window.scroll({
    top: 0,
    left: 0,
  });

  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.defaults({
    // toggleActions: "restart reset restart none",
    //  scroller: "main.index",
    // markers: "true",
  });
});
</script>

<template>
  <HeroLanding />
  <!-- <ScrollingStats /> -->

  <MissionComponent />
  <section class="curves-wrapper">
    <picture class="curves-decoration-3">
      <CurvesDecoration3 />
    </picture>
  </section>

  <CallToAction />

  <SectionColumn class="home-article-grid">
    <h2 class="loud-voice">Articles</h2>
    <ArticleGrid layout="0" cardCount="4" />
    <NuxtLink class="text blue" to="/articles">See More</NuxtLink>
  </SectionColumn>

  <!-- <SiteFooter /> -->
</template>

<style lang="scss">
.home-article-grid {
  .loud-voice {
    text-align: center;
  }
  a.text {
    text-align: center;
    margin-top: var(--space-m);
  }
}

body:has(main.index) {
  @media (min-width: 1024px) {
    //  overflow: hidden;
  }
}
main.index {
  display: grid;
  gap: var(--space-xl);
  inner-column {
    //  padding: var(--space-xl) 15px;
  }
  inner-column > h2 {
    margin-bottom: var(--space-l);
  }
  @media (min-width: 768px) {
    gap: calc(var(--space-3xs) * 10);
  }
  @media (min-width: 1024px) {
    //  max-height: calc(100vh - 100px);
    //  overflow-y: scroll;
    //  scroll-snap-type: mandatory;
    //  scroll-snap-type: y mandatory;
    //  scroll-snap-points-y: repeat(calc(100vh - 100px));

    //  display: grid;

    & > section:not(.scrolling-stats) {
      // scroll-snap-align: start;
      // scroll-padding-top: 15rem;
      inner-column {
        //   height: calc(100vh - 100px);
      }
      // padding-bottom:var(--space-2xl) 0;
    }
    //  & > footer {
    //    scroll-snap-align: end;
    //    // scroll-padding-top: 15rem;
    //    inner-column {
    //      height: calc(50vh - 50px);
    //    }
    //  }
  }
}
</style>

<style scoped lang="scss">
.curves-wrapper {
  position: absolute;
  overflow-x: hidden;
  height: 80%;
  width: 100%;
  z-index: -10;

  picture.curves-decoration-3 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(10deg) scaleY(1.8);

    width: 500vw;
    //   display: none;

    @media (min-width: 768px) {
      display: block;
      top: 55%;
      left: 45%;
      transform: translate(-50%, -50%) scaleY(0.8);

      width: 200vw;
      z-index: -10;
    }

    @media (min-width: 1600px) {
      width: 100vw;
      transform: translate(-50%, -50%) scaleX(2);
    }

    //  display: none;
  }
}
</style>
