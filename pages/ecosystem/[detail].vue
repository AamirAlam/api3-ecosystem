<script setup>
import { gsap } from "gsap";

const route = useRoute();

const { data: dapp, error } = await useFetch(
  `/api/projects/project/${route.params.detail}`,
  {
    initialCache: true,
    onResponse({ request, response, options }) {
      // Process the response data

      const dapp = response._data;

      useSeoMeta({
        title: () => dapp.name,
        ogTitle: () => dapp.name,
        twitterTitle: () => dapp.name,

        ogType: () => "article",
        ogUrl: () => `https://ecosystem.api3.org/ecosystem/${dapp._id}`,
        ogArticlePublishedTime: () => dapp.year,

        description: () => dapp.tagline,
        ogDescription: () => dapp.tagline,
        twitterDescription: () => dapp.tagline,

        image: () => dapp.images?.cover,
        ogImage: () => dapp.images?.cover,
        twitterImage: () => dapp.images?.cover,

        twitterCard: "summary_large_image",
      });
    },
  }
);

onMounted(() => {
  const pageLoad = gsap.timeline();

  pageLoad.to(".detail-page", { opacity: 1, duration: 0 }).fromTo(
    [
      ".detail-page .banner",
      "aside > *",
      ".detail-page detail-content section",
    ],
    {
      delay: "0.5",
      y: "10vw",
      opacity: 0,
      duration: 0,
    },
    {
      y: "0vw",
      opacity: 1,
      duration: 0.5,
      stagger: {
        each: 0.2,
        from: "start",
      },
    }
  );
});

const formattedProxies = (dappData) => {
  if (!dappData?.proxies) {
    return [];
  }

  const formattedProxyItems = [];
  Object.keys(dappData?.proxies).forEach((chain) => {
    let chainItems = dappData?.proxies?.[chain]?.map((el) => {
      return { ...el, chainId: chain };
    });
    formattedProxyItems.push(...chainItems);
  });

  return formattedProxyItems;
};
</script>

<template>
  <article class="detail-page">
    <DetailBanner :dapp="dapp" />

    <SectionColumn class="detail-main">
      <article class="main">
        <PageTitle
          class="dapp-title"
          :heading="dapp?.name"
          innerClass="none"
          voice="loud-voice"
        />

        <DetailPanel :dapp="dapp" v-if="dapp" />
        <detail-content>
          <section class="about">
            <h2 class="attention-voice">About</h2>
            <p class="pre-line">
              {{ dapp?.description?.replace(/\/n/g, "\n") }}
            </p>
          </section>

          <DappProxies
            :proxies="formattedProxies(dapp)"
            v-if="dapp.productType != 'qrng'"
          />

          <DappScreenshots :dapp="dapp" />
        </detail-content>
      </article>
    </SectionColumn>
  </article>
</template>

<style lang="scss" scoped>
.detail-page,
.banner {
  opacity: 0;
}

article.main {
  display: grid;
  gap: var(--space-2xl);
  align-items: start;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 2fr;
  }
}

article.main detail-content {
  display: grid;
  gap: var(--space-2xl);
  //   grid-column: 2;
  //   grid-row: 2;

  section {
    align-self: start;
    display: grid;
    gap: calc(var(--space-s) * 1.2);

    p {
      line-height: 1.8;
      color: var(--gray);
    }
  }
}

.pre-line {
  white-space: pre-line;
}

:deep(.dapp-title) {
  grid-column: 1/-1;
}
</style>
