import { fromUnits, prettyFormatNumber } from "../../utils/numbers";
import ETHPriceColored from "../ETHPriceColored";
import { InfoRow, InfoRowValue } from "../InfoRow";
import PurpleSectionLabel from "../purple-section/PurpleSectionLabel";
import { useRefinance } from "../RefinanceModal/state/useRefinance";

const OwedOrAvailable = () => {
  const { formState } = useRefinance();
  const isOwed = formState.downPayment.gt(0);

  return (
    <InfoRow className="refi-owed-or-available">
      <PurpleSectionLabel>Amount Owed/Available</PurpleSectionLabel>
      <InfoRowValue>
        <ETHPriceColored
          price={prettyFormatNumber(fromUnits(formState.downPayment.mul(-1)))}
          color={isOwed ? "red" : "green"}
        />
      </InfoRowValue>
    </InfoRow>
  );
};

export default OwedOrAvailable;
