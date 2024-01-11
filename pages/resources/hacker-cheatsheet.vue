<script setup>
const content = await queryContent("resources/cheatsheet").findOne();

definePageMeta({
  layout: "footer-less",
});

useSeoMeta({
  title: content.meta.title,
  ogTitle: content.meta.title,
  twitterTitle: content.meta.title,

  description: content.meta.description,
  ogDescription: content.meta.description,
  twitterDescription: content.meta.description,

  //   image: content.meta.image,
  //   ogImage: content.meta.image,
  //   twitterImage: content.meta.image,

  ogUrl: content.meta.url,
  twitterUrl: content.meta.url,

  ogType: content.meta.type,
  twitterType: content.meta.type,
});
</script>

<template>
  <main>
    <SectionColumn>
      <article class="infographic">
        <header>
          <h1 class="attention-voice">
            {{ content.header.title }}
          </h1>

          <div class="card">
            <p class="solid-voice gradient-text-color">
              {{ content.header.subtitle }}
            </p>
          </div>
          <div class="card">
            <p class="solid-voice gradient-text">
              {{ content.header.tag }}
            </p>
          </div>
        </header>
        <p class="notice-voice intro">
          {{ content.introPara }}
        </p>

        <div class="left">
          <template v-for="card in content.left.qrCards">
            <div class="qr-card" :class="{ reverse: card.reverse }">
              <text-content>
                <h3 class="teaser-voice">{{ card.title }}</h3>
                <p class="notice-voice">
                  {{ card.description }}
                </p>
              </text-content>

              <picture class="qr-code" :class="{ reverse: card.reverse }">
                <img :src="card.image" />
                <NuxtLink :target="card.link" :to="card.link" />
              </picture>
            </div>
          </template>

          <ol>
            <h3 class="firm-voice">
              {{ content.left.gettingStarted.heading }}
            </h3>
            <li
              v-for="(item, index) in content.left.gettingStarted.list"
              :data-list-number="index + 1"
              :key="index"
            >
              {{ item }}
            </li>
          </ol>
        </div>
      </article>
    </SectionColumn>
  </main>
</template>

<style scoped lang="scss">
article {
  display: grid;
  row-gap: var(--space-xl);
  align-items: start;

  @media (min-width: 768px) {
    grid-template-columns: 1fr;
  }

  & > div {
    display: grid;
    gap: var(--space-2xl);
  }

  p.notice-voice.intro {
    color: var(--ink);
  }
}

text-content {
  display: grid;
  //   gap: var(--space-xs);
}

header {
  grid-column: 1/-1;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  gap: var(--space-2xs);
  align-items: center;

  .card {
    padding: var(--space-s);
    border-radius: var(--corners);
    border: var(--border);
    min-width: 100px;
    color: transparent;
    background: var(--paper);
  }
}

.qr-card {
  display: flex;

  gap: var(--space-s);
  align-items: center;
  justify-content: space-between;

  &.reverse {
    //  grid-template-columns: 0.4fr 0.8fr;
    flex-direction: row-reverse;
  }

  & > *:nth-of-type(1) {
    flex-basis: 60%;
  }

  & > *:nth-of-type(2) {
    flex-basis: 40%;
  }

  h3 + p {
    margin-top: 0;
  }
}

picture.qr-code {
  aspect-ratio: 1;
  max-width: 250px;

  position: relative;

  a {
    position: absolute;
    inset: 0;
    z-index: 1;
  }
}

:deep(blockquote) {
  max-width: unset;
}

ol {
  display: grid;
  gap: var(--space-s);
  background: var(--gradient-dark);
  padding: var(--space-m);
  border-bottom-left-radius: calc(var(--corners) * 4);
  overflow-x: hidden;

  @media (min-width: 768px) {
    padding: var(--space-xl);
  }

  li {
    position: relative;
    left: var(--left, 50px);
    max-width: calc(100% - var(--left));
    color: var(--ink);

    @media (min-width: 768px) {
      font-size: var(--step-1);

      --left: 70px;
    }

    &::before {
      content: attr(data-list-number);
      position: absolute;
      clip-path: polygon(50% 0%, 0 80%, 100% 80%);
      background: var(--green);
      padding: var(--space-s);
      // border-radius: 50%;
      aspect-ratio: 1;
      text-align: center;
      color: var(--paper);
      font-size: 16px;
      left: calc(-1 * var(--left, 50px));

      top: 50%;
      transform: translateY(-50%);
      font-weight: var(--weight-heavy);
      line-height: 0.8;
    }
  }
}
</style>
