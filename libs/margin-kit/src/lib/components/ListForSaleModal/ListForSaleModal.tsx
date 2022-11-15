import { LeverageBuy } from "@metastreet-labs/margin-core";
import MetaStreetDeploymentProvider from "../MetaStreetDeploymentProvider/MetaStreetDeploymentProvider";
import MetaStreetModal, { ModalState } from "../MetaStreetModal";
import ModalLoadingOrError from "../ModalLoadingOrError";
import FeesProvider from "./FeesProvider";
import ListForSaleModalContent from "./ListForSaleModalContent";
import ListForSaleProvider from "./state/ListForSaleProvider";
import { UseListForSaleTransactionParams } from "./state/useListForSaleTransaction";

type ListForSaleModal = ModalState & {
  leverageBuy: LeverageBuy;
  postOrderToOpensea: UseListForSaleTransactionParams["postOrderToOpenSea"];
};

export const ListForSaleModal = (props: ListForSaleModal) => {
  const { isOpen, onClose, leverageBuy, postOrderToOpensea } = props;

  return (
    <MetaStreetModal isOpen={isOpen} onClose={onClose}>
      <MetaStreetModal.Body onClose={onClose}>
        <MetaStreetDeploymentProvider errorComponent={<ModalLoadingOrError error="Unsupported chain" />}>
          <FeesProvider collectionAddress={leverageBuy.collectionAddress}>
            <ListForSaleProvider leverageBuy={leverageBuy} postOrderToOpenSea={postOrderToOpensea}>
              <ListForSaleModalContent />
            </ListForSaleProvider>
          </FeesProvider>
        </MetaStreetDeploymentProvider>
      </MetaStreetModal.Body>
    </MetaStreetModal>
  );
};
