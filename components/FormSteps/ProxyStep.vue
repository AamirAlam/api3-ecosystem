<script setup>
import Multiselect from "@vueform/multiselect";
import { useEcosystemStore } from "@/stores/ecosystem";

const ecosystem = useEcosystemStore();

const props = defineProps(["dappForm"]);

async function handleUpdateProxy() {
  if (!props.dappForm?.proxyAddress) {
    console.log("invalid proxy address added");
    //:todo show error on frontend
    return;
  }

  if (!props.dappForm?.proxyChain) {
    console.log("invalid chain selected");
    return;
  }

  if (!props.dappForm?.feedName) {
    console.log("invalid feed name selected");
    return;
  }

  try {
    const info = await fetchProxyInformation(
      props.dappForm?.proxyAddress,
      parseInt(props.dappForm?.proxyChain),
      props.dappForm?.feedName
    );

    console.log("info ", info);
    const finalProxyEntry = {
      proxyAddress: props.dappForm?.proxyAddress,
      isOEV: info?.isOev,
      chainId: props.dappForm?.proxyChain,
      type: info?.type,
      dataFeedId: info?.dataFeedId,
      feedName: props.dappForm?.feedName,
      dApiNameHash: info?.dapiNameHash,
      api3ServerV1: info?.api3ServerV1,
      oevBeneficiary: info?.oevBeneficiary,
    };

    const index = props.dappForm?.proxies?.findIndex(
      (el) => el?.proxyAddress === finalProxyEntry.proxyAddress
    );

    if (index >= 0) {
      console.log("proxy already added");
      //todo: show error in ui
      return;
    }

    props.dappForm?.proxies?.push(finalProxyEntry);
    props.dappForm.proxyChain = null;
    props.dappForm.proxyAddress = "";

    console.log("fetched info ", props.dappForm.proxies);
  } catch (error) {
    console.log("failed to fetch proxy info ", error);
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
    <!-- show added proxies -->
    <ul class="proxy-table" v-auto-animate>
      <li class="row" v-for="(proxy, index) in dappForm.proxies">
        <form-field>
          <FormKit
            type="text"
            label="Proxy Address"
            label-class="$reset notice-voice"
            name="proxyAddress"
            placeholder="Proxy Address"
            disabled="true"
            id="proxyAddress"
            v-model="proxy.proxyAddress"
          />
        </form-field>

        <form-field>
          <FormKit
            type="text"
            label="Proxy Chain"
            label-class="$reset notice-voice"
            name="Proxy Chain"
            placeholder="Proxy Chain"
            disabled="true"
            id="proxy-chainId"
            v-model="proxy.chainId"
          />
        </form-field>

        <form-field>
          <FormKit
            type="text"
            label="feedName"
            label-class="$reset notice-voice"
            name="feedName"
            placeholder="Feed Name"
            disabled="true"
            id="feedName"
            v-model="proxy.feedName"
          />
        </form-field>

        <div v-if="proxy.type === 'datafeedId'">
          <form-field>
            <label class="notice-voice" for="proxy-chain"> DataFeedId </label>
            <FormKit
              type="text"
              label-class="$reset notice-voice"
              placeholder="DataFeedId"
              name="DatafeedId"
              disabled="true"
              id="datafeedId"
              v-model="proxy.dataFeedId"
            />
          </form-field>
        </div>
        <div v-else>
          <form-field>
            <label class="notice-voice" for="proxy-chain"> dApiNameHash </label>
            <FormKit
              type="text"
              label-class="$reset notice-voice"
              name="dApiNameHash"
              placeholder="dApiNameHash"
              disabled="true"
              id="dApiNameHash"
              v-model="proxy.dApiNameHash"
            />
          </form-field>
        </div>

        <form-field>
          <label class="notice-voice" for="proxy-chain"> OEV </label>
          <FormKit
            type="checkbox"
            label-class="$reset notice-voice"
            name="isOev"
            placeholder="isOev"
            disabled="true"
            id="oev"
            v-model="proxy.isOEV"
          />
        </form-field>

        <button class="icon" @click.prevent="dappForm.proxies.splice(index, 1)">
          <picture>
            <img src="@/assets/images/icon-cross.svg" alt="" />
          </picture>
        </button>
      </li>
    </ul>

    <!-- show fetch proxy form -->
    <div class="proxy-table" v-auto-animate>
      <li class="row">
        <form-field>
          <FormKit
            type="text"
            label="Add Proxy Info"
            label-class="$reset notice-voice"
            name="proxyAddress"
            placeholder="Proxy Address"
            validation="optional"
            id="proxyAddress"
            v-model="dappForm.proxyAddress"
          />
        </form-field>

        <form-field>
          <label class="notice-voice" for="proxy-chain"> Select chain </label>
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

        <form-field>
          <label class="notice-voice" for="feed-name"> Select Feed Name </label>
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

        <button class="icon" @click.prevent="handleUpdateProxy">+</button>
      </li>
    </div>

    <div class="actions">
      <button class="button previous" @click.prevent="buttonHandle(valid, -1)">
        Previous
      </button>
      <button class="button next" @click.prevent="buttonHandle(valid, 1)">
        Next
      </button>
    </div>

    <template v-if="buttonClick">
      <p v-if="!valid" class="not-valid">
        Your account details are not complete!
      </p>
      <p v-else class="valid">It all looks good 👍</p>
    </template>
  </FormKit>
</template>

<style scoped lang="scss">
.proxy-table {
  display: grid;
  gap: 1rem;
  align-items: center;

  li.row {
    display: grid;
    grid-template-columns: 0.7fr 0.4fr 0.4fr;
    gap: 1rem;
  }

  button {
    justify-self: start;
    align-self: center;
    width: 50px;
    height: 50px;
    background-color: var(--paper);
  }

  img {
    width: 25px;
  }
}
</style>
