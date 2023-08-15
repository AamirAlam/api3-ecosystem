<script setup>
import { useEcosystemStore } from "@/stores/ecosystem";

const props = defineProps(["dapp"]);
const ecosystem = useEcosystemStore();
const logo = props?.dapp?.images?.logo ?? "@/assets/images/square.jpg";

function filterBy(event) {
  if (event.target.classList.contains("category")) {
    ecosystem.filter.category.push(event.target.innerText);
  } else if (event.target.classList.contains("productType")) {
    ecosystem.filter.productTypes.push(event.target.innerText);
  } else if (event.target.classList.contains("status")) {
    ecosystem.filter.status = event.target.innerText?.toLowerCase();
  }
}
</script>

<template>
  <dapp-card class="list-move">
    <header>
      <picture class="logo">
        <img :src="logo" alt="" />
      </picture>
      <div>
        <div class="lists" v-if="true">
          <ul class="productTypes-list productType">
            <li class="micro-voice productType" @click="filterBy">
              {{
                dapp?.productType
                  ? ecosystem?.productTypeToLabel?.[dapp?.productType]
                  : "Product"
              }}
              <DynamicIcon v-if="dapp?.productType" :icon="dapp?.productType" />
            </li>
          </ul>

          <ul class="categories-list">
            <li
              class="micro-voice category"
              v-for="category in dapp?.categories ?? [1, 2, 3]"
              @click="filterBy"
            >
              {{ ecosystem?.categoryToLabel?.[category] ?? "Category" }}
              <!-- <DynamicIcon :icon="category" /> -->
            </li>
          </ul>
        </div>
      </div>
    </header>

    <text-content>
      <h2 class="firm-voice">{{ dapp?.name ?? "dApp Name" }}</h2>

      <p class="whisper-voice">
        {{ dapp?.tagline ?? "This is the dApp tagline" }}
      </p>
    </text-content>

    <footer>
      <NuxtLink
        :to="`/ecosystem/${dapp?._id ?? '#'}`"
        class="text card-link"
      ></NuxtLink>
    </footer>

    <div class="background-wrapper">
      <picture class="card-background">
        <ChainIcon
          :chain="ecosystem.chainNames(dapp?.chains[0] ?? 1)"
          fill="none"
          stroke="var(--color)"
        />
      </picture>
    </div>
  </dapp-card>
</template>

<style lang="scss" scoped>
dapp-card {
  display: grid;
  grid-template-rows: 0.5fr 1fr 0.1fr;
  gap: 0.5rem;

  padding: 1rem;
  border-radius: var(--corners);
  min-height: 250px;

  position: relative;
  overflow: hidden;

  background: var(--gradient-dark);

  &:hover {
    background: var(--gradient-color-dark);
    transition: 0.2s ease-in-out;
  }

  .calm-voice {
    font-size: 0.875rem;
  }
  .whisper-voice {
    font-size: var(--step--1);
  }

  & :is(.lists, .status) {
    z-index: 2;
  }

  .card-link {
    content: "";
    padding-left: 0;
    position: absolute;
    inset: 0;
    z-index: 1;
    cursor: pointer;
  }

  div.background-wrapper {
    position: absolute;
    inset: 0;
    overflow: hidden;
    z-index: 0;

    .card-background {
      position: absolute;
      opacity: 1;
      right: -100px;
      top: 125px;
      transform: rotate(-10deg) scale(0.5);
      transform-origin: top;
    }
  }
}
header {
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  justify-content: end;
  align-items: center;

  h2 {
    white-space: nowrap;
  }
  picture {
    max-width: 80px;
    border-radius: 50%;
    z-index: 1;
  }
}

text-content {
  align-self: end;
  display: grid;
  gap: 0.5rem;
}

header > div {
  display: grid;
  gap: 1rem;
  justify-content: end;
  align-items: center;
}
.lists {
  display: grid;
  gap: 0.5rem;
  ul {
    display: flex;
    gap: 0.5rem;
    justify-content: end;

    li {
      border-radius: var(--corners);
      padding: 0.1rem 0.5rem;
      border-right: 0.5px solid var(--gray-dark);
      border-bottom: 0.5px solid var(--gray-dark);
      display: flex;
      align-items: center;
      gap: 0.25rem;
      white-space: nowrap;

      :deep(picture) {
        max-width: 16px;
      }
    }
  }
}

.category,
.productType,
.status {
  cursor: pointer;
}
:is(.category, .productType, .status):hover {
  filter: brightness(1.2);
}
</style>
