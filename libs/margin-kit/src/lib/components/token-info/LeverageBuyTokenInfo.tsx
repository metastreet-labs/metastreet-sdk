import { LeverageBuy } from "@metastreet-labs/margin-core";
import { useTokenMetadata } from "../../lib/hooks/fetchers/useTokenMetadata";
import { daysFromSeconds } from "../../utils/dates";
import { fromUnits, prettyFormatNumber } from "../../utils/numbers";
import Divider from "../Divider";
import ETHPrice from "../ETHPrice";
import { InfoRow, InfoRowLabel, InfoRowValue } from "../InfoRow";
import LoadingText from "../LoadingText";
import TokenImage from "../TokenImage";

interface RefinanceTokenInfo {
  leverageBuy: LeverageBuy;
}

const RefinanceTokenInfo = (props: RefinanceTokenInfo) => {
  const { leverageBuy } = props;
  const { data } = useTokenMetadata(leverageBuy.tokenURI);

  const { tokenID, purchasePrice } = leverageBuy;
  const tokenPrice = prettyFormatNumber(fromUnits(purchasePrice));
  const repayment = prettyFormatNumber(fromUnits(leverageBuy.repayment));
  const remainingDuration = daysFromSeconds(leverageBuy.maturity - new Date().getTime() / 1000);

  return (
    <div className="bwl-modal-content-token-info-single">
      <TokenImage className="bwl-modal-content-token-info-single-image" src={data?.image} />
      <div className="bwl-modal-content-token-info-single-rows">
        <InfoRow>
          <InfoRowLabel variant="primary" className="bwl-modal-content-token-info-single-collection-name">
            {data?.name ?? <LoadingText />}
          </InfoRowLabel>
          <InfoRowValue className="bwl-modal-content-token-info-single-token-id">#{tokenID}</InfoRowValue>
        </InfoRow>
        <Divider />
        <InfoRow>
          <InfoRowLabel>Purchase Price</InfoRowLabel>
          <InfoRowValue>
            <ETHPrice price={tokenPrice} />
          </InfoRowValue>
        </InfoRow>
        <InfoRow>
          <InfoRowLabel>Repayment Amount</InfoRowLabel>
          <InfoRowValue>
            <ETHPrice price={repayment} />
          </InfoRowValue>
        </InfoRow>
        <InfoRow>
          <InfoRowLabel>Remaining Duration</InfoRowLabel>
          <InfoRowValue className="important-text">{remainingDuration} days</InfoRowValue>
        </InfoRow>
      </div>
    </div>
  );
};

export default RefinanceTokenInfo;
