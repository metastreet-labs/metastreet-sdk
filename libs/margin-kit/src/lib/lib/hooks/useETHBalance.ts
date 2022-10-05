import { useAccount, useQuery } from "wagmi";
import useMetaStreetDeployment from "../../components/MetaStreetDeploymentProvider/useMetaStreetDeployment";

const useETHBalance = () => {
  const { address = "" } = useAccount();
  const { provider } = useMetaStreetDeployment();

  return useQuery(ethBalanceQueryKeys.address(address), () => provider.getBalance(address), {
    enabled: Boolean(address),
  });
};

const ethBalanceQueryKeys = {
  all: () => ["eth-balance"],
  address: (address: string) => [...ethBalanceQueryKeys.all(), address],
};

export default useETHBalance;
