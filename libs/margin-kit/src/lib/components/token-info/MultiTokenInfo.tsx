import { BWLToken } from "meta-street/types";
import ETHPrice from "../ETHPrice";
import { InfoRowLabel, InfoRowValue } from "../InfoRow";
import TokenImage from "../TokenImage";

type MultiTokenInfoProps = {
  tokens: BWLToken[];
};

const MultiTokenInfo = (props: MultiTokenInfoProps) => {
  const { tokens } = props;
  const totalPrice = tokens.reduce((s, t) => s + t.tokenPrice, 0);

  return (
    <div>
      <div className="flex max-h-[10rem] flex-col space-y-2 overflow-y-auto">
        {tokens.map((token) => (
          <TokenRow token={token} key={token.tokenID} />
        ))}
      </div>
      <div className="mt-4 flex">
        <InfoRowLabel>Total Price</InfoRowLabel>
        <InfoRowValue>
          <ETHPrice price={totalPrice} />
        </InfoRowValue>
      </div>
    </div>
  );
};

type TokenRowProps = {
  token: BWLToken;
};

const TokenRow = (props: TokenRowProps) => {
  const { token } = props;

  return (
    <div className="flex items-center space-x-3">
      <TokenImage className="h-12 w-12" src={token.tokenImage} />
      <div className="flex flex-col text-sm">
        <span className="font-semibold text-msPrimaryLight">
          {token.collectionName}
          <span className="text-xs font-normal text-gray-500"> #{token.tokenID}</span>
        </span>
        <ETHPrice price={token.tokenPrice} />
      </div>
    </div>
  );
};

export default MultiTokenInfo;
