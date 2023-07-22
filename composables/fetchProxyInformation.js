import { readContracts } from "@wagmi/core";

const abiInterface = [
  {
    constant: true,
    inputs: [],
    name: "api3ServerV1",
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "dapiNameHash",
    outputs: [
      {
        name: "",
        type: "bytes32",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "dataFeedId",
    outputs: [
      {
        name: "",
        type: "bytes32",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "oevBeneficiary",
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

export async function fetchProxyInformation(address, chainId) {
  console.log("fetching for ", { address, chainId });
  const proxyContract = {
    address: address,
    abi: abiInterface,
  };

  const [
    api3ServerV1Result,
    dapiNameHashResult,
    dataFeedIdResult,
    oevBeneficiaryResult,
  ] = await readContracts({
    contracts: [
      {
        ...proxyContract,
        functionName: "api3ServerV1",
        chainId: chainId,
      },
      {
        ...proxyContract,
        functionName: "dapiNameHash",
        chainId: chainId,
      },
      {
        ...proxyContract,
        functionName: "dataFeedId",
        chainId: chainId,
      },
      {
        ...proxyContract,
        functionName: "oevBeneficiary",
        chainId: chainId,
      },
    ],
  });

  console.log("info fetched ", {
    api3ServerV1Result,
    dapiNameHashResult,
    dataFeedIdResult,
    oevBeneficiaryResult,
  });

  let proxyInformation = {};

  if (api3ServerV1Result.status === "failure") {
    throw new Error(`Error getting api3ServerV1: ${api3ServerV1Result.reason}`);
  } else {
    proxyInformation.api3ServerV1 = api3ServerV1Result.result;
  }

  if (oevBeneficiaryResult.status !== "failure") {
    proxyInformation.isOev = Boolean(oevBeneficiaryResult.result);
    proxyInformation.oevBeneficiary = oevBeneficiaryResult.result;
  } else {
    proxyInformation.isOev = false;
  }

  if (
    dapiNameHashResult.status === "failure" &&
    dataFeedIdResult.status === "failure"
  ) {
    let errorMsg = "Error getting ";
    if (dapiNameHashResult.status === "failure")
      errorMsg += `dapiNameHash: ${dapiNameHashResult.reason}. `;
    if (dataFeedIdResult.status === "failure")
      errorMsg += `dataFeedId: ${dataFeedIdResult.reason}.`;
    throw new Error(errorMsg);
  } else {
    if (dapiNameHashResult.result) {
      proxyInformation.type = "dAPI";
      proxyInformation.dapiNameHash = dapiNameHashResult.result;
    }

    if (dataFeedIdResult.result) {
      proxyInformation.type = "datafeedId";
      proxyInformation.dataFeedId = dataFeedIdResult.result;
    }
  }

  return proxyInformation;
}
