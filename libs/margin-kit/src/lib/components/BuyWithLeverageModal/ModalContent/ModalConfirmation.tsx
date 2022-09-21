import TransactionSteps from "../../TransactionSteps";
import useBuyWithLeverage from "../state/useBuyWithLeverage";

interface ModalConfirmationProps {
  onClose: () => void;
}

const ModalConfirmation = (props: ModalConfirmationProps) => {
  const { onClose } = props;
  const { transactionState } = useBuyWithLeverage();

  return <TransactionSteps state={transactionState} onClose={onClose} />;
};

export default ModalConfirmation;
