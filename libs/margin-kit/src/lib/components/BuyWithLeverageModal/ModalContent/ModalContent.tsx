import Divider from "meta-street/components/Divider";
import MetaStreetModal from "meta-street/components/MetaStreetModal";
import MultiTokenInfo from "meta-street/components/token-info/MultiTokenInfo";
import SingleTokenInfo from "meta-street/components/token-info/SingleTokenInfo";
import { ReactNode } from "react";
import useBuyWithLeverage from "../state/useBuyWithLeverage";
import ModalConfirmation from "./ModalConfirmation";
import ModalForm from "./ModalForm";
import ModalSuccess from "./ModalSuccess";

type ModalContentProps = {
  onClose: () => void;
  title: ReactNode;
};

const ModalContent = (props: ModalContentProps) => {
  const { onClose, title } = props;
  const { transactionState, tokens } = useBuyWithLeverage();
  const { status } = transactionState;
  const success = status == "complete";
  const multi = tokens.length > 1;

  const initialTitle = (
    <>
      {title ?? "Buy with Leverage"}
      {multi && (
        <span className="ml-1 rounded bg-msPrimaryBackground/20 px-2 py-1 text-xs text-msPrimaryDark">
          {tokens.length} tokens
        </span>
      )}
    </>
  );
  const successTitle = <>Congrats!</>;

  const tokenInfo = multi ? <MultiTokenInfo tokens={tokens} /> : <SingleTokenInfo token={tokens[0]} />;

  const successAnimation = null;

  return (
    <div className="flex flex-col">
      <MetaStreetModal.Title className="mb-6">{success ? successTitle : initialTitle}</MetaStreetModal.Title>
      {success ? successAnimation : tokenInfo}
      <Divider className="my-4" />
      {status == "idle" && <ModalForm />}
      {(status == "loading" || status == "error") && <ModalConfirmation onClose={onClose} />}
      {status == "complete" && <ModalSuccess onClose={onClose} />}
    </div>
  );
};

export default ModalContent;
