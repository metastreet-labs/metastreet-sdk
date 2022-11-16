import { LeverageBuy } from "@metastreet-labs/margin-core";
import MetaStreetModal, { ModalState } from "../MetaStreetModal";
import LeverageBuyTokenInfo from "../token-info/LeverageBuyTokenInfo";

type ListForSaleModal = ModalState & {
  leverageBuy: LeverageBuy;
};

export const ListForSaleModal = (props: ListForSaleModal) => {
  const { isOpen, onClose, leverageBuy } = props;

  return (
    <MetaStreetModal isOpen={isOpen} onClose={onClose}>
      <MetaStreetModal.Body onClose={onClose}>
        <MetaStreetModal.Title>List for Sale</MetaStreetModal.Title>
        <LeverageBuyTokenInfo leverageBuy={leverageBuy} />
      </MetaStreetModal.Body>
    </MetaStreetModal>
  );
};
