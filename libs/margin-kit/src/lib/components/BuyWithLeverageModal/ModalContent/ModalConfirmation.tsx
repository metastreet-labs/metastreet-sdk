import TransactionSteps from "meta-street/components/TransactionSteps";
import useBuyWithLeverage from "../state/useBuyWithLeverage";

type ModalConfirmationProps = {
  onClose: () => void;
};

const ModalConfirmation = (props: ModalConfirmationProps) => {
  const { onClose } = props;
  const { transactionState } = useBuyWithLeverage();

  return <TransactionSteps state={transactionState} onClose={onClose} />;
};

export default ModalConfirmation;
