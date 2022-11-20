import { cancelListing, LeverageBuy, ListingData, Marketplace, Order, repayETH } from "@metastreet-labs/margin-core";
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
            <th>Repay</th>
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
  const { data: signer } = useSigner();
  const deployment = useDeployment();

  const { listingData } = leverageBuy;
  const listingTimeRemaining = listingData && Math.floor((listingData.endTime - new Date().getTime() / 1000) / 86400);
  const isListed = listingData && listingTimeRemaining && listingTimeRemaining > 0;

  const repay = () => {
    if (!signer) throw new Error("repay called without a signer");
    if (!deployment) throw new Error("repay was called without a deployment");
    repayETH({
      escrowID: leverageBuy.escrowID,
      repayment: leverageBuy.repayment,
      signer,
      lbWrapperAddress: deployment.lbWrapperAddress,
    });
  };

  return (
    <tr>
      <td>
        <img src={data?.image} alt="" className="w-10 h-10" />
      </td>
      <td>
        {data?.name ?? "..."} #{leverageBuy.tokenID}
      </td>
      <td>
        <Button onClick={repay}>Repay</Button>
      </td>
      <td>
        <Button onClick={() => setRefiModalOpen(true)}>Refinance</Button>
        <RefinanceModal isOpen={refiModalOpen} onClose={() => setRefiModalOpen(false)} leverageBuy={leverageBuy} />
      </td>
      {isListed ? (
        <ListedLB leverageBuy={{ ...leverageBuy, listingData }} />
      ) : (
        <NotListedLB leverageBuy={leverageBuy} />
      )}
    </tr>
  );
};

interface ListedLBProps {
  leverageBuy: LeverageBuy & { listingData: ListingData };
}

const ListedLB = ({ leverageBuy }: ListedLBProps) => {
  const { chain } = useNetwork();
  const { data: signer } = useSigner();
  const deployment = useDeployment();

  const delist = () => {
    if (!signer) throw new Error("cancelListing called without a signer");
    if (!deployment) throw new Error("cancelListing was called without a deployment");
    if (!leverageBuy.listingData) throw new Error("cancelListing called on a non listed LeverageBuy");
    cancelListing({
      signer,
      lbWrapperAddress: deployment.lbWrapperAddress,
      escrowID: leverageBuy.escrowID,
      marketplace: Marketplace.Seaport,
      listingData: leverageBuy.listingData.raw,
    });
  };

  const OS_MAINNET_BASE_URL = "https://opensea.io/assets/ethereum";
  const OS_GOERLI_BASE_URL = "https://testnets.opensea.io/assets/goerli";
  const OS_BASE_URL = chain?.id == 1 ? OS_MAINNET_BASE_URL : OS_GOERLI_BASE_URL;
  const osURL = `${OS_BASE_URL}/${leverageBuy.collectionAddress}/${leverageBuy.tokenID}`;

  return (
    <>
      Listed for {ethers.utils.formatEther(leverageBuy.listingData.listingPrice)} ETH{" "}
      <a
        href={osURL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-ms-primary-dark hover:text-ms-primary-light font-medium"
      >
        (View on OpenSea)
      </a>
      , <Button onClick={delist}>Delist</Button>
    </>
  );
};

interface NotListedLBProps {
  leverageBuy: LeverageBuy;
}

const NotListedLB = ({ leverageBuy }: NotListedLBProps) => {
  const { chain } = useNetwork();
  const [lfsModalOpen, setLSFModalOpen] = useState(false);

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

  return (
    <>
      Not Listed, <Button onClick={() => setLSFModalOpen(true)}>List</Button>
      <ListForSaleModal
        isOpen={lfsModalOpen}
        onClose={() => setLSFModalOpen(false)}
        leverageBuy={leverageBuy}
        postOrderToOpensea={postOrderToOpensea}
      />
    </>
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
