import { BuyWithLeverage, BWLToken, useDeployment } from "@metastreet-labs/margin-kit";
import { useState } from "react";
import Button from "./Button";
import Input from "./Input";

const BuyWithLeverageSection = () => {
  // deployment object, grabbed from the DeploymentProvider that wraps the app
  const deployment = useDeployment();
  // value of the collection address input, defaults to Goerli's MultiFaucet NFT
  const [collectionAddress, setCollectionAddress] = useState("0xf5de760f2e916647fd766b4ad9e85ff943ce3a2b");
  // value of the token IDs input, defaults to 3 random token IDs
  const [tokenIDs, setTokenIDs] = useState("958576,1390026,940282");
  // the fetched tokens
  const [tokens, setTokens] = useState<BWLToken[]>([]);

  // called when the fetch button is clicked
  // it fetches NFT objects based on the entered collection address and token IDs
  const fetchToken = async () => {
    // if deployment is undefined, either it's an unsupported network,
    // or there was no DeploymentProvider up the component tree
    if (!deployment) throw new Error("Deployment is undefined (unsupported network)");
    // construct query params
    const params = new URLSearchParams();
    const tokenIDsArray = tokenIDs.split(",");
    tokenIDsArray.forEach((id) => params.append("tokens", `${collectionAddress}:${id}`));
    // make the call to reservoir API, we use this endpoint: https://docs.reservoir.tools/reference/gettokensv5
    // it's not required to fetch tokens from reservoir API, they can be fetched from any other supported marketplace API.
    const url = `${deployment.reservoirURL}/tokens/v5?${params}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      // Construct BWLTokens from the fetched tokens
      const tokens = (data.tokens as any[])
        .map((token) => {
          // required fields
          const tokenID = token?.token?.tokenId;
          const tokenPrice = token?.market?.floorAsk?.price?.amount?.decimal;
          const collectionAddress = token?.token?.contract;
          // Optional fields
          const tokenImage = token?.token?.image ?? "/token-image-placeholder.png";
          const collectionName = token?.token?.collection?.name ?? "Unnamed";
          // add the token to the array if all required fields are present
          if (tokenID != undefined && tokenPrice && collectionAddress) {
            return {
              tokenID,
              tokenPrice,
              collectionAddress,
              tokenImage,
              collectionName,
            };
          }
          // otherwise undefined will be added to the array
        })
        // remove all undefined values from the array
        .filter((token) => token != undefined) as BWLToken[];
      // save the fetched tokens in state
      setTokens(tokens);
    }
  };

  return (
    <section className="flex flex-col space-y-1">
      <h2 className="text-2xl font-bold">Buy With Leverage</h2>
      <div className="flex space-x-2 items-center">
        {/* The collection address input */}
        <span>Collection address:</span>
        <Input value={collectionAddress} onChange={(e) => setCollectionAddress(e.target.value)} />
        {/* The tokenIDs input */}
        <span>tokenIDs (comma separated): </span>
        <Input value={tokenIDs} onChange={(e) => setTokenIDs(e.target.value)} />
        {/* the fetch button */}
        <Button type="button" onClick={fetchToken}>
          Fetch tokens
        </Button>
      </div>
      <div className="flex items-start">
        Fetched tokens:
        {/* if there are fetched tokens, display them in a list. If not, display "none" */}
        {tokens.length ? (
          <div className="flex flex-col ml-4 space-y-1">
            {tokens.map((token) => (
              <TokenRow token={token} key={token.tokenID} />
            ))}
          </div>
        ) : (
          "none"
        )}
        {/* this wraps a BuyWithLeverageButton and BuyWithLeverageModal components */}
        <BuyWithLeverage tokens={tokens} className="w-56 ml-4" />
      </div>
    </section>
  );
};

interface TokenRowProps {
  token: BWLToken;
}

// TokenRow is just a component representing a single fetched NFT
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
