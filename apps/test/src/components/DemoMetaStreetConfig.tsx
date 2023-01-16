import { MetaStreetConfig } from "@metastreet-labs/margin-kit";
import { QueryClient } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { useAccount, useNetwork, useProvider, useSigner } from "wagmi";
import { mainnet } from "wagmi/chains";

const queryClient = new QueryClient();

const DemoMetaStreetConfig = (props: PropsWithChildren) => {
  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address: signerAddress } = useAccount();
  const { chain: activeChain } = useNetwork();

  return (
    <MetaStreetConfig
      queryClient={queryClient}
      chainID={activeChain?.id ?? mainnet.id}
      provider={provider}
      signer={signer ?? undefined}
      signerAddress={signerAddress}
    >
      {props.children}
    </MetaStreetConfig>
  );
};

export default DemoMetaStreetConfig;
