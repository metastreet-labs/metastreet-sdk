import { Deployment, DEPLOYMENTS } from "@metastreet-labs/margin-core";
import { Provider } from "@wagmi/core";
import { useProvider } from "wagmi";

export interface MetaStreetDeployment {
  provider: Provider;
  chainID: number;
  deployment?: Deployment;
}

const useMetaStreetDeployment = (): MetaStreetDeployment => {
  const provider = useProvider();
  const chainID = provider.network.chainId;
  const deployment = DEPLOYMENTS[chainID];

  return { deployment, provider, chainID };
};

export default useMetaStreetDeployment;
