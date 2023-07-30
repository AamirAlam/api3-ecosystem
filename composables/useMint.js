import { waitForTransaction } from "@wagmi/core";
import { writeContract } from "@wagmi/core";
import GUILD_ABI from "../content/GUILD_ABI.json";

const API3_GUILD_ADDRESS = "0x4052d3e79AEe9cF01168633531FEfAe4bF8FdB78";

export const useMint = () => {
  async function mintNft(productId, chainId) {
    try {
      if (!chainId?.value)
        return {
          success: false,
          message: "Wrong chain to mint! Please switch to Polygon Mainnet",
        };

      const { hash } = await writeContract({
        address: API3_GUILD_ADDRESS,
        abi: GUILD_ABI,
        functionName: "mint",
        args: [productId],
        chainId: chainId.value,
      });

      console.log("mint submitted ", hash);

      const data = await waitForTransaction({
        hash: hash,
        chainId: chainId.value,
      });

      console.log("nft minted ", data);

      return { success: true, data: data };
    } catch (error) {
      console.log("mint error ", {
        error,
      });
      return {
        success: false,
        message: "Failed to mint NFT!",
      };
    }
  }

  return { mintNft };
};
