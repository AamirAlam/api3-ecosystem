<script setup>
import Multiselect from "@vueform/multiselect";
import { useEcosystemStore } from "@/stores/ecosystem";

const ecosystem = useEcosystemStore();

const props = defineProps(["dappForm"]);
props.dappForm.proxies = props.dappForm.proxies ?? [];

const loading = ref(false);
const message = ref("");

async function handleUpdateProxy() {
  message.value = "";
  loading.value = false;

  if (!props.dappForm?.proxyAddress) {
    message.value = "Please add valid proxy address!";
    return;
  }

  if (!props.dappForm?.proxyChain) {
    message.value = "Please select proxy chain!";
    return;
  }

  if (!props.dappForm?.feedName) {
    message.value = "Please select feed name!";
    return;
  }

  loading.value = true;
  try {
    const info = await fetchProxyInformation(
      props.dappForm?.proxyAddress,
      parseInt(props.dappForm?.proxyChain),
      props.dappForm?.feedName
    );

    const finalProxyEntry = {
      proxyAddress: props.dappForm?.proxyAddress,
      isOEV: info?.isOev,
      chainId: props.dappForm?.proxyChain,
      proxyType: info?.type,
      datafeedId: info?.dataFeedId,
      feedName: props.dappForm?.feedName,
      dapiNameHash: info?.dapiNameHash,
      api3ServerV1: info?.api3ServerV1,
      oevBeneficiary: info?.oevBeneficiary,
    };

    const index = props.dappForm?.proxies?.findIndex(
      (el) => el?.proxyAddress === finalProxyEntry.proxyAddress
    );

    if (index >= 0) {
      message.value = "Proxy already added!";
      return;
    }

    props.dappForm?.proxies?.push(finalProxyEntry);
    props.dappForm.proxyChain = null;
    props.dappForm.proxyAddress = "";
  } catch (error) {
    message.value = "Unable fetch proxy info! Incorrect input";
  } finally {
    loading.value = false;
  }
}

const buttonClick = ref(false);
</script>

<template>
  <FormKit
    type="group"
    #default="{ state: { valid } }"
    v-auto-animate
    name="proxy"
  >
    <div class="proxy-step">
      <div class="proxy-form grid-item" v-auto-animate>
        <form-field>
          <FormKit
            type="text"
            label="Proxy address"
            label-class="$reset notice-voice"
            name="proxyAddress"
            validation="optional"
            id="proxyAddress"
            help="You can get proxy address from market.api3.org"
            v-model="dappForm.proxyAddress"
          />
        </form-field>

        <form-field>
          <label class="notice-voice" for="proxy-chain"> Proxy chain </label>
          <Multiselect
            id="proxy-chain"
            v-model="dappForm.proxyChain"
            mode="single"
            :close-on-select="true"
            :searchable="true"
            :create-option="false"
            :options="ecosystem.chainOptions"
            :classes="{
              singleLabelText: 'calm-voice multiselect-single-label-text',
              dropdown: 'calm-voice multiselect-dropdown',
              search: 'calm-voice multiselect-search',
            }"
          />
        </form-field>

        <form-field class="feed-option">
          <label class="notice-voice" for="feed-name"> Proxy feed name </label>
          <Multiselect
            id="feed-name"
            v-model="dappForm.feedName"
            mode="single"
            :close-on-select="true"
            :searchable="true"
            :create-option="false"
            :options="ecosystem.feedNameOptions"
            :classes="{
              singleLabelText: 'calm-voice multiselect-single-label-text',
              search: 'calm-voice multiselect-search',
              dropdown: 'calm-voice multiselect-dropdown',
            }"
          />
        </form-field>

        <div class="actions">
          <div class="add-button">
            <LoadingSpinner v-if="loading" />
            <button v-else class="icon" @click.prevent="handleUpdateProxy">
              <picture>
                <img src="@/assets/images/interface/plus.svg" alt="" />
              </picture>
            </button>
          </div>

          <div class="error-message whisper-voice">
            {{ message }}
          </div>
        </div>
      </div>

      <div class="grid-item">
        <DappProxies
          :proxies="dappForm?.proxies"
          :dappForm="dappForm"
          :isForm="true"
        />
      </div>
    </div>
  </FormKit>
</template>

<style scoped lang="scss">
:deep(.multiselect-search) {
}
.proxy-step {
  display: grid;
  gap: 4rem;

  @media (min-width: 726px) {
    grid-template-columns: 1fr 1.5fr;
  }

  :deep(.proxy-table) {
    .table-row {
      grid-template-columns: 0.5fr 0.5fr 0.75fr 0.75fr 0.75fr 0.5fr 0.2fr;
    }
  }
}

.button-group {
  display: flex;
  align-items: center;
  justify-self: center;
  width: 100%;
  justify-content: start;
}

.proxy-form {
  display: grid;
  gap: 1rem;
  align-items: center;

  button {
    justify-self: start;
  }

  .feed-option {
    margin-bottom: 50px;
  }

  .actions {
    align-items: center;

    .add-button {
      max-width: 50px;
    }

    .icon {
      padding: 1rem;
    }
  }
  .error-message {
    color: var(--warning, red);
  }
}
</style>
