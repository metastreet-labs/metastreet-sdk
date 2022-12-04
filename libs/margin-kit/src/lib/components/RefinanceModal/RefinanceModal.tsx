import { LeverageBuy } from "@metastreet-labs/margin-core";
import { useAccount, useClient } from "wagmi";
import { useDeployment } from "../../hooks/useDeployment";
import { useLeverageBuyEventsQKs } from "../../lib/hooks/fetchers/subgraph/useLeverageBuyEvents";
import { useLeverageBuysQKs } from "../../lib/hooks/fetchers/subgraph/useLeverageBuys";
import LoanInfoContainer from "../BuyWithLeverageModal/containers/LoanInfoContainer";
import DefinedDeploymentProvider from "../DefinedDeploymentProvider";
import MetaStreetModal, { ModalState } from "../MetaStreetModal";
import ModalLoadingOrError from "../ModalLoadingOrError";
import RefinanceModalContent from "./RefinanceModalContent/RefinanceModalContent";
import { RefinanceProvider } from "./state/RefinanceProvider";

type RefinanceModalProps = ModalState & {
  leverageBuy: LeverageBuy;
  onSuccess?: () => void;
  onError?: (e: unknown) => void;
};

export const RefinanceModal = (props: RefinanceModalProps) => {
  const { isOpen, onClose: ogOnClose, leverageBuy, ...callbacks } = props;
  const { queryClient } = useClient();
  const deployment = useDeployment();
  const { address } = useAccount();

  const onClose = async () => {
    ogOnClose();
    if (deployment && address) {
      queryClient.invalidateQueries(useLeverageBuysQKs.owner(deployment.subgraphURI, address));
      queryClient.invalidateQueries(useLeverageBuyEventsQKs.owner(deployment.subgraphURI, address));
    }
  };

  return (
    <MetaStreetModal isOpen={isOpen} onClose={onClose}>
      <MetaStreetModal.Body onClose={onClose} className="refi-modal-body">
        <DefinedDeploymentProvider errorComponent={<ModalLoadingOrError error="Unsupported chain" />}>
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
        </DefinedDeploymentProvider>
      </MetaStreetModal.Body>
    </MetaStreetModal>
  );
};
