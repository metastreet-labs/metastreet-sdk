import { ReactNode, useState } from "react";
import { useAccount, useClient } from "wagmi";
import { useDeployment } from "../../hooks/useDeployment";
import { useLeverageBuyEventsQKs } from "../../lib/hooks/fetchers/subgraph/useLeverageBuyEvents";
import { useLeverageBuysQKs } from "../../lib/hooks/fetchers/subgraph/useLeverageBuys";
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
  callForActionLink?: string;
  onBuySuccess?: () => void;
};

export const BuyWithLeverageModal = (props: BuyWithLeverageModalProps) => {
  const { isOpen, onClose: ogOnClose, title, callForActionLink, onBuySuccess } = props;
  const preventClose = false;
  // TODO: this should be handled on the app side
  // the cart is cleared after a successful purchase. so we need to keep a local copy of the tokens in state.
  // otherwise, the modal will instantly disappear after the transaction has completed.
  const [tokens] = useState(props.tokens);

  const deployment = useDeployment();
  const { address } = useAccount();
  const { queryClient } = useClient();

  const onClose = () => {
    ogOnClose();
    if (deployment && address) {
      queryClient.invalidateQueries(useLeverageBuysQKs.owner(deployment.subgraphURI, address));
      queryClient.invalidateQueries(useLeverageBuyEventsQKs.owner(deployment.subgraphURI, address));
    }
  };

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
                <ModalContent title={title} callForActionLink={callForActionLink} onClose={onClose} />
              </BuyWithLeverageProvider>
            )}
          </LoanInfoContainer>
        </DefinedDeploymentProvider>
      </MetaStreetModal.Body>
    </MetaStreetModal>
  );
};
