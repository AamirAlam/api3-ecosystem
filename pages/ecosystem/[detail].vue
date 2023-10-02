<script setup>
import { gsap } from "gsap";
import { useInterfaceStore } from "~/stores/interface";

const route = useRoute();
const ui = useInterfaceStore();

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

const formattedProxies = computed(() => {
  if (!dapp.value?.proxies) {
    return [];
  }

  const formattedProxyItems = [];
  Object.keys(dapp.value?.proxies).forEach((chain) => {
    let chainItems = dapp.value?.proxies?.[chain]?.map((el) => {
      return { ...el, chainId: chain };
    });
    formattedProxyItems.push(...chainItems);
  });

  return formattedProxyItems;
});
</script>

<template>
  <article class="detail-page">
    <DetailBanner :dapp="dapp" />

    <SectionColumn class="detail-main">
      <article class="main">
        <ClientOnly>
          <PageTitle
            class="dapp-title"
            :heading="dapp?.name"
            innerClass="none"
            :voice="ui.isMobile ? 'attention-voice' : 'loud-voice'"
          >
            <picture class="logo">
              <img
                :src="dapp?.images?.logo"
                src="@/assets/images/background/square.jpg"
                alt=""
              />
            </picture>
          </PageTitle>
        </ClientOnly>
        <div class="launch-button">
          <NuxtLink
            :to="dapp?.links?.dapp"
            :target="`${dapp?.name}-app`"
            class="button"
          >
            Launch dApp
          </NuxtLink>
        </div>
        <DetailPanel :dapp="dapp" v-if="dapp" />
        <section class="about">
          <h2 class="attention-voice">About</h2>
          <p class="pre-line">
            {{ dapp?.description?.replace(/\/n/g, "\n") }}
          </p>

          <div class="actions">
            <NuxtLink
              :to="dapp?.links?.website"
              :target="`${dapp?.name}-website`"
              class="text green"
            >
              {{ dapp?.links?.website }}
            </NuxtLink>

            <ul class="socials">
              <li v-for="social in dapp?.links?.socials" :key="social.id">
                <a :href="social.url" :target="social.name">
                  <picture>
                    <SocialIcon :social="social.label" />
                  </picture>
                </a>
              </li>
            </ul>
          </div>
        </section>

        <DappProxies
          :proxies="formattedProxies"
          v-if="dapp?.productType != 'qrng'"
        />

        <DappScreenshots :dapp="dapp" />
      </article>
    </SectionColumn>
  </article>
</template>

<style lang="scss" scoped>
.dapp-title {
  :deep(inner-column) {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: flex-end;
    gap: var(--space-s);
  }

  .logo {
    border-radius: 50%;
    max-width: 100px;
  }
}

.detail-page,
.banner {
  opacity: 0;
}

article.main {
  display: grid;
  gap: var(--space-2xl);

  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr;
  }

  section:not(.about, .dapp-title) {
    grid-column: 1/-1;
    color: var(--gray-light);
  }

  section {
    align-self: start;
    display: grid;
    gap: calc(var(--space-s) * 1.2);

    p {
      line-height: 1.8;
      color: var(--gray-light);
    }
  }

  .about {
    grid-column: 1;
    color: var(--gray-light);

    .text.green {
      padding: 0;
    }
  }
}

.launch-button {
  display: flex;

  align-items: center;
  grid-row: 3;

  @media (min-width: 768px) {
    grid-column: 2;
    grid-row: 1;
    justify-content: flex-end;
  }
}
.pre-line {
  white-space: pre-line;
}

.socials {
  display: flex;
  gap: var(--space-s);

  align-items: center;
  picture {
    max-width: 24px;
  }
}
</style>
