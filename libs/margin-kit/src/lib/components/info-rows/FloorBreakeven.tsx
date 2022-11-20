import { ReactNode } from "react";
import useMetaStreetDeployment from "../../hooks/useMetaStreetDeployment";
import useFeesQuery from "../../lib/hooks/useFeesQuery";
import { prettyFormatNumber } from "../../utils/numbers";
import ETHPrice from "../ETHPrice";
import QuestionMarkCircleIcon from "../icons/QuestionMarkCircleIcon";
import { InfoRow, InfoRowLabel, InfoRowValue } from "../InfoRow";
import LoadingText from "../LoadingText";
import Tooltip from "../Tooltip";

interface FloorBreakevenProps {
  collectionAddress: string;
  downPayment: number;
  repayment: number | undefined;
  tokenCount: number;
  label: ReactNode;
}

const FloorBreakeven = (props: FloorBreakevenProps) => {
  const { collectionAddress, downPayment, repayment, tokenCount, label } = props;
  const { chainID } = useMetaStreetDeployment();
  const { data: fees } = useFeesQuery({ collectionAddress, chainID });

  let floorBreakeven: ReactNode;
  if (repayment && fees) {
    const floorBreakevenWithoutFees = (downPayment + repayment) / tokenCount;
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
        {label}
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
