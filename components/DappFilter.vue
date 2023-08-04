<script setup>
import { useEcosystemStore } from "~/stores/ecosystem";
import { gsap } from "gsap";

const ecosystem = useEcosystemStore();

const chains = computed(() => {
  if (ecosystem.stats) {
    return [...ecosystem.stats.chains];
  }
});
const categories = computed(() => {
  if (ecosystem.stats) {
    return [...ecosystem.stats.categories];
  }
});
const productTypes = computed(() => {
  if (ecosystem.stats) {
    return [...ecosystem.stats.productTypes];
  }
});
const years = computed(() => {
  if (ecosystem.stats) {
    return [...ecosystem.stats.years];
  }
});

function clearFilters() {
  ecosystem.filterQuery.searchKey = "";
  ecosystem.filterQuery.productTypes = [];
  ecosystem.filterQuery.chains = [];
  ecosystem.filterQuery.categories = [];
  ecosystem.filterQuery.years = [];
  ecosystem.filterQuery.page = 1;
}

const showAll = ref({
  chains: false,
  categories: false,
  productTypes: false,
  years: false,
});

const defaultPillCount = 5;

onMounted(() => {
  const pageLoad = gsap.timeline();

  pageLoad.fromTo(
    "dapp-filter",
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
        each: 0.15,
        from: "start",
      },
    }
  );
});

const handleFilter = (event) => {
  ecosystem.filterQuery.page = 1;
};
</script>

<template>
  <dapp-filter>
    <header>
      <h3 class="solid-voice">
        Displaying {{ ecosystem?.list?.length }} of
        {{ ecosystem.totalProjects }} results
      </h3>
      <button class="button" @click="clearFilters">Clear</button>
    </header>

    <!-- search bar -->
    <search-bar>
      <FormKit
        type="search"
        placeholder="Search..."
        v-model="ecosystem.filterQuery.searchKey"
      />
    </search-bar>

    <!-- chain filter -->
    <div class="chain filter">
      <h4 class="solid-voice">Chain</h4>
      <ul class="pills" v-auto-animate>
        <template v-for="(chain, index) in chains">
          <li
            class="pill"
            :key="chain.chainId"
            v-if="index < defaultPillCount || showAll.chains"
          >
            <label :for="'chain-' + chain?.chainId">
              <picture>
                <ChainIcon
                  :chain="ecosystem.chainNames(chain?.chainId)"
                  fill="var(--color)"
                  stroke="var(--paper)"
                  strokeWidth="5%"
                />
              </picture>
              {{ ecosystem.chainNames(chain?.chainId) }} ({{ chain.count }})
            </label>

            <input
              :id="'chain-' + chain?.chainId"
              type="checkbox"
              :value="chain?.chainId"
              v-model="ecosystem.filterQuery.chains"
              @change="handleFilter"
            />
          </li>
        </template>
      </ul>

      <button
        class="text"
        @click="showAll.chains = !showAll.chains"
        v-if="chains?.length > defaultPillCount"
      >
        {{ !showAll.chains ? "Show More" : "Show Less" }}
      </button>
    </div>

    <!-- category filter -->
    <div class="category filter">
      <h4 class="solid-voice">Category</h4>

      <ul class="pills" v-auto-animate>
        <template v-for="(category, index) in categories" :key="category.name">
          <li
            class="pill"
            v-if="index < defaultPillCount || showAll.categories"
          >
            <label :for="'category-' + category.name">
              <!-- <DynamicIcon :icon="category.name" /> -->
              {{ ecosystem.categoryToLabel?.[category.name] }} ({{
                category.count
              }})
            </label>

            <input
              :id="'category-' + category.name"
              type="checkbox"
              :value="category.name"
              v-model="ecosystem.filterQuery.categories"
              @change="handleFilter"
            />
          </li>
        </template>
      </ul>

      <button
        class="text"
        @click="showAll.categories = !showAll.categories"
        v-if="categories?.length > defaultPillCount"
      >
        {{ !showAll.categories ? "Show More" : "Show Less" }}
      </button>
    </div>

    <!-- product type -->
    <div class="productType filter">
      <h4 class="solid-voice">Product Type</h4>
      <ul class="pills" v-auto-animate>
        <template
          v-for="(productType, index) in productTypes"
          :key="productType.name"
        >
          <li
            class="pill"
            v-if="index < defaultPillCount || showAll.productTypes"
          >
            <label :for="'productType-' + productType.name">
              <DynamicIcon :icon="productType.name" />

              {{ ecosystem?.productTypeToLabel?.[productType.name] }} ({{
                productType.count
              }})
            </label>

            <input
              :id="'productType-' + productType.name"
              type="checkbox"
              :value="productType.name"
              v-model="ecosystem.filterQuery.productTypes"
              @change="handleFilter"
            />
          </li>
        </template>
      </ul>

      <button
        class="text"
        @click="showAll.productTypes = !showAll.productTypes"
        v-if="productTypes?.length > defaultPillCount"
      >
        {{ !showAll.productTypes ? "Show More" : "Show Less" }}
      </button>
    </div>

    <!-- year filter -->
    <div class="year filter">
      <h4 class="solid-voice">Year</h4>
      <ul class="pills" v-auto-animate>
        <template v-for="(year, index) in years" :key="year.name">
          <li class="pill" v-if="index < defaultPillCount || showAll.years">
            <label :for="'year-' + year.name">
              {{ year.name }} ({{ year.count }})
            </label>

            <input
              :id="'year-' + year.name"
              type="checkbox"
              :value="year.name"
              v-model="ecosystem.filterQuery.years"
              @change="handleFilter"
            />
          </li>
        </template>
      </ul>

      <button
        class="text"
        @click="showAll.years = !showAll.years"
        v-if="years?.length > defaultPillCount"
      >
        {{ !showAll.years ? "Show More" : "Show Less" }}
      </button>
    </div>
  </dapp-filter>
</template>

<style lang="scss" scoped>
dapp-filter {
  display: grid;
  grid-template-columns: 1fr;
  position: sticky;
  top: 2rem;

  border-radius: var(--corners);
  background: var(--gradient-dark);

  padding-bottom: 2rem;

  max-height: 100vh;
  overflow-y: auto;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .solid-voice {
      font-size: 0.75rem;
    }

    .button {
      font-size: 14px;
    }
  }

  & > * {
    padding: 1.5rem;

    & + *:not(search-bar) {
      border-top: 1px solid hsla(162, 10%, 30%, 0.5);
    }
  }
}

.filter {
  display: grid;
  gap: 1rem;

  &.status .status-actions {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2px;
    border-radius: var(--corners);
    overflow: hidden;
    text-align: center;

    input {
      display: none;
    }

    label {
      font-size: 0.875rem;
      font-weight: var(--weight-medium);
      font-family: var(--font);
      padding: 0.5rem;
      --gray-darkest: hsla(167, 22%, 15%, 1);
      background-color: var(--gray-darkest);
    }

    input-field:has(input:checked) label {
      color: var(--black);
      background-color: var(--color);
    }
  }

  .pills {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: flex-start;
    gap: 0.5rem;
  }
  .pill {
    input {
      display: none;
    }

    label {
      display: flex;
      align-items: center;
      gap: 1rem;
      font-size: 12px;
      font-weight: var(--weight-medium);
      padding: 0.2em 1em;
      border-radius: var(--corners);
      // convert border to box shadow
      box-shadow: 1px 1px var(--gray-dark);

      white-space: nowrap;
      transition: 0.1s;
      picture {
        max-width: 16px;
      }
    }

    &:has(input:checked) label {
      box-shadow: 2px 2px 1px var(--color);
      transform: translate(0.1rem, 0.1rem);
    }
  }

  button.text {
    justify-self: end;
    padding: 0;
  }

  button.text::after {
    display: none;
  }
}
</style>
