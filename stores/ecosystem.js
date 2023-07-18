import { defineStore } from "pinia";
import { useFetch } from "nuxt/app";
import { CHAINS } from "@api3/chains";
import { watchDebounced } from "@vueuse/core";
import { useInfiniteScroll } from "@vueuse/core";

export const useEcosystemStore = defineStore("ecosystem", () => {
  //get projects, with dynamic pagination
  const baseServerUrl = ref("/api/projects/");
  const filterQuery = ref({
    searchKey: "",
    chains: [],
    categories: [],
    productTypes: [],
    years: [],
    page: 1,
  });

  const serverURL = computed(() => {
    let url = baseServerUrl.value + `?page=${filterQuery.value.page}`;

    if (filterQuery.value.chains.length > 0) {
      url += `&chains=${filterQuery.value.chains.join(",")}`;
    }

    if (filterQuery.value.categories.length > 0) {
      url += `&categories=${filterQuery.value.categories.join(",")}`;
    }

    if (filterQuery.value.productTypes.length > 0) {
      url += `&productTypes=${filterQuery.value.productTypes.join(",")}`;
    }

    if (filterQuery.value.searchKey !== "") {
      url += `&searchKey=${filterQuery.value.searchKey}`;
    }

    if (filterQuery.value.years.length > 0) {
      url += `&years=${filterQuery.value.years.join(",")}`;
    }

    return url;
  });

  const debouncedSearchQuery = serverURL;

  watchDebounced(
    serverURL,
    () => {
      debouncedSearchQuery.value = serverURL.value;
    },
    { debounce: 500, maxWait: 1000 }
  );

  const list = ref([]);

  const {
    data,
    error: listError,
    refresh,
  } = useFetch(() => debouncedSearchQuery.value, {
    onResponse({ request, response }) {
      //only push when page changes otherwise overwrite list

      list.value = response._data;

      watch(filterQuery, (newVal, oldVal) => {
        console.log(newVal);
        if (newVal.page != oldVal.page) {
          console.log("watch page changed");
          // list.value.push(...response._data);
        } else {
          console.log("watch filter changed");
          //  list.value = response._data
        }
      });
    },
  });

  //stats
  const { data: stats, error: statsError } = useFetch("/api/projects/stats/");

  function addDapp(dapp) {
    list.value.push(dapp);
  }

  const productTypeToLabel = {
    dapi: "dAPI",
    qrng: "QRNG",
    datafeed: "Data Feed",
    airnode: "Airnode",
  };

  const categoryToLabel = {
    defi: "DeFi",
    dex: "Dex",
    nft: "NFT",
    gaming: "Gaming",
    dao: "DAO",
    oracle: "Oracle",
    wallet: "Wallet",
    infrastructure: "Infrastructure",
    other: "Other",
  };

  const categoryOptions = Object.keys(categoryToLabel).map((key) => {
    return {
      label: categoryToLabel[key],
      value: key,
    };
  });
  const productTypeOptions = Object.keys(productTypeToLabel).map((key) => {
    return {
      label: productTypeToLabel[key],
      value: key,
    };
  });

  const mainnetChains = CHAINS.filter((chain) => {
    if (!chain?.name?.toLocaleLowerCase().includes("testnet")) {
      return chain;
    }
  });

  const chainOptions = mainnetChains?.map((chain) => {
    return {
      label: chain.name,
      value: chain.id,
    };
  });

  // chain id to chain name mapping
  const chainNames = (chainId) => {
    const chain = CHAINS.find((chain) => chain.id === chainId);
    return chain ? chain.name : chainId;
  };

  const filter = reactive({
    search: "",
    productTypes: [],
    category: [],
    chains: [],
    years: [],
    count: 0, //#todo filtered list count that is appended
  });

  return {
    list,
    stats,
    categoryOptions,
    productTypeOptions,
    chainOptions,
    categoryToLabel,
    productTypeToLabel,
    filter,
    filterQuery,
    chainNames,
    addDapp,
  };
});
