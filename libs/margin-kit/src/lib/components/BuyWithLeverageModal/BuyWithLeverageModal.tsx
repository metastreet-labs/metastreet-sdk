import { ReactNode, useState } from "react";
import { BWLToken } from "../../types";
import { toUnits } from "../../utils/numbers";
import DefinedDeploymentProvider from "../DefinedDeploymentProvider";
import MetaStreetModal, { ModalState } from "../MetaStreetModal";
import ModalLoadingOrError from "../ModalLoadingOrError";
import LoanInfoContainer from "./containers/LoanInfoContainer";
import ModalContent from "./ModalContent";
import { BuyWithLeverageProvider } from "./state/BuyWithLeverageProvider";

type BuyWithLeverageModalProps = ModalState & {
  tokens: BWLToken[];
  title?: ReactNode;
  onBuySuccess?: () => void;
};

const BuyWithLeverageModal = (props: BuyWithLeverageModalProps) => {
  const { isOpen, onClose, title, onBuySuccess } = props;
  const preventClose = false;
  // TODO: this should be handled on the app side
  // the cart is cleared after a successful purchase. so we need to keep a local copy of the tokens in state.
  // otherwise, the modal will instantly disappear after the transaction has completed.
  const [tokens] = useState(props.tokens);

  if (!tokens.length) return null;

  const { collectionAddress, tokenID } = tokens[0];
  const totalPrice = tokens.reduce((s, t) => s + t.tokenPrice, 0);
  const totalPriceUnits = toUnits(totalPrice).toString();
  return (
    <MetaStreetModal isOpen={isOpen} onClose={onClose}>
      <MetaStreetModal.Body onClose={onClose} hideCloseButton={preventClose}>
        <DefinedDeploymentProvider errorComponent={<ModalLoadingOrError error="Unsupported chain" />}>
          <LoanInfoContainer collectionAddress={collectionAddress} tokenID={tokenID} flashLoanAmount={totalPriceUnits}>
            {({ limits, flashFee }) => (
              <BuyWithLeverageProvider tokens={tokens} limits={limits} flashFee={flashFee} onBuySuccess={onBuySuccess}>
                <ModalContent title={title} onClose={onClose} />
              </BuyWithLeverageProvider>
            )}
          </LoanInfoContainer>
        </DefinedDeploymentProvider>
      </MetaStreetModal.Body>
    </MetaStreetModal>
  );
};

export default BuyWithLeverageModal;
