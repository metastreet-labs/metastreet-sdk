import { cancelListing, LeverageBuy, Marketplace, Order } from "@metastreet-labs/margin-core";
import { ListForSaleModal, RefinanceModal, useDeployment, useLeverageBuys } from "@metastreet-labs/margin-kit";
import { ethers } from "ethers";
import { useState } from "react";
import { useNetwork, useQuery, useSigner } from "wagmi";
import Button from "./Button";

const PositionsSection = () => {
  const { data } = useLeverageBuys();
  return (
    <section className="flex flex-col space-y-2">
      <h1 className="text-2xl font-bold">Your Positions</h1>
      <table className="border-spacing-y-2 border-spacing-x-4 border border-separate">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Refi</th>
            <th>List</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((lb) => (
            <LBRow leverageBuy={lb} key={lb.escrowID} />
          ))}
        </tbody>
      </table>
    </section>
  );
};

interface LBRowProps {
  leverageBuy: LeverageBuy;
}

const LBRow = (props: LBRowProps) => {
  const { leverageBuy } = props;
  const { data } = useTokenMetadata(leverageBuy.tokenURI);
  const [refiModalOpen, setRefiModalOpen] = useState(false);
  const [lfsModalOpen, setLSFModalOpen] = useState(false);
  const { chain } = useNetwork();
  const { data: signer } = useSigner();
  const deployment = useDeployment();

  const postOrderToOpensea = async (order: Order) => {
    if (chain?.id != 5) throw new Error("postOrderToOpensea is implemented on goerli only");

    const headers: HeadersInit = { "content-type": "application/json", accept: "application/json" };
    const body = JSON.stringify({ parameters: order, signature: "0x" });
    const response = await fetch("https://testnets-api.opensea.io/v2/orders/goerli/seaport/listings", {
      method: "POST",
      headers,
      body,
    });
    const json = await response.json();
    if (!response.ok) throw json;
  };

  const _cancelListing = () => {
    if (!signer) throw new Error("cancelListing called without a signer");
    if (!leverageBuy.listingData) throw new Error("cancelListing called on a non listed LeverageBuy");
    if (!deployment) throw new Error("cancelListing was called without a deployment");
    cancelListing({
      signer,
      lbWrapperAddress: deployment.lbWrapperAddress,
      escrowID: leverageBuy.escrowID,
      marketplace: Marketplace.Seaport,
      listingData: leverageBuy.listingData.raw,
    });
  };

  let listingTimeRemaining: number | undefined;
  if (leverageBuy.listingData) {
    listingTimeRemaining = Math.floor((leverageBuy.listingData.endTime - new Date().getTime() / 1000) / 86400);
  }

  return (
    <tr>
      <td>
        <img src={data?.image} alt="" className="w-10 h-10" />
      </td>
      <td>
        {data?.name ?? "..."} #{leverageBuy.tokenID}
      </td>
      <td>
        <Button onClick={() => setRefiModalOpen(true)}>Refinance</Button>
        <RefinanceModal isOpen={refiModalOpen} onClose={() => setRefiModalOpen(false)} leverageBuy={leverageBuy} />
      </td>
      {leverageBuy.listingData && listingTimeRemaining && listingTimeRemaining >= 0 ? (
        <td>
          Listed for {ethers.utils.formatEther(leverageBuy.listingData.listingPrice)} ETH,{" "}
          <Button onClick={_cancelListing}>Delist</Button>
        </td>
      ) : (
        <td>
          Not Listed, <Button onClick={() => setLSFModalOpen(true)}>List</Button>
          <ListForSaleModal
            isOpen={lfsModalOpen}
            onClose={() => setLSFModalOpen(false)}
            leverageBuy={leverageBuy}
            postOrderToOpensea={postOrderToOpensea}
          />
        </td>
      )}
    </tr>
  );
};

const ipfsToHTTPS = (url: string) => {
  if (url.startsWith("ipfs://")) return `https://ipfs.io/${url.substring(7)}`;
  if (url.startsWith("ipfs://ipfs/")) return `https://ipfs.io/ipfs/${url.substring(7)}`;
  return url;
};

interface TokenMetadata {
  name?: string;
  image?: string;
  description?: string;
}

const useTokenMetadata = (tokenURI: string) => {
  const url = ipfsToHTTPS(tokenURI);
  const fetcher = async () => {
    const response = await fetch(url);
    const json = await response.json();
    if (!response.ok) throw json;
    return json;
  };
  return useQuery<TokenMetadata, unknown>(["token-metadata", url], fetcher);
};

export default PositionsSection;
