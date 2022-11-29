import { LeverageBuy } from "@metastreet-labs/margin-core";
import { useCloseThenInvalidate } from "../../hooks/useCloseThenInvalidate";
import DefinedDeploymentProvider from "../DefinedDeploymentProvider";
import MetaStreetModal, { ModalState } from "../MetaStreetModal";
import ModalLoadingOrError from "../ModalLoadingOrError";
import FeesProvider from "./FeesProvider";
import ListForSaleModalContent from "./ListForSaleModalContent";
import { ListForSaleProvider } from "./state/ListForSaleProvider";
import { UseListForSaleTransactionParams } from "./state/useListForSaleTransaction";

type ListForSaleModal = ModalState & {
  leverageBuy: LeverageBuy;
  postOrderToOpensea: UseListForSaleTransactionParams["postOrderToOpenSea"];
};

export const ListForSaleModal = (props: ListForSaleModal) => {
  const { isOpen, onClose: ogOnClose, leverageBuy, postOrderToOpensea } = props;
  const onClose = useCloseThenInvalidate(ogOnClose);

  return (
    <MetaStreetModal isOpen={isOpen} onClose={onClose}>
      <MetaStreetModal.Body onClose={onClose} className="refi-modal-body">
        <DefinedDeploymentProvider errorComponent={<ModalLoadingOrError error="Unsupported chain" />}>
          <FeesProvider collectionAddress={leverageBuy.collectionAddress}>
            <ListForSaleProvider leverageBuy={leverageBuy} postOrderToOpenSea={postOrderToOpensea}>
              <ListForSaleModalContent onClose={onClose} />
            </ListForSaleProvider>
          </FeesProvider>
        </DefinedDeploymentProvider>
      </MetaStreetModal.Body>
    </MetaStreetModal>
  );
};
