import { useAccount, useQuery } from "wagmi";
import useDeployment from "../../components/DeploymentProvider/useDeployment";

const useETHBalance = () => {
  const { address = "" } = useAccount();
  const { provider } = useDeployment();

  return useQuery(ethBalanceQueryKeys.address(address), () => provider.getBalance(address), {
    enabled: Boolean(address),
  });
};

const ethBalanceQueryKeys = {
  all: () => ["eth-balance"],
  address: (address: string) => [...ethBalanceQueryKeys.all(), address],
};

export default useETHBalance;
