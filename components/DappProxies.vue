<script setup>
import { useEcosystemStore } from "@/stores/ecosystem";

const props = defineProps(["dapp", "isForm"]);
const ecosystem = useEcosystemStore();
console.log(props.isForm);
</script>

<template>
  <section class="proxy-table">
    <h2 class="attention-voice">Proxies</h2>
    <ul>
      <li class="table-row">
        <div class="solid-voice chain"></div>
        <div class="solid-voice chain">is OEV?</div>
        <div class="solid-voice type">Feed Name</div>
        <div class="solid-voice type">Type</div>
        <div class="solid-voice type">Address</div>
        <div class="" v-if="isForm"></div>
      </li>
      <li class="table-row" v-for="proxy in dapp.proxies">
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
        <div class="is-oev">
          <picture v-if="proxy.isOEV">
            <img src="/images/icons/oev.svg" alt="" />
          </picture>
        </div>
        <div class="type">
          {{ proxy?.feedName }}
        </div>
        <div class="type">
          {{ proxy?.type?.includes("datafeedId") ? "data Feed" : "dAPI" }}
        </div>
        <div class="type">
          {{ proxy?.proxyAddress?.slice(0, 10) }}
        </div>
        <div class="cross" v-if="isForm">
          <button
            class="icon button"
            @click.prevent="dapp?.proxies?.splice(index, 1)"
          >
            <picture>
              <img src="@/assets/images/icon-cross.svg" />
            </picture>
          </button>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
section.proxy-table {
  ul {
    margin-top: 0.5rem;
  }
  .table-row {
    display: grid;
    grid-template-columns: 0.75fr 1fr 1fr 1fr 1fr;
    padding: 1rem 0;
    border-bottom: 1px solid var(--gray-dark);
    align-items: center;

    .chain picture {
      max-width: 50px;
    }

    & + .table-row {
      // border-top: 1px solid var(--white);
    }

    .is-oev picture {
      max-width: 20px;
    }
  }
}
</style>
