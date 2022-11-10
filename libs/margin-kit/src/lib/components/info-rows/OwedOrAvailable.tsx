import classNames from "classnames";
import { fromUnits, prettyFormatNumber } from "../../utils/numbers";
import ETHPrice from "../ETHPrice";
import { InfoRow, InfoRowValue } from "../InfoRow";
import PurpleSectionLabel from "../purple-section/PurpleSectionLabel";
import useRefinance from "../RefinanceModal/state/useRefinance";

const OwedOrAvailable = () => {
  const { formState } = useRefinance();
  const isOwed = formState.downPayment.gt(0);

  return (
    <InfoRow className="refi-amount">
      <PurpleSectionLabel>Amount Owed/Available</PurpleSectionLabel>
      <InfoRowValue>
        <ETHPrice
          price={prettyFormatNumber(fromUnits(formState.downPayment.mul(-1)))}
          className={classNames("refi-amount-value", {
            "refi-amount-value-owed": isOwed,
            "refi-amount-value-available": !isOwed,
          })}
        />
      </InfoRowValue>
    </InfoRow>
  );
};

export default OwedOrAvailable;
