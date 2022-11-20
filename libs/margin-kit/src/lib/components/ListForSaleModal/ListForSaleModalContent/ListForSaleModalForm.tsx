import { fromUnits, prettyFormatNumber } from "../../../utils/numbers";
import ETHPrice from "../../ETHPrice";
import { InfoRow, InfoRowLabel, InfoRowValue } from "../../InfoRow";
import { Input } from "../Input";
import { useListForSale } from "../state/ListForSaleContext";

const ListForSaleModalForm = () => {
  const { leverageBuy } = useListForSale();

  return (
    <>
      <Input />
      <InfoRow>
        <InfoRowLabel>Repayment</InfoRowLabel>
        <InfoRowValue>
          <ETHPrice price={prettyFormatNumber(fromUnits(leverageBuy.repayment))} />
        </InfoRowValue>
      </InfoRow>
    </>
  );
};

export default ListForSaleModalForm;
