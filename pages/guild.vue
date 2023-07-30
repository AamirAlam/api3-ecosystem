<script setup>
import { watchNetwork } from "@wagmi/core";
import { gsap } from "gsap";

const selected = ref("");
const selectedProductId = ref(0);
const mintInfo = ref({ hash: null });

const { switchChain, isConnected, account } = useWeb3();
const { mintNft, isAlreadyMinted } = useMint();
const loading = ref(false);
const isMintChecking = ref(false);
const chainId = ref(null);
const isMinted = ref(false);

const unwatchNetwork = watchNetwork((network) => {
  chainId.value = network.chain.id;
});

const content = reactive({
  buttons: ["Developers", "DAO Members", "Testers"],
  unselectedHeading: "Select The NFT type to Mint",
  paragraph: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora quis
        nihil, sunt vitae labore nam fuga, vero adipisci minus blanditiis,
        inventore voluptatum dolor placeat corporis debitis ullam reiciendis
        distinctio quia.`,
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

watch(
  [selectedProductId, account],
  async ([pruductId, account], [prevProductId, prevAccount]) => {
    isMintChecking.value = true;

    const check = await isAlreadyMinted(pruductId, account);
    isMintChecking.value = false;
    isMinted.value = check;
  }
);

function animateHeading() {
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

const isPolygonChain = computed(() => chainId.value === 137);

const handleAction = async () => {
  if (!isConnected.value) {
    navigateTo("/login");
    return;
  }

  loading.value = true;

  if (chainId.value !== 137) {
    await switchChain(137);
    loading.value = false;
    return;
  }

  const mintData = await mintNft(selectedProductId.value, chainId);

  isMintChecking.value = true;

  const check = await isAlreadyMinted(selectedProductId.value, account.value);
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

  if (!isConnected.value) {
    return "Connect Wallet";
  }

  if (!isPolygonChain.value) {
    return "Switch to Polygon";
  }

  return "Mint it Now";
});
</script>

<template>
  <SectionColumn>
    <aside>
      <button
        class="text"
        v-for="(buttonText, index) in content.buttons"
        @click="buttonHandle($event, buttonText, index)"
      >
        {{ buttonText }}
      </button>
    </aside>
    <div class="panel" v-auto-animate>
      <h2 class="loud-voice">
        <template v-if="selected">
          Join the
          <span class="gradient-text">{{ selected }}</span> by minting this NFT
        </template>
        <template v-else>
          {{ content.unselectedHeading }}
        </template>
      </h2>

      <p>
        {{ content.paragraph }}
      </p>

      <Transition name="fade" mode="out-in" v-if="selected && !isMinted">
        <button class="loud-button" :disabled="loading" @click="handleAction">
          {{ buttonText }}
        </button>
      </Transition>

      <Transition name="fade" mode="out-in" v-if="selected && isMinted">
        <a
          href="https://opensea.io/collection/api3-guild"
          target="_blank"
          class=""
        >
          <span>
            {{ isMintChecking ? "Fetching NFT..." : "Visit OpenSea" }}
          </span>
          <picture class="external-link" v-if="link.external">
            <img src="@/assets/images/interface/diagonal-arrow.svg" alt="" />
          </picture>
        </a>
      </Transition>
    </div>
  </SectionColumn>
</template>

<style scoped lang="scss">
section {
  :deep(inner-column) {
    display: grid;
    gap: 3rem;

    height: 80vh;
    align-content: center;

    @media (min-width: 768px) {
      grid-template-columns: 0.3fr 1fr;
    }
  }

  aside {
    display: grid;
    align-content: center;
    gap: 3rem;
    text-align: left;
  }

  .panel {
    display: grid;
    gap: 3rem;

    place-content: center;
    text-align: center;

    button {
      justify-self: center;
    }
  }
}

.external-link {
  max-width: 10px;
}
</style>
