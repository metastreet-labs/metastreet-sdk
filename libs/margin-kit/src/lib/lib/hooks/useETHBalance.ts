import { useAccount, useQuery } from "wagmi";
import useDefinedMetaStreetDeployment from "../../hooks/useDefinedMetaStreetDeployment";

const useETHBalance = () => {
  const { address = "" } = useAccount();
  const { provider, chainID } = useDefinedMetaStreetDeployment();

  return useQuery(ethBalanceQueryKeys.address(chainID, address), () => provider.getBalance(address), {
    enabled: Boolean(address),
  });
};

const ethBalanceQueryKeys = {
  all: (chainID: number) => ["eth-balance", chainID],
  address: (chainID: number, address: string) => [...ethBalanceQueryKeys.all(chainID), address],
};

export default useETHBalance;
