<script setup>
import { useEcosystemStore } from "@/stores/ecosystem";

const ecosystem = useEcosystemStore();

const props = defineProps(["proxies", "isForm", "dappForm"]);
</script>

<template>
  <section class="proxy-table">
    <h2 class="attention-voice">Proxies</h2>
    <ul v-auto-animate>
      <!-- Table heading, first row -->
      <li class="table-row table-head">
        <div class="solid-voice chain">Chain</div>
        <div class="solid-voice feedname">Feed Name</div>
        <div class="solid-voice type">Type</div>
        <div class="solid-voice proxy-address">Proxy Address</div>
        <div class="solid-voice address">ID / dAPI</div>
        <div class="solid-voice is-oev">is OEV?</div>
        <div class="" v-if="isForm"></div>
      </li>

      <!-- Dynamically rendered table based on data -->
      <li class="table-row" v-for="(proxy, index) in proxies">
        <!-- chain -->
        <div class="chain">
          <picture>
            <ChainIcon
              :chain="ecosystem.chainNames(proxy.chainId)"
              fill="var(--color)"
              stroke="var(--paper)"
              strokeWidth="15%"
            />
          </picture>
        </div>

        <!-- feed name -->
        <div class="feedname">
          {{ proxy?.feedName }}
        </div>

        <!-- type -->
        <div class="type">
          {{ proxy?.proxyType?.includes("datafeedId") ? "Data Feed" : "dAPI" }}
        </div>

        <!-- proxy address -->
        <div class="proxy-address">
          <WalletAddress :walletAddress="proxy?.proxyAddress" />
        </div>

        <!-- id / dapi based address -->
        <div class="address">
          <WalletAddress
            :walletAddress="
              proxy?.proxyType === 'datafeedId'
                ? proxy?.datafeedId
                : proxy?.dapiNameHash
            "
          />
        </div>

        <!-- is oev -->
        <div class="is-oev">
          <picture v-if="isForm ? proxy.isOEV : proxy?.oev?.enabled">
            <img src="/images/icons/oev.svg" alt="" />
          </picture>
        </div>

        <!-- button column rendered when this component is loaded in the form-->
        <div class="cross" v-if="isForm">
          <button
            class="icon"
            @click.prevent="dappForm?.proxies?.splice(index, 1)"
          >
            <picture>
              <img src="@/assets/images/interface/cross.svg" />
            </picture>
          </button>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
section.proxy-table {
  display: grid;
  ul {
    margin-top: 0.5rem;
    max-height: 400px;

    overflow-y: scroll;
    position: relative;
    scroll-behavior: smooth;

    .table-head {
      position: sticky;
      top: 0;
      background-color: var(--paper);
      z-index: 1;
    }
  }
  .table-row {
    display: grid;
    grid-template-columns: 0.75fr 1fr 1fr 1fr 1fr 1fr;
    gap: 0.5rem;
    padding: 1rem;
    border-bottom: 1px solid var(--gray-dark);
    align-items: center;

    div {
      min-width: 115px;
    }

    .chain picture {
      max-width: 50px;
    }

    & + .table-row {
      // border-top: 1px solid var(--white);
    }

    .is-oev picture {
      max-width: 20px;
    }

    .cross {
      width: 30px;
      height: 30px;
    }
  }
}
</style>
