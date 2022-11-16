import { useAccount, useProvider, useQuery } from "wagmi";
import useChainID from "../../hooks/useChainID";

const useETHBalance = () => {
  const { address = "" } = useAccount();
  const chainID = useChainID();
  const provider = useProvider();

  return useQuery(ethBalanceQueryKeys.address(chainID, address), () => provider.getBalance(address), {
    enabled: Boolean(address),
  });
};

const ethBalanceQueryKeys = {
  all: (chainID: number) => ["eth-balance", chainID],
  address: (chainID: number, address: string) => [...ethBalanceQueryKeys.all(chainID), address],
};

export default useETHBalance;
