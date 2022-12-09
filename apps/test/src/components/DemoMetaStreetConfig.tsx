import { MetaStreetConfig } from "@metastreet-labs/margin-kit";
import { PropsWithChildren } from "react";
import { chain, useAccount, useNetwork, useProvider, useSigner } from "wagmi";

const DemoMetaStreetConfig = (props: PropsWithChildren) => {
  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address: signerAddress } = useAccount();
  const { chain: activeChain } = useNetwork();

  return (
    <MetaStreetConfig
      chainID={activeChain?.id ?? chain.mainnet.id}
      provider={provider}
      signer={signer ?? undefined}
      signerAddress={signerAddress}
    >
      {props.children}
    </MetaStreetConfig>
  );
};

export default DemoMetaStreetConfig;
