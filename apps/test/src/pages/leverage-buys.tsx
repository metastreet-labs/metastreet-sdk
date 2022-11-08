import { LeverageBuy } from "@metastreet-labs/margin-core";
import { useLeverageBuys } from "@metastreet-labs/margin-kit";
import { NextPage } from "next";
import { useState } from "react";
import { useQuery } from "wagmi";

const LeverageBuysPage: NextPage = () => {
  const { data } = useLeverageBuys();
  return (
    <table className="border-spacing-y-2 border-spacing-x-4 border border-separate">
      <tr>
        <th>Image</th>
        <th>Collection Name</th>
        <th>Token ID</th>
        <th></th>
      </tr>
      {data?.map((lb) => (
        <LBRow leverageBuy={lb} key={lb.escrowID} />
      ))}
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
      </td>
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
