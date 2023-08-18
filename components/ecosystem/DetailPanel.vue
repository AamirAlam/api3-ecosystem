<script setup>
import { useEcosystemStore } from "@/stores/ecosystem";

const props = defineProps(["dapp"]);
const ecosystem = useEcosystemStore();

const upvotes = ref(0);
const showShareBox = ref(false);
const loading = ref(false);

const { verifyWallet } = useSiwe();
const { submitUpvote } = useHttpCalls();
const web3Store = useWeb3Store();

const handleShare = async () => {
  showShareBox.value = !showShareBox.value;
};

const handleUpvote = async () => {
  if (!web3Store.state?.isConnected) {
    web3Store.func?.openModal();
    return;
  }

  loading.value = true;
  const { success: verificationSuccess, data: verificationData } =
    await verifyWallet();

  if (!verificationSuccess) {
    loading.value = false;

    return;
  }

  loading.value = true;

  const payload = {};
  const submitResult = await submitUpvote(
    props.dapp?._id,
    payload,
    verificationData?.token
  );
  if (submitResult.success) {
    upvotes.value += 1;
  }

  loading.value = false;
};

onMounted(() => {
  upvotes.value = !props?.dapp?.upvotes ? 0 : props?.dapp?.upvotes;
});
</script>

<template>
  <aside class="panel">
    <header class="panel-header">
      <picture class="logo">
        <img
          :src="dapp?.images?.logo"
          src="@/assets/images/square.jpg"
          alt=""
        />
      </picture>
      <h2 class="teaser-voice">
        {{ dapp.tagline }}
      </h2>
    </header>
    <article class="rows">
      <!-- <div class="row status">
        <p>Status</p>
        <p>{{ dapp.status ? "Live" : "Beta" }}</p>
      </div> -->

      <div class="row chain">
        <p>Chain</p>
        <ul>
          <li v-for="chain in dapp.chains" :key="chain.id">
            <!-- {{ chain }} -->
            <picture class="chain">
              <ChainIcon
                :chain="ecosystem.chainNames(chain)"
                fill="var(--color)"
                stroke="var(--paper)"
                strokeWidth="var(--line-width)"
              />
            </picture>
          </li>
        </ul>
      </div>

      <div class="year row">
        <p>Year</p>
        <p>{{ dapp.year }}</p>
      </div>

      <div class="row category-list">
        <p>Category</p>
        <ul>
          <li v-for="category in dapp.categories" :key="category">
            <DynamicIcon :icon="category" />
            {{ ecosystem.categoryToLabel?.[category] }}
          </li>
        </ul>
      </div>

      <div class="row product-list">
        <p>Product</p>
        <ul>
          <li>
            <DynamicIcon :icon="dapp.productType" />
            {{ ecosystem?.productTypeToLabel?.[dapp.productType] }}
          </li>
        </ul>
      </div>

      <div class="row socials">
        <p>Socials</p>
        <ul>
          <li v-for="social in dapp.links.socials" :key="social.id">
            <a :href="social.url" :target="social.name">
              <picture>
                <SocialIcon :social="social.label" />
              </picture>
            </a>
          </li>
        </ul>
      </div>
    </article>

    <div class="actions">
      <NuxtLink
        :to="dapp.links?.website"
        :target="`${dapp.name}-website`"
        class="button"
      >
        Website
      </NuxtLink>
      <!-- Launch dapp -->
      <NuxtLink
        :to="dapp.links.dapp"
        :target="`${dapp?.name}-app`"
        class="button"
        >Launch</NuxtLink
      >
      <button class="button" :disabled="loading" @click="handleUpvote">
        <span v-if="!loading"> Upvote ({{ upvotes }}) </span>
        <span v-else> Upvoting... </span>
      </button>

      <button class="button share-button" @click="handleShare">Share</button>

      <ModalSlot
        :showModal="showShareBox"
        @toggle="showShareBox = !showShareBox"
      >
        <ShareComponent :dappLinks="dapp.links" />
      </ModalSlot>
    </div>
  </aside>
</template>
<style lang="scss" scoped>
aside {
  display: grid;
  grid-column: 1 / 1;
  gap: 3rem;

  .panel-header {
    display: grid;
    justify-items: center;
    gap: 1rem;

    h2 {
      text-align: center;
    }
  }

  div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    padding: 1rem 0;
    align-items: center;
  }
  div.row {
    border-bottom: var(--border-dark);
    li {
      display: flex;
      align-items: center;
      gap: 0.25rem;

      :deep(picture) {
        max-width: 1.25rem;
      }
    }
  }
}

.chain {
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 1rem;

    picture.chain {
      aspect-ratio: 1/1;
    }
  }
}
.socials {
  ul {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr 1fr 1fr;

    align-items: center;
  }
}

.logo {
  border-radius: 50%;
  max-width: 100px;
}
</style>
