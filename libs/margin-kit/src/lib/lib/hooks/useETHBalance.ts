import { useAccount, useQuery } from "wagmi";
import useMetaStreetDeployment from "../../hooks/useMetaStreetDeployment";

const useETHBalance = () => {
  const { address = "" } = useAccount();
  const { chainID, provider } = useMetaStreetDeployment();

  return useQuery(ethBalanceQueryKeys.address(chainID, address), () => provider.getBalance(address), {
    enabled: Boolean(address),
  });
};

const ethBalanceQueryKeys = {
  all: (chainID: number) => ["eth-balance", chainID],
  address: (chainID: number, address: string) => [...ethBalanceQueryKeys.all(chainID), address],
};

export default useETHBalance;
