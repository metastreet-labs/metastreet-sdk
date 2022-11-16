import { Deployment } from "@metastreet-labs/margin-core";
import { chain, Provider } from "@wagmi/core";
import { useNetwork, useProvider } from "wagmi";
import useDeployment from "./useDeployment";

export interface MetaStreetDeployment {
  provider: Provider;
  chainID: number;
  deployment?: Deployment;
}

const useMetaStreetDeployment = (): MetaStreetDeployment => {
  const deployment = useDeployment();
  const provider = useProvider();
  const { chain: activeChain } = useNetwork();

  return { deployment, provider, chainID: activeChain?.id ?? chain.mainnet.id };
};

export default useMetaStreetDeployment;
