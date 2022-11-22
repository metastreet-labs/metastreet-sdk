import TransactionSteps from "../../TransactionSteps";
import { useRefinance } from "../state/useRefinance";

interface RefinanceModalTransactionProps {
  onClose: () => void;
}

const RefinanceModalTransaction = (props: RefinanceModalTransactionProps) => {
  const { transactionState } = useRefinance();

  return <TransactionSteps state={transactionState} onClose={props.onClose} />;
};

export default RefinanceModalTransaction;
