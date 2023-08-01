import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/html";
import {
  configureChains,
  createConfig,
  watchAccount,
  signMessage,
  getNetwork,
} from "@wagmi/core";
import {
  arbitrum,
  mainnet,
  polygon,
  polygonZkEvm,
  avalanche,
  avalancheFuji,
  boba,
  bsc,
  canto,
  celo,
  dogechain,
  fantom,
  moonbeam,
  moonriver,
  aurora,
  gnosis,
  metis,
  optimism,
  zkSync,
  skaleExorde,
  mantle,
} from "@wagmi/core/chains";
import { switchNetwork } from "@wagmi/core";

export const useWeb3 = () => {
  //get env variable for project id
  const config = useRuntimeConfig();
  const projectId = config.public.web3modalProjectId;

  //configure chains
  const chains = [
    arbitrum,
    mainnet,
    polygon,
    polygonZkEvm,
    aurora,
    avalanche,
    avalancheFuji,
    boba,
    bsc,
    canto,
    celo,
    dogechain,
    fantom,
    moonbeam,
    moonriver,
    gnosis,
    metis,
    optimism,
    zkSync,
    skaleExorde,
    mantle,
  ];
  const { publicClient } = configureChains(chains, [
    w3mProvider({ projectId }),
  ]);

  //create wagmi config
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, version: 1, chains }),
    publicClient,
  });

  // //create ethereum client and web3modal
  const ethereumClient = new EthereumClient(wagmiConfig, chains);
  const web3modal = computed(
    () => new Web3Modal({ projectId }, ethereumClient)
  );

  ////////////////////////////////////

  const wallet = ref({});
  const router = useRouter();
  const currentUrl = router.currentRoute.value.path;

  const unwatchAccount = watchAccount((acc) => {
    wallet.value = { ...acc };
  });

  const chainId = computed(() => getNetwork()?.chain?.id);

  const account = computed(() => wallet.value.address);
  const isConnected = computed(() => wallet.value.isConnected);
  watch(isConnected, (isConnected) => {
    if (!isConnected && currentUrl === "/add-dapp") {
      navigateTo("/login");
    }

    if (isConnected && currentUrl === "/login") {
      router.back();
    }
  });

  const openModal = async () => {
    await web3modal.value.openModal();
  };

  const sign = async (message) => {
    try {
      const result = await signMessage(message);
      return result;
    } catch (error) {
      console.log("sign error", error);
      return null;
    }
  };

  const switchChain = async (targetChain) => {
    try {
      await switchNetwork({
        chainId: targetChain,
      });
    } catch (error) {
      console.log("chain switch error ", error);
    }
  };

  return {
    wallet,
    openModal,
    account,
    sign,
    isConnected,
    chainId,
    wagmiConfig,
    switchChain,
  };
};
