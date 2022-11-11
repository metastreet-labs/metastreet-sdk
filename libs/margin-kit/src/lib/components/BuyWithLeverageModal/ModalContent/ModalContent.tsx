import { ReactNode } from "react";
import Divider from "../../Divider";
import MetaStreetModal from "../../MetaStreetModal";
import MultiTokenInfo from "../../token-info/MultiTokenInfo";
import SingleTokenInfo from "../../token-info/SingleTokenInfo";
import useBuyWithLeverage from "../state/useBuyWithLeverage";
import ModalConfirmation from "./ModalConfirmation";
import ModalForm from "./ModalForm";
import ModalSuccess, { BuyWithLeverageSuccessAnimation } from "./ModalSuccess";

interface ModalContentProps {
  onClose: () => void;
  title: ReactNode;
}

const ModalContent = (props: ModalContentProps) => {
  const { onClose, title } = props;
  const { transactionState, tokens } = useBuyWithLeverage();
  const { status } = transactionState;
  const success = status == "complete";
  const multi = tokens.length > 1;

  const initialTitle = (
    <>
      {title ?? "Buy with Leverage"}
      {multi ? <span className="bwl-modal-content-token-count-badge">{tokens.length} tokens</span> : null}
    </>
  );
  const successTitle = <>Congrats!</>;

  const tokenInfo = multi ? <MultiTokenInfo tokens={tokens} /> : <SingleTokenInfo token={tokens[0]} />;

  return (
    <div className="bwl-modal-content">
      <MetaStreetModal.Title>{success ? successTitle : initialTitle}</MetaStreetModal.Title>
      {success ? <BuyWithLeverageSuccessAnimation /> : tokenInfo}
      <Divider className="bwl-modal-content-divider" />
      {status == "idle" ? <ModalForm /> : null}
      {status == "loading" || status == "error" ? <ModalConfirmation onClose={onClose} /> : null}
      {status == "complete" ? <ModalSuccess onClose={onClose} /> : null}
    </div>
  );
};

export default ModalContent;
