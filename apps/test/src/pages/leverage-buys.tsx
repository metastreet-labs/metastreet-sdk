import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { LeverageBuy } from "@metastreet-labs/margin-core";
import { useLeverageBuys } from "@metastreet-labs/margin-kit";
import classNames from "classnames";
import { NextPage } from "next";
import { useState } from "react";
import { useQuery } from "wagmi";

const LeverageBuysPage: NextPage = () => {
  const { data } = useLeverageBuys();
  return (
    <div className="w-screen h-screen overflow-hidden bg-black">
      {data?.map((lb) => (
        <LBRow leverageBuy={lb} key={lb.escrowID} />
      ))}
    </div>
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
    <div className="flex items-center text-white space-x-4">
      <TokenImage src={data?.image} className="w-14 h-14 rounded-md" />
      <div className="flex flex-col justify-center font-semibold">
        <span className="text-sm">{data?.name ? data?.name : "..."}</span>
        <span className="text-xs">#{leverageBuy.tokenID}</span>
      </div>
      <button
        className="flex items-center space-x-1 border border-orange-400 rounded px-2 py-1 text-orange-400"
        onClick={() => setRefiModalOpen(true)}
      >
        <ArrowPathIcon className="w-4 h-4" />
        <span>Refinance</span>
      </button>
    </div>
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

interface TokenImageProps {
  src?: string;
  className?: string;
}

const TokenImage = (props: TokenImageProps) => {
  const { src, className } = props;
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={classNames("flex relative overflow-hidden", className)}>
      <img src="/token-image-placeholder.png" alt="" className="object-cover object-center w-full h-full" />
      {src ? (
        <img
          src={src}
          alt=""
          onLoad={() => setLoaded(true)}
          className={classNames("transition-opacity duration-1000 absolute z-10 object-cover w-full h-full", {
            "opacity-0": !loaded,
            "opacity-100": loaded,
          })}
        />
      ) : null}
    </div>
  );
};

export default LeverageBuysPage;
