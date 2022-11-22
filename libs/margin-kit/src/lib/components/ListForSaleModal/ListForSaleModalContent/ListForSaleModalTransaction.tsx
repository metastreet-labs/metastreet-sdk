import TransactionSteps from "../../TransactionSteps";
import { useListForSale } from "../state/useListForSale";

interface ListForSaleModalTransactionProps {
  onClose: () => void;
}

const ListForSaleModalTransaction = (props: ListForSaleModalTransactionProps) => {
  const { transactionState } = useListForSale();

  return <TransactionSteps state={transactionState} onClose={props.onClose} />;
};

export default ListForSaleModalTransaction;
