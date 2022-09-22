import { Deployment, DEPLOYMENTS } from "@metastreet-labs/margin-core";
import { useProvider } from "wagmi";

const useDeployment = () => {
  const provider = useProvider();
  const chainID = provider.network.chainId;
  const deployment = DEPLOYMENTS[chainID] ?? ({} as Deployment);

  return { provider, chainID, deployment };
};

export default useDeployment;
