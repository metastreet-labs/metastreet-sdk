import { BWLToken } from "meta-street/types";
import Divider from "../Divider";
import ETHPrice from "../ETHPrice";
import { InfoRowLabel, InfoRowValue } from "../InfoRow";
import TokenImage from "../TokenImage";

type SingleTokenInfoProps = {
  token: BWLToken;
};

const SingleTokenInfo = (props: SingleTokenInfoProps) => {
  const { token } = props;

  return (
    <div className="flex space-x-4">
      <TokenImage className="h-28 w-28" src={token.tokenImage} />
      <div className="flex flex-grow flex-col justify-center space-y-2">
        <div className="flex">
          <InfoRowLabel className="font-semibold text-msPrimaryLight">{token.collectionName}</InfoRowLabel>
          <InfoRowValue className="font-medium">#{token.tokenID}</InfoRowValue>
        </div>
        <Divider />
        <div className="flex">
          <InfoRowLabel>Purchase Price</InfoRowLabel>
          <InfoRowValue>
            <ETHPrice price={token.tokenPrice} />
          </InfoRowValue>
        </div>
      </div>
    </div>
  );
};

export default SingleTokenInfo;
