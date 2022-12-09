import { defaultDeployments, Deployment } from "@metastreet-labs/margin-core";
import { providers, Signer } from "ethers";
import { createContext, PropsWithChildren, useContext } from "react";

const MAINNET_ID = 1;
const GOERLI_ID = 5;

interface MetaStreetConfigContext {
  deployment?: Deployment;
  chainID: number;
  provider: providers.Provider;
  signer?: Signer;
  signerAddress?: string;
}

const MetaStreetConfigContext = createContext<MetaStreetConfigContext | undefined>(undefined);

export const useMetaStreetConfig = () => {
  const context = useContext(MetaStreetConfigContext);
  if (!context) throw new Error("useMetaStreet was called outside of a MetaStreetProvider");
  return context;
};

type MetaStreetConfigProps = Pick<MetaStreetConfigContext, "chainID" | "provider" | "signer" | "signerAddress"> & {
  subgraphs?: {
    mainnet?: string;
    goerli?: string;
  };
};

export const MetaStreetConfig = (props: PropsWithChildren<MetaStreetConfigProps>) => {
  const { chainID, subgraphs, children, ...rest } = props;

  let deployment: Deployment | undefined;
  if (defaultDeployments[chainID]) {
    deployment = { ...defaultDeployments[chainID] };
    if (subgraphs) {
      if (chainID == MAINNET_ID && subgraphs.mainnet) deployment.subgraphURI = subgraphs.mainnet;
      if (chainID == GOERLI_ID && subgraphs.goerli) deployment.subgraphURI = subgraphs.goerli;
    }
  }

  const contextValue: MetaStreetConfigContext = {
    deployment,
    chainID,
    ...rest,
  };

  return <MetaStreetConfigContext.Provider value={contextValue}>{children}</MetaStreetConfigContext.Provider>;
};
