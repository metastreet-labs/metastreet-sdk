import { BWLToken } from "../../types";
import ETHPrice from "../ETHPrice";
import { InfoRow, InfoRowLabel, InfoRowValue } from "../InfoRow";
import TokenImage from "../TokenImage";

interface MultiTokenInfoProps {
  tokens: BWLToken[];
}

const MultiTokenInfo = (props: MultiTokenInfoProps) => {
  const { tokens } = props;
  const totalPrice = tokens.reduce((s, t) => s + t.tokenPrice, 0);

  return (
    <div className="bwl-modal-content-token-info-multi">
      <div className="bwl-modal-content-token-info-multi-container">
        {tokens.map((token) => (
          <TokenRow token={token} key={token.tokenID} />
        ))}
      </div>
      <InfoRow className="bwl-modal-content-token-info-multi-price">
        <InfoRowLabel>Total Price</InfoRowLabel>
        <InfoRowValue>
          <ETHPrice price={totalPrice} />
        </InfoRowValue>
      </InfoRow>
    </div>
  );
};

interface TokenRowProps {
  token: BWLToken;
}

const TokenRow = (props: TokenRowProps) => {
  const { token } = props;

  return (
    <div className="bwl-modal-content-token-info-multi-row">
      <TokenImage className="bwl-modal-content-token-info-multi-row-image" src={token.tokenImage} />
      <div className="bwl-modal-content-token-info-multi-row-text-container">
        <span className="bwl-modal-content-token-info-multi-row-text">
          {token.collectionName}
          <span className="bwl-modal-content-token-info-multi-row-text-secondary"> #{token.tokenID}</span>
        </span>
        <ETHPrice price={token.tokenPrice} />
      </div>
    </div>
  );
};

export default MultiTokenInfo;
