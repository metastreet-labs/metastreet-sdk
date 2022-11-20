import { BuyWithLeverage, BWLToken, useDeployment } from "@metastreet-labs/margin-kit";
import { useState } from "react";
import Button from "./Button";
import Input from "./Input";

const BuyWithLeverageSection = () => {
  const deployment = useDeployment();
  const [collectionAddress, setCollectionAddress] = useState("0xf5de760f2e916647fd766b4ad9e85ff943ce3a2b");
  const [tokenIDs, setTokenIDs] = useState("958576,1390026,940282");
  const [tokens, setTokens] = useState<BWLToken[]>([]);

  const fetchToken = async () => {
    if (!deployment) throw new Error("Deployment is undefined (unsupported network)");
    const params = new URLSearchParams();
    const tokenIDsArray = tokenIDs.split(",");
    tokenIDsArray.forEach((id) => params.append("tokens", `${collectionAddress}:${id}`));
    const url = `${deployment.reservoirURL}/tokens/v5?${params}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      const tokens = (data.tokens as any[])
        .map((token) => {
          // required fields
          const tokenID = token?.token?.tokenId;
          const tokenPrice = token?.market?.floorAsk?.price?.amount?.decimal;
          const collectionAddress = token?.token?.contract;
          // Optional fields
          const tokenImage = token?.token?.image ?? "/token-image-placeholder.png";
          const collectionName = token?.token?.collection?.name ?? "Unnamed";
          if (tokenID != undefined && tokenPrice && collectionAddress) {
            return {
              tokenID,
              tokenPrice,
              collectionAddress,
              tokenImage,
              collectionName,
            };
          }
        })
        .filter((token) => token != undefined) as BWLToken[];
      setTokens(tokens);
    }
  };

  return (
    <section className="flex flex-col space-y-1">
      <h2 className="text-2xl font-bold">Buy With Leverage</h2>
      <div className="flex space-x-2 items-center">
        <span>Collection address:</span>
        <Input value={collectionAddress} onChange={(e) => setCollectionAddress(e.target.value)} />
        <span>tokenIDs (comma separated): </span>
        <Input value={tokenIDs} onChange={(e) => setTokenIDs(e.target.value)} />
        <Button type="button" onClick={fetchToken}>
          Fetch tokens
        </Button>
      </div>
      <div className="flex items-start">
        Fetched tokens:{" "}
        {tokens.length ? (
          <div className="flex flex-col ml-4 space-y-1">
            {tokens.map((token) => (
              <TokenRow token={token} key={token.tokenID} />
            ))}
          </div>
        ) : (
          "none"
        )}
        <BuyWithLeverage tokens={tokens} className="w-56 ml-4" />
      </div>
    </section>
  );
};

interface TokenRowProps {
  token: BWLToken;
}

const TokenRow = (props: TokenRowProps) => {
  const { token } = props;

  return (
    <div className="flex items-center space-x-3">
      <img alt="" className="h-12 w-12 object-cover" src={token.tokenImage} />
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

export default BuyWithLeverageSection;
