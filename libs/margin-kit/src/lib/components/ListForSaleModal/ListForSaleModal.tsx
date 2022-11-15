import { LeverageBuy } from "@metastreet-labs/margin-core";
import MetaStreetDeploymentProvider from "../MetaStreetDeploymentProvider/MetaStreetDeploymentProvider";
import MetaStreetModal, { ModalState } from "../MetaStreetModal";
import ModalLoadingOrError from "../ModalLoadingOrError";
import LeverageBuyTokenInfo from "../token-info/LeverageBuyTokenInfo";
import { Input } from "./Input";

type ListForSaleModal = ModalState & {
  leverageBuy: LeverageBuy;
};

export const ListForSaleModal = (props: ListForSaleModal) => {
  const { isOpen, onClose, leverageBuy } = props;

  return (
    <MetaStreetModal isOpen={isOpen} onClose={onClose}>
      <MetaStreetModal.Body onClose={onClose}>
        <MetaStreetModal.Title>List for Sale</MetaStreetModal.Title>
        <MetaStreetDeploymentProvider errorComponent={<ModalLoadingOrError error="Unsupported chain" />}>
          <LeverageBuyTokenInfo leverageBuy={leverageBuy} />
          <Input />
        </MetaStreetDeploymentProvider>
      </MetaStreetModal.Body>
    </MetaStreetModal>
  );
};
