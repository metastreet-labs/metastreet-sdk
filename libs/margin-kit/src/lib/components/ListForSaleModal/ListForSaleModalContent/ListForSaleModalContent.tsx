import Divider from "../../Divider";
import MetaStreetModal from "../../MetaStreetModal";
import LeverageBuyTokenInfo from "../../token-info/LeverageBuyTokenInfo";
import { useListForSale } from "../state/ListForSaleContext";
import ListForSaleModalForm from "./ListForSaleModalForm";
import ListForSaleModalSuccess, { ListForSaleModalSuccessAnimation } from "./ListForSaleModalSuccess";
import ListForSaleModalTransaction from "./ListForSaleModalTransaction";

interface ListForSaleModalContentProps {
  onClose: () => void;
}

const ListForSaleModalContent = (props: ListForSaleModalContentProps) => {
  const { leverageBuy, transactionState } = useListForSale();
  const { status } = transactionState;

  return (
    <>
      <MetaStreetModal.Title>List for Sale</MetaStreetModal.Title>
      {status == "complete" ? <ListForSaleModalSuccessAnimation /> : <LeverageBuyTokenInfo leverageBuy={leverageBuy} />}
      <Divider className="bwl-modal-content-divider" />
      {status == "idle" ? <ListForSaleModalForm /> : null}
      {status == "loading" || status == "error" ? <ListForSaleModalTransaction onClose={props.onClose} /> : null}
      {status == "complete" ? <ListForSaleModalSuccess onClose={props.onClose} /> : null}
    </>
  );
};

export default ListForSaleModalContent;
