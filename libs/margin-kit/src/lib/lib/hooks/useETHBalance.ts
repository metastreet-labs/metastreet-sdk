import { useAccount, useQuery } from "wagmi";
import useDefinedMetaStreetDeployment from "../../hooks/useDefinedMetaStreetDeployment";

const useETHBalance = () => {
  const { address = "" } = useAccount();
  const { provider } = useDefinedMetaStreetDeployment();

  return useQuery(ethBalanceQueryKeys.address(address), () => provider.getBalance(address), {
    enabled: Boolean(address),
  });
};

const ethBalanceQueryKeys = {
  all: () => ["eth-balance"],
  address: (address: string) => [...ethBalanceQueryKeys.all(), address],
};

export default useETHBalance;
