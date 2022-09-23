import { BWLToken } from "../../types";
import Divider from "../Divider";
import ETHPrice from "../ETHPrice";
import { InfoRow, InfoRowLabel, InfoRowValue } from "../InfoRow";
import TokenImage from "../TokenImage";

interface SingleTokenInfoProps {
  token: BWLToken;
}

const SingleTokenInfo = (props: SingleTokenInfoProps) => {
  const { token } = props;

  return (
    <div className="bwl-modal-content-token-info-single">
      <TokenImage className="bwl-modal-content-token-info-single-image" src={token.tokenImage} />
      <div className="bwl-modal-content-token-info-single-rows">
        <InfoRow>
          <InfoRowLabel variant="primary" className="bwl-modal-content-token-info-single-collection-name">
            {token.collectionName}
          </InfoRowLabel>
          <InfoRowValue className="bwl-modal-content-token-info-single-token-id">#{token.tokenID}</InfoRowValue>
        </InfoRow>
        <Divider />
        <InfoRow>
          <InfoRowLabel>Purchase Price</InfoRowLabel>
          <InfoRowValue>
            <ETHPrice price={token.tokenPrice} />
          </InfoRowValue>
        </InfoRow>
      </div>
    </div>
  );
};

export default SingleTokenInfo;
