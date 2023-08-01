import { defineStore } from "pinia";
import { useFetch } from "nuxt/app";
import { CHAINS } from "@api3/chains";
import { watchDebounced } from "@vueuse/core";
import feedNames from "./feedNames.json";

export const useEcosystemStore = defineStore("ecosystem", () => {
  // store states
  const baseServerUrl = ref("/api/projects/");
  const filterQuery = ref({
    searchKey: "",
    chains: [],
    categories: [],
    productTypes: [],
    years: [],
    page: 1,
  });
  const hasMoreItems = ref(true);
  const projectList = ref([]);
  const totalProjects = ref(0);

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

  const { data, error: listError } = useFetch(
    () => debouncedSearchQuery.value,
    {
      key: `ecosystem-list-${filterQuery.value.page}`,
    }
  );

  watch([filterQuery, data], ([newQuery, newData], [oldQuery, prevData]) => {
    totalProjects.value = newData.total;
    if (newQuery.page === 1) {
      projectList.value = newData.projects;
    } else {
      projectList.value = [...projectList.value, ...newData.projects];
    }

    if (
      newData.projects?.length < 10 ||
      newData.projects?.length === totalProjects.value
    ) {
      hasMoreItems.value = false;
    } else {
      hasMoreItems.value = true;
    }
  });

  //stats
  const { data: stats, error: statsError } = useFetch("/api/projects/stats/");

  //   helpers
  const productTypeToLabel = {
    qrng: "QRNG",
    datafeed: "Data Feed",
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
    const chain = CHAINS.find((chain) => chain.id == chainId);
    return chain ? chain.name : chainId;
  };

  return {
    list: projectList,
    totalProjects,
    stats,
    categoryOptions,
    productTypeOptions,
    hasMoreItems: hasMoreItems,
    chainOptions,
    categoryToLabel,
    productTypeToLabel,
    feedNameOptions: feedNames,
    filterQuery,
    chainNames,
  };
});
