<script setup>
import Multiselect from "@vueform/multiselect";
import { useEcosystemStore } from "@/stores/ecosystem";

const ecosystem = useEcosystemStore();

const props = defineProps(["dappForm"]);
const loading = ref(false);
const message = ref("");

async function handleUpdateProxy() {
  message.value = "";
  loading.value = false;

  if (!props.dappForm?.proxyAddress) {
    message.value = "Please add valid proxy address!";
    console.log("invalid proxy address added");
    return;
  }

  if (!props.dappForm?.proxyChain) {
    message.value = "Please select proxy chain!";
    console.log("invalid chain selected");
    return;
  }

  if (!props.dappForm?.feedName) {
    message.value = "Please select feed name!";
    console.log("invalid feed name selected");
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
      console.log("proxy already added");
      message.value = "Proxy already added!";
      return;
    }

    props.dappForm?.proxies?.push(finalProxyEntry);
    props.dappForm.proxyChain = null;
    props.dappForm.proxyAddress = "";

    console.log("fetched info ", props.dappForm.proxies);
  } catch (error) {
    message.value = "Unable fetch proxy info! Incorrect input";
    console.log("failed to fetch proxy info ", error);
  } finally {
    loading.value = false;
  }
}

const buttonClick = ref(false);
function buttonHandle(valid, direction) {
  formStepButtonHandle(valid, direction, buttonClick);
}
</script>

<template>
  <FormKit
    type="group"
    #default="{ state: { valid } }"
    v-auto-animate
    name="proxy"
  >
    <div class="proxy-step">
      <!-- show fetch proxy form -->
      <div class="proxy-form grid-item" v-auto-animate>
        <form-field>
          <FormKit
            type="text"
            label="Proxy address"
            label-class="$reset notice-voice"
            name="proxyAddress"
            validation="optional"
            id="proxyAddress"
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
          />
        </form-field>

        <div class="button-group">
          <div class="add-button" v-if="loading">
            <LoadingSpinner />
          </div>
          <div v-else>
            <button class="icon add-button" @click.prevent="handleUpdateProxy">
              +
            </button>
          </div>

          <div class="error-message">
            {{ message }}
          </div>
        </div>
        <!-- <button class="button" @click.prevent="handleUpdateProxy">Fetch</button> -->
      </div>

      <!-- </div> -->
      <!-- show added proxies -->
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
.add-button {
  width: 50px;
  height: 50px;
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
  .error-message {
    margin-left: 20px;
    // margin-top: 20px;
    color: red;
    font-size: 12px;

    // justify-self: flex-start;
    // align-items: start;
  }
}
</style>
