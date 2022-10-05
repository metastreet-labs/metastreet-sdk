import { DEPLOYMENTS } from "@metastreet-labs/margin-core";
import { BuyWithLeverage, BWLToken } from "@metastreet-labs/margin-kit";
import { NextPage } from "next";
import { useState } from "react";
import { useProvider } from "wagmi";

const BWLPage: NextPage = () => {
  const provider = useProvider();
  const deployment = DEPLOYMENTS[provider.network.chainId];
  const [collectionAddress, setCollectionAddress] = useState("0xf5de760f2e916647fd766b4ad9e85ff943ce3a2b");
  const [tokenID, setTokenID] = useState("940282");

  const [token, setToken] = useState<BWLToken>();
  const [fetchStatus, setFetchStatus] = useState<"idle" | "loading" | "error">("idle");

  const fetchToken = async () => {
    setFetchStatus("loading");
    const url = `${deployment.reservoirURL}/tokens/v5?tokens=${collectionAddress}:${tokenID}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      const token = data.tokens[0];
      // required fields
      const tokenID = token?.token?.tokenId;
      const tokenPrice = token?.market?.floorAsk?.price?.amount?.decimal;
      const collectionAddress = token?.token?.contract;
      // Optional fields
      const tokenImage = token?.token?.image ?? "/token-image-placeholder.png";
      const collectionName = token?.token?.collection?.name ?? "Unnamed";
      if (tokenID && tokenPrice && collectionAddress) {
        setToken({
          tokenID,
          tokenPrice,
          collectionAddress,
          tokenImage,
          collectionName,
        });
        setFetchStatus("idle");
        return;
      }
    }
    setFetchStatus("error");
  };

  return (
    <div className="flex flex-col">
      <div className="flex space-x-2">
        <span>Collection address</span>
        <input value={collectionAddress} onChange={(e) => setCollectionAddress(e.target.value)} />
      </div>
      <div className="flex space-x-2">
        <span>tokenID</span>
        <input value={tokenID} onChange={(e) => setTokenID(e.target.value)} />
      </div>
      <button type="button" onClick={fetchToken}>
        Fetch token
      </button>
      <div className="flex items-center">Fetched token: {token ? <TokenRow token={token} /> : fetchStatus}</div>
      <BuyWithLeverage tokens={token ? [token] : []} />
    </div>
  );
};

interface TokenRowProps {
  token: BWLToken;
}

const TokenRow = (props: TokenRowProps) => {
  const { token } = props;

  return (
    <div className="flex items-center space-x-3">
      <img alt="" className="h-12 w-12" src={token.tokenImage} />
      <div className="flex flex-col text-sm">
        <span className="font-semibold text-msPrimaryLight">
          {token.collectionName}
          <span className="text-xs font-normal text-gray-500"> #{token.tokenID}</span>
        </span>
        <span>{token.tokenPrice} ETH</span>
      </div>
    </div>
  );
};

export default BWLPage;
