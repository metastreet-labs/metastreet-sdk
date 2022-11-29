import { LeverageBuy } from "@metastreet-labs/margin-core";
import { useAccount, useClient } from "wagmi";
import { useDeployment } from "../../hooks/useDeployment";
import { useLeverageBuyEventsQKs } from "../../lib/hooks/fetchers/subgraph/useLeverageBuyEvents";
import { useLeverageBuysQKs } from "../../lib/hooks/fetchers/subgraph/useLeverageBuys";
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
