import TransactionSteps from "../../TransactionSteps";
import { useListForSale } from "../state/ListForSaleContext";

interface ListForSaleModalTransactionProps {
  onClose: () => void;
}

const ListForSaleModalTransaction = (props: ListForSaleModalTransactionProps) => {
  const { transactionState } = useListForSale();

  return <TransactionSteps state={transactionState} onClose={props.onClose} />;
};

export default ListForSaleModalTransaction;
