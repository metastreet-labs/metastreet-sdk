import { DEPLOYMENTS } from "@metastreet-labs/margin-core";
import { LeverageBuyWrapperV1__factory } from "@metastreet-labs/pe-contracts-typechain";
import { useEffect } from "react";
import { useAccount, useProvider, useSigner } from "wagmi";

const Index = () => {
  const provider = useProvider();
  const { address } = useAccount();
  const { data: signer } = useSigner();

  useEffect(() => {
    // Uncomment this to see the Request by only using a Signer
    // if (!signer) return;
    const deployment = DEPLOYMENTS[provider.network.chainId];
    const signerOrProvider = signer ? signer : provider;
    console.log(signerOrProvider);

    async function getPurchaseEscrow() {
      try {
        const lbWrapper = LeverageBuyWrapperV1__factory.connect(deployment.lbWrapperAddress, signerOrProvider);
        const res = await lbWrapper.purchaseEscrow();
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    }
    void getPurchaseEscrow();
  }, [provider, signer, address]);
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return <div>Index</div>;
};

export default Index;
