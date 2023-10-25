<script setup>
const route = useRoute();

const article = useState("article", () => null);

const { data, error } = await useFetch(
  `/api/articles/article/${route.params.detail}`,
  {
    initialCache: true,
    async onResponse({ request, response, options }) {
      // Process the response data

      article.value = response._data;

      useSeoMeta({
        title: () => article.value.title,
        ogTitle: () => article.value.title,
        twitterTitle: () => article.value.title,
        ogType: () => "article",

        ogUrl: () => `https://ecosystem.api3.org/articles/${article.value._id}`,

        description: () => article.value.description,
        ogDescription: () => article.value.description,
        twitterDescription: () => article.value.description,

        image: () => article.value.cover,
        ogImage: () => article.value.cover,
        twitterImage: () => article.value.cover,

        ogArticlePublishedTime: () => article.value.date,

        twitterCard: "summary_large_image",
      });
    },
  }
);
</script>

<template>
  <SectionColumn innerClass="article">
    <div class="article-wrapper">
      <ArticleSide :toc="data?.content?.toc" :title="data?.title" />

      <ArticleHeader :article="data" />

      <picture class="cover" v-if="data?.cover">
        <img :src="article?.cover" alt="" />
      </picture>

      <ContentRendererMarkdown
        v-if="data?.content"
        :value="data?.content"
        tag="article"
        class="body"
      />
    </div>
  </SectionColumn>
</template>

<style lang="scss">
inner-column.article {
  display: grid;
  gap: var(--space-s);
  padding: var(--space-2xl) var(--space-l);
  align-items: start;
  position: relative;

  & > .article-wrapper {
    display: grid;
    column-gap: var(--space-s);
    grid-template-columns: repeat(12, 1fr);
    align-items: start;

    & > :not(aside, header) {
      grid-column: 1 / -1;
      @media (min-width: 768px) {
        grid-column: 4 / 11;
        //     padding: var(--space-l);
        //     gap: var(--space-l);
      }

      &.cover {
        height: 100%;
        aspect-ratio: 16/10;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @media (min-width: 768px) {
          grid-column: 3 / -1;
        }
      }
    }
  }

  article.body {
    h2 {
      margin-bottom: var(--space-m);
      margin-top: var(--space-2xl);
    }

    h3 {
      margin-bottom: var(--space-m);
      margin-top: var(--space-l);
    }
    ul {
      margin-top: var(--space-s);
      display: grid;
      gap: var(--space-2xs);

      li {
        position: relative;
        --space: 1.25rem;
        left: var(--space);
        &::before {
          content: "";
          width: 8px;
          height: 8px;

          position: absolute;
          left: calc(-1 * var(--space));
          top: 50%;
          transform: translateY(-50%);

          background: url("/assets/images/triangle.svg");
          background-size: cover;
          background-position: center;
        }
      }
    }

    p {
      margin-top: var(--space-s);

      &:has(img) {
        margin-top: var(--space-l);
      }

      &:has(> :is(a, code)) {
        overflow: scroll;
      }
    }

    li,
    p {
      letter-spacing: 0.02em;
    }

    figure {
      margin: var(--space-l) 0;
      display: grid;
      grid-template-columns: 3fr 1fr;
      gap: var(--space-s);
      justify-items: start;

      position: relative;

      &::after {
        position: absolute;
        inset: 0;

        content: "";
        z-index: 1;
      }
    }

    & > blockquote {
      margin: var(--space-l) 0;
      padding: var(--space-2xl);
      background: var(--gradient-dark);
      display: block;
      // max-width: 70ch;
      color: var(--ink);
      position: relative;
      border-radius: var(--corners);
      //   overflow: hidden;
      z-index: 1;

      p {
        margin: 0;
        padding: 0;
        font-style: italic;
      }
      blockquote {
        margin-top: var(--space-s);
        color: var(--green);
        text-align: right;
        font-style: normal;
      }

      &::before {
        content: "“";
        position: absolute;
        top: 1rem;
        left: 1rem;
        font-size: 10rem;
        color: var(--violet);
        z-index: -1;
        opacity: 0.5;
      }

      &::after {
        content: "";
        position: absolute;
        inset: calc(-1 * var(--line-width));
        z-index: -2;
        border-radius: calc(var(--corners) + 3rem);
      }
    }

    & > * {
      position: relative;
      --height: 0;

      &::before {
        content: "";
        height: var(--height);
        width: 2px;

        position: absolute;
        left: -2rem;
        top: 50%;
        transform: translateY(-50%);

        background: var(--gradient-color);
        border-radius: var(--corners);

        transition: 0.1s;
      }
    }
    .highlight {
      --height: 100%;
    }
  }
}
</style>
