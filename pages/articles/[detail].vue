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

// article.value.sections = article.value.sections.map((section, index) => {
//   return {
//     ...section,
//     isHighlighted: index === 0 ? true : false,
//   };
// });

// onMounted(() => {
//   const pageLoad = gsap.timeline();

//   pageLoad
//     .to("article", {
//       opacity: 1,
//       duration: 0,
//     })

//     .fromTo(
//       ["h1", "h2", "article-meta div, aside"],
//       {
//         x: "-5vw",
//         opacity: 0,
//         delay: "0.5",
//         duration: 0,
//       },
//       {
//         x: "0vw",
//         opacity: 1,
//         duration: 0.5,
//         stagger: {
//           each: 0.15,
//           from: "start",
//         },
//       },
//       "0"
//     )
//     .fromTo(
//       "h1",
//       {
//         "--before-width": "0",
//         duration: 0,
//       },
//       {
//         "--before-width": "50%",
//         duration: 0.5,
//       }
//     )
//     .fromTo(
//       ["article > section > *"],
//       {
//         y: "10vw",
//         opacity: 0,
//         duration: 0,
//       },
//       {
//         y: "0vw",
//         opacity: 1,
//         duration: 0.5,
//         stagger: {
//           each: 0.08,
//           from: "start",
//         },
//       },
//       "1"
//     );
// });
</script>

<template>
  <SectionColumn innerClass="article">
    <article>
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

      <!--

      <ArticleSection
        v-for="section in article.sections"
        :key="section.heading"
        :section="section"P
      />
      <ArticleRecommend :article="blog.list[0]" /> -->
    </article>
  </SectionColumn>
</template>

<style lang="scss">
inner-column.article {
  display: grid;
  gap: 1rem;
  padding: 5rem 2rem;
  align-items: start;
  position: relative;

  article.body {
    h2 {
      margin-bottom: 1.5rem;
      margin-top: 4rem;
    }

    h3 {
      margin-bottom: 1.5rem;
      margin-top: 2rem;
    }
    ul {
      margin-top: 1rem;
      display: grid;
      gap: 0.5rem;

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
      margin-top: 1rem;

      &:has(img) {
        margin-top: 2rem;
      }
    }

    li,
    p {
      letter-spacing: 0.02em;
    }

    figure {
      margin: 2rem 0;
      display: grid;
      grid-template-columns: 3fr 1fr;
      gap: 1rem;
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
      margin: 2rem 0;
      padding: 4rem;
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
        margin-top: 1rem;
        color: var(--color);
        text-align: right;
        font-style: normal;
      }

      &::before {
        content: "“";
        position: absolute;
        top: 1rem;
        left: 1rem;
        font-size: 10rem;
        color: var(--highlight);
        z-index: -1;
        opacity: 0.5;
      }

      &::after {
        content: "";
        position: absolute;
        inset: -1px;
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

  & > article {
    display: grid;
    column-gap: 1rem;
    grid-template-columns: repeat(12, 1fr);
    align-items: start;

    & > :not(aside, header) {
      grid-column: 1 / -1;
      @media (min-width: 768px) {
        grid-column: 4 / 11;
        //     padding: 2rem;
        //     gap: 2rem;
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
}
</style>
