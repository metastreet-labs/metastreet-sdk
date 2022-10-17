import { ReactNode } from "react";
import useDefinedMetaStreetDeployment from "../../hooks/useDefinedMetaStreetDeployment";
import useFeesQuery from "../../lib/hooks/useFeesQuery";
import { prettyFormatNumber } from "../../utils/numbers";
import useBuyWithLeverage from "../BuyWithLeverageModal/state/useBuyWithLeverage";
import ETHPrice from "../ETHPrice";
import QuestionMarkCircleIcon from "../icons/QuestionMarkCircleIcon";
import { InfoRow, InfoRowLabel, InfoRowValue } from "../InfoRow";
import LoadingText from "../LoadingText";
import Tooltip from "../Tooltip";

const FloorBreakeven = () => {
  const { chainID } = useDefinedMetaStreetDeployment();
  const { formState, tokens } = useBuyWithLeverage();
  const { totalDownPayment, totalRepayment } = formState;
  const { collectionAddress } = tokens[0];
  const { data: fees } = useFeesQuery({ collectionAddress, chainID });

  let floorBreakeven: ReactNode;
  if (totalRepayment && fees) {
    const floorBreakevenWithoutFees = (totalDownPayment + totalRepayment) / tokens.length;
    const openSeaFee = (floorBreakevenWithoutFees * fees.opensea.bps) / 10000;
    const royalty = (floorBreakevenWithoutFees * fees.royalty.bps) / 10000;
    const floorBreakevenAmount = prettyFormatNumber(floorBreakevenWithoutFees + openSeaFee + royalty);
    floorBreakeven = <ETHPrice price={floorBreakevenAmount} />;
  } else {
    floorBreakeven = <LoadingText />;
  }

  return (
    <InfoRow className="bwl-modal-form-floor-breakeven">
      <InfoRowLabel>
        {tokens.length > 1 ? "Floor Breakeven (Per Asset)" : "Floor Breakeven"}
        <Tooltip
          className="cursor-help ml-1"
          trigger={<QuestionMarkCircleIcon className="w-4 h-4" />}
          tooltipText="Includes OpenSea fees and royalties"
        />
      </InfoRowLabel>
      <InfoRowValue>{floorBreakeven}</InfoRowValue>
    </InfoRow>
  );
};

export default FloorBreakeven;
