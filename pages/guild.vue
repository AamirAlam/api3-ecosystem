<script setup>
import { watchNetwork } from "@wagmi/core";
import { gsap } from "gsap";

const web3Store = useWeb3Store();
const ui = useInterfaceStore();

const selected = ref("");
const selectedProductId = ref(null);
const mintInfo = ref({ hash: null });

const loading = ref(false);
const isMintChecking = ref(false);
const chainId = ref(null);
const isMinted = ref(false);

const content = reactive({
  buttons: ["Developers", "DAO Members", "Testers"],
  unselectedHeading: "Select The NFT type to Mint",
  paragraph: ``,
});

function buttonHandle(event, text, index) {
  selected.value = text;

  selectedProductId.value = index;

  const buttons = document.querySelectorAll("aside button");

  buttons.forEach((button, i) => {
    if (i !== index) {
      button.style.setProperty("--underline-width", 0);
    }
  });

  event.target.style.setProperty("--underline-width", "100%");

  animateHeading();
}

function animateHeading() {
  if (!selected.value) {
    gsap.fromTo(
      "div.panel",
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power4.out",
      }
    );
  } else {
    gsap.fromTo(
      "div.panel h2",
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power4.out",
      }
    );
  }
}

watch(selectedProductId, async (productId, prevProductId) => {
  if (productId === undefined) {
    return;
  }

  isMintChecking.value = true;
  const check = await web3Store.func?.isAlreadyMinted(
    productId,
    web3Store.state.account
  );
  isMintChecking.value = false;
  isMinted.value = check;
});

const isPolygonChain = computed(() => chainId.value === 137);

const handleAction = async () => {
  if (!web3Store?.state?.isConnected) {
    web3Store.func.openModal();
    return;
  }

  loading.value = true;

  if (chainId.value !== 137) {
    await web3Store.func.switchChain(137);
    loading.value = false;
    return;
  }

  const mintData = await web3Store.func?.mintNft(
    selectedProductId.value,
    chainId
  );

  isMintChecking.value = true;

  const check = await web3Store.func?.isAlreadyMinted(
    selectedProductId.value,
    web3Store.state.account
  );
  isMintChecking.value = false;
  isMinted.value = check;

  mintInfo.value.hash = mintData?.data?.blockHash;

  loading.value = false;
};

const buttonText = computed(() => {
  if (loading.value && !isPolygonChain.value) {
    return "Switching...";
  }

  if (loading.value) {
    return "Minting...";
  }

  if (!web3Store?.state?.isConnected) {
    return "Connect Wallet";
  }

  if (!isPolygonChain.value) {
    return "Switch to Polygon";
  }

  return "Mint it Now";
});

onMounted(() => {
  const {} = useMint();

  watchNetwork((network) => {
    chainId.value = network?.chain?.id;
  });
});
</script>

<template>
  <SectionColumn>
    <aside>
      <h1 class="firm-voice">
        {{ content.unselectedHeading }}
      </h1>
      <div class="actions">
        <button
          class="text green hover-underline"
          v-for="(buttonText, index) in content.buttons"
          @click="buttonHandle($event, buttonText, index)"
        >
          {{ buttonText }}
        </button>
      </div>
    </aside>
    <div class="panel">
      <h2 class="loud-voice">
        <template v-if="selected">
          Join the
          <span class="gradient-text-color">{{ selected }}</span> by minting
          this NFT
        </template>
        <template v-else>
          {{ content.unselectedHeading }}
        </template>
      </h2>

      <p v-if="content.paragraph">
        {{ content.paragraph }}
      </p>

      <Transition name="fade" mode="out-in" v-if="selected && !isMinted">
        <button class="button" :disabled="loading" @click="handleAction">
          {{ buttonText }}
        </button>
      </Transition>

      <Transition name="fade" mode="out-in" v-if="selected && isMinted">
        <button class="button" :disabled="loading">
          <a
            href="https://opensea.io/collection/api3-guild"
            target="_blank"
            class="group"
          >
            <span>
              {{ isMintChecking ? "Fetching NFT..." : "Visit OpenSea" }}
            </span>
            <picture class="external-link" v-if="!isMintChecking">
              <img src="@/assets/images/interface/diagonal-arrow.svg" alt="" />
            </picture>
          </a>
        </button>
      </Transition>
    </div>
  </SectionColumn>
</template>

<style scoped lang="scss">
section:not(.heading) {
  :deep(inner-column) {
    display: grid;
    gap: var(--space-xl);

    min-height: 80vh;
    align-content: center;

    @media (min-width: 1024px) {
      grid-template-columns: 0.6fr 1fr;
    }
  }

  aside {
    display: grid;
    align-content: center;
    gap: var(--space-m);
    //  order: 2;

    div.actions {
      @media (min-width: 1024px) {
        display: grid;
      }
    }

    button.text {
      text-align: left;

      @media (max-width: 420px) {
        font-size: var(--step--1);
      }
    }
  }

  .panel {
    display: grid;
    gap: var(--space-xl);

    place-content: center;
    text-align: center;

    h2 {
      opacity: 0;
      text-wrap: balance;

      span {
        white-space: nowrap;
      }

      @media (max-width: 420px) {
        --font-size: var(--step-2);
      }
    }

    button {
      justify-self: center;
    }
  }
}

.external-link {
  max-width: 10px;
  margin-left: var(--space-2xs);
}
.group {
  display: flex;
  align-items: center;
}
</style>
