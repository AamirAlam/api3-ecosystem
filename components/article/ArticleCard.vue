<script setup>
import slug from "slug";
import { gsap } from "gsap";
const props = defineProps(["article"]);

onMounted(() => {
  const pageLoad = gsap.timeline();
  pageLoad.fromTo(
    "article-card",
    {
      y: "10vw",
      opacity: 0,
      duration: 0,
      delay: "0.5",
    },
    {
      y: "0vw",
      opacity: 1,
      duration: 0.5,
      stagger: {
        each: 0.15,
        from: "start",
      },
    }
  );
});
</script>

<template>
  <article-card>
    <picture>
      <img :src="article?.cover ?? '/images/article-placeholder.jpg'" />
    </picture>
    <text-content>
      <h3 class="firm-voice">
        {{ article.title }}
      </h3>
      <h4 class="whisper-voice">
        {{ article.author.name }}
      </h4>

      <NuxtLink :to="`/articles/${slug(article?.title)}`" class="text">
        Read more
      </NuxtLink>
    </text-content>
  </article-card>
</template>

<style scoped lang="scss">
article-card {
  display: grid;
  border-radius: var(--corners);
  overflow: hidden;
  position: relative;
  background: var(--gradient-dark);

  --decoration-size: 100px;

  &::before,
  &::after {
    content: "";
    position: absolute;
    background: var(--gradient-dark);
    z-index: 1;

    bottom: -0.5rem;
    right: -0.5rem;

    width: var(--decoration-size);
    height: var(--line-width);
  }

  &::after {
    width: var(--line-width);
    height: var(--decoration-size);
  }

  a.text {
    padding-left: 0;
  }

  text-content {
    padding: 1rem;

    .firm-voice {
      font-size: var(--step-0);
      margin-bottom: 0.5rem;
    }

    .calm-voice {
      font-size: var(--step--1);
      margin-top: 0.5rem;
    }
  }
  &.card {
    grid-column: 1/-1;
    @media (min-width: 768px) {
      grid-column: span 4;
    }
  }

  &.slide {
    grid-template-columns: 1fr 0.5fr;
    gap: 1rem;

    align-items: center;
    min-height: 150px;

    grid-column: 1/-1;

    @media (min-width: 768px) {
      grid-column: span 6;
    }

    picture {
      order: 2;
      height: 100%;
      aspect-ratio: 16/9;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
      }
    }
  }
  &.text {
    @media (min-width: 840px) {
      grid-column: span 3;
    }

    @media (min-width: 1350px) {
      grid-column: span 2;
    }
    align-items: center;
    min-height: 150px;

    picture {
      display: none;
    }
  }

  &.big-card {
    grid-column: 1/-1;

    picture {
      height: 100%;
      aspect-ratio: 16/9;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    @media (min-width: 768px) {
      grid-column: span 6;
      grid-row: span 3;
    }

    text-content {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;

      padding-top: 50px;
      background: linear-gradient(
        0deg,
        hsla(0, 0%, 1%, 0.7) 70%,
        hsla(0, 0%, 1%, 0) 100%
      );
    }
  }
}
</style>
