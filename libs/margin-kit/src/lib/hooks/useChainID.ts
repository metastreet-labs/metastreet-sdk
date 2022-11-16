import { chain, useNetwork } from "wagmi";

const useChainID = () => {
  const { chain: activeChain } = useNetwork();
  return activeChain?.id ?? chain.mainnet.id;
};

export default useChainID;
