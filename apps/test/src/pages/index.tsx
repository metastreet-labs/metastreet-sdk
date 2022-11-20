import { DEPLOYMENTS, getLeverageBuy, getLeverageBuyEvents } from "@metastreet-labs/margin-core";
import { useEffect } from "react";
import { useAccount, useProvider } from "wagmi";

const Index = () => {
  const provider = useProvider();
  const { address } = useAccount();

  useEffect(() => {
    const deployment = DEPLOYMENTS[provider.network.chainId];
    const params = {
      signerOrProvider: provider,
      subgraphURI: deployment.subgraphURI,
      lbWrapperAddress: deployment.lbWrapperAddress,
    };
    getLeverageBuy({ escrowID: "0", ...params })
      .then((json) => console.log({ json }))
      .catch((e) => console.log(e));
    getLeverageBuyEvents({ ...params, owner: address, skip: 0, first: 5 })
      .then((events) => console.log({ events }))
      .catch((e) => console.log(e));
  }, [provider, address]);
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return <div>Index</div>;
};

export default Index;
