import { defineStore } from "pinia";

export const useWeb3Store = defineStore("web3Store", () => {
  const state = ref({ account: null, isConnected: false, chainId: null });

  const func = ref({
    sign: null,
    openModal: null,
    switchChain: null,
    mintNft: null,
    isAlreadyMinted: null,
  });

  return {
    state,
    func,
  };
});
