import { cancelListing, LeverageBuy, ListingData, Marketplace, Order, repayETH } from "@metastreet-labs/margin-core";
import { ListForSaleModal, RefinanceModal, useDeployment, useLeverageBuys } from "@metastreet-labs/margin-kit";
import { ethers } from "ethers";
import { useState } from "react";
import { useNetwork, useQuery, useSigner } from "wagmi";
import Button from "./Button";

const PositionsSection = () => {
  // a list of all active LeverageBuys (loans) of the connected address
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
  // deployment object, grabbed from the DeploymentProvider that wraps the app
  const deployment = useDeployment();
  // current connected signer
  const { data: signer } = useSigner();
  // token metadata of this leverageBuy's underlying NFT (name, image, ...)
  const { data } = useTokenMetadata(leverageBuy.tokenURI);
  // RefinanceModal state
  const [refiModalOpen, setRefiModalOpen] = useState(false);

  // this leverageBuy's listing data, can be undefined if the underlying NFT is not listed for sale
  const { listingData } = leverageBuy;
  // calculate the remaining time before listing expiration
  const listingTimeRemaining = listingData && Math.floor((listingData.endTime - new Date().getTime() / 1000) / 86400);
  // the NFT is listed if listing data is not undefined, and remaining time is greater than 0
  const isListed = listingData && listingTimeRemaining && listingTimeRemaining > 0;

  // called when the repay button is clicked, it initiates a transaction to repay the loan
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
      {/* this leverageBuy's underlying NFT's image */}
      <td>
        <img src={data?.image} alt="" className="w-10 h-10" />
      </td>
      {/* this leverageBuy's underlying NFT name and ID */}
      <td>
        {data?.name ?? "..."} #{leverageBuy.tokenID}
      </td>
      {/* Repay button */}
      <td>
        <Button onClick={repay}>Repay</Button>
      </td>
      {/* Refinance button and modal */}
      <td>
        <Button onClick={() => setRefiModalOpen(true)}>Refinance</Button>
        <RefinanceModal isOpen={refiModalOpen} onClose={() => setRefiModalOpen(false)} leverageBuy={leverageBuy} />
      </td>
      {/* Render different components depending on whether the NFT is listed or not */}
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

// ListedLB is rendered if the NFT is listed for sale,
// it displays how much it's listed for, as well as a button to cancel the listing
const ListedLB = ({ leverageBuy }: ListedLBProps) => {
  // current chain
  const { chain } = useNetwork();
  // connected signer
  const { data: signer } = useSigner();
  // deployment object, grabbed from the DeploymentProvider that wraps the app
  const deployment = useDeployment();

  // called when the Delist button is clicked, it initiates a transaction to cancel the listing
  const delist = () => {
    if (!signer) throw new Error("cancelListing called without a signer");
    if (!deployment) throw new Error("cancelListing was called without a deployment");
    cancelListing({
      signer,
      lbWrapperAddress: deployment.lbWrapperAddress,
      escrowID: leverageBuy.escrowID,
      marketplace: Marketplace.Seaport,
      listingData: leverageBuy.listingData.raw,
    });
  };

  // construct the OpenSea URL of the listing
  const OS_MAINNET_BASE_URL = "https://opensea.io/assets/ethereum";
  const OS_GOERLI_BASE_URL = "https://testnets.opensea.io/assets/goerli";
  const OS_BASE_URL = chain?.id == 1 ? OS_MAINNET_BASE_URL : OS_GOERLI_BASE_URL;
  const osURL = `${OS_BASE_URL}/${leverageBuy.collectionAddress}/${leverageBuy.tokenID}`;

  return (
    <>
      {/* display the listing price*/}
      Listed for {ethers.utils.formatEther(leverageBuy.listingData.listingPrice)} ETH{" "}
      {/* a link to this listing on OpenSea */}
      <a
        href={osURL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-ms-primary-dark hover:text-ms-primary-light font-medium"
      >
        (View on OpenSea)
      </a>
      , {/* Cancel listing button */}
      <Button onClick={delist}>Delist</Button>
    </>
  );
};

interface NotListedLBProps {
  leverageBuy: LeverageBuy;
}

// NotListedLB is rendered if the NFT is not listed for sale
// it displays a button that opens the ListForSaleModal
const NotListedLB = ({ leverageBuy }: NotListedLBProps) => {
  // current chain
  const { chain } = useNetwork();
  // list for sale modal state
  const [lfsModalOpen, setLSFModalOpen] = useState(false);

  // callback passed to ListForSaleModal, called after the list for sale transaction succeeds
  // it posts the order to OpenSea API, to make it visible on their front end
  const postOrderToOpensea = async (order: Order) => {
    // this is implemented only for Goerli, mainnet needs an API key, and therefore should be handled server side
    if (chain?.id != 5) throw new Error("postOrderToOpensea is implemented on goerli only");
    // request headers
    const headers: HeadersInit = { "content-type": "application/json", accept: "application/json" };
    // request body, signature is not needed, so we pass "0x"
    const body = JSON.stringify({ parameters: order, signature: "0x" });
    // send the POST request to this endpoint https://docs.opensea.io/v2.0/reference/create-an-order-testnets
    const response = await fetch("https://testnets-api.opensea.io/v2/orders/goerli/seaport/listings", {
      method: "POST",
      headers,
      body,
    });
    const json = await response.json();
    // throw if the request fails
    // this will be caught in the ListForSaleModal, and will show an error on the uI
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

// helper function that turns an ipfs url to https, used in the below useTokenMetadata hook
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

// a hook that fetches an NFT metadata, used in the LBRow component
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
