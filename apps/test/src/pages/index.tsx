import {
  DEPLOYMENTS,
  getLeverageBuy,
  getLeverageBuyEvents,
  getSupportedCollections,
} from "@metastreet-labs/margin-core";
import { useEffect } from "react";
import { useAccount, useProvider } from "wagmi";

const Index = () => {
  const provider = useProvider();
  const { address } = useAccount();

  useEffect(() => {
    const deployment = DEPLOYMENTS[provider.network.chainId];
    const params = { signerOrProvider: provider, deployment };
    getSupportedCollections(params).then((sc) => console.log(sc));
    getLeverageBuy({ escrowID: "50", ...params }).then((json) => console.log({ json }));
    getLeverageBuyEvents({ ...params, owner: address, skip: 0, first: 5 }).then((events) => console.log({ events }));
  }, [provider, address]);
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return <div>Index</div>;
};

export default Index;
