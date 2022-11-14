import { LeverageBuy } from "@metastreet-labs/margin-core";
import { RefinanceModal, useLeverageBuys } from "@metastreet-labs/margin-kit";
import { ethers } from "ethers";
import { NextPage } from "next";
import { useState } from "react";
import { useQuery } from "wagmi";

const LeverageBuysPage: NextPage = () => {
  const { data } = useLeverageBuys();
  return (
    <table className="border-spacing-y-2 border-spacing-x-4 border border-separate">
      <thead>
        <tr>
          <th>Image</th>
          <th>Collection Name</th>
          <th>Token ID</th>
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
  );
};

interface LBRowProps {
  leverageBuy: LeverageBuy;
}

const LBRow = (props: LBRowProps) => {
  const { leverageBuy } = props;
  const { data } = useTokenMetadata(leverageBuy.tokenURI);
  const [refiModalOpen, setRefiModalOpen] = useState(false);

  let listingTimeRemaining: number | undefined;
  if (leverageBuy.listingData) {
    listingTimeRemaining = Math.floor((leverageBuy.listingData.endTime - new Date().getTime() / 1000) / 86400);
  }

  return (
    <tr>
      <td>
        <img src={data?.image} alt="" className="w-10 h-10" />
      </td>
      <td>{data?.name ?? "..."}</td>
      <td>{leverageBuy.tokenID}</td>
      <td>
        <button className="border" onClick={() => setRefiModalOpen(true)}>
          Refinance
        </button>
        <RefinanceModal isOpen={refiModalOpen} onClose={() => setRefiModalOpen(false)} leverageBuy={leverageBuy} />
      </td>
      {listingTimeRemaining && listingTimeRemaining >= 0 ? (
        <td>
          Listed for {ethers.utils.formatEther(leverageBuy.listingData.listingPrice)} ETH,{" "}
          <button className="border">Delist</button>
        </td>
      ) : (
        <td>
          Not Listed, <button className="border">List</button>
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

export default LeverageBuysPage;
