import { ReactNode, useState } from "react";
import { BWLToken } from "../../types";
import MetaStreetModal, { ModalState } from "../MetaStreetModal";
import LoanInfoContainer from "./containers/LoanInfoContainer";
import ModalContent from "./ModalContent";
import BuyWithLeverageProvider from "./state/BuyWithLeverageProvider";

type BuyWithLeverageModalProps = ModalState & {
  tokens: BWLToken[];
  title?: ReactNode;
  onBuySuccess?: () => void;
};

const BuyWithLeverageModal = (props: BuyWithLeverageModalProps) => {
  const { isOpen, onClose, title, onBuySuccess } = props;
  const preventClose = false;
  // the cart is cleared after a successful purchase. so we need to keep a local copy of the tokens in state.
  // otherwise, the modal will instantly disappear after the transaction has completed.
  const [tokens] = useState(props.tokens);

  if (!tokens.length) return null;

  return (
    <MetaStreetModal isOpen={isOpen} onClose={onClose}>
      <MetaStreetModal.Body onClose={onClose} hideCloseButton={preventClose}>
        <LoanInfoContainer tokens={tokens}>
          {({ limits, flashFee }) => (
            <BuyWithLeverageProvider tokens={tokens} limits={limits} flashFee={flashFee} onBuySuccess={onBuySuccess}>
              <ModalContent title={title} onClose={onClose} />
            </BuyWithLeverageProvider>
          )}
        </LoanInfoContainer>
      </MetaStreetModal.Body>
    </MetaStreetModal>
  );
};

export default BuyWithLeverageModal;
