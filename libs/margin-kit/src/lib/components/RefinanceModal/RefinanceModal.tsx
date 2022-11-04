import { LeverageBuy } from "@metastreet-labs/margin-core";
import LoanInfoContainer from "../BuyWithLeverageModal/containers/LoanInfoContainer";
import MetaStreetDeploymentProvider from "../MetaStreetDeploymentProvider";
import MetaStreetModal, { ModalState } from "../MetaStreetModal";
import RefinanceModalContent from "./RefinanceModalContent/RefinanceModalContent";
import RefinanceProvider from "./state/RefinanceProvider";

type RefinanceModalProps = ModalState & {
  leverageBuy: LeverageBuy;
  onSuccess?: () => void;
  onError?: (e: unknown) => void;
};

export const RefinanceModal = (props: RefinanceModalProps) => {
  const { isOpen, onClose, leverageBuy, ...callbacks } = props;

  return (
    <MetaStreetModal isOpen={isOpen} onClose={onClose}>
      <MetaStreetModal.Body onClose={onClose}>
        <MetaStreetDeploymentProvider
          errorComponent={
            <div className="flex h-56 items-center justify-center">
              <span>Unsupported chain</span>
            </div>
          }
        >
          <LoanInfoContainer
            collectionAddress={leverageBuy.collectionAddress}
            tokenID={leverageBuy.tokenID}
            flashLoanAmount={leverageBuy.repayment}
          >
            {({ limits, flashFee }) => (
              <RefinanceProvider leverageBuy={leverageBuy} limits={limits} flashFee={flashFee} {...callbacks}>
                <RefinanceModalContent onClose={onClose} />
              </RefinanceProvider>
            )}
          </LoanInfoContainer>
        </MetaStreetDeploymentProvider>
      </MetaStreetModal.Body>
    </MetaStreetModal>
  );
};
