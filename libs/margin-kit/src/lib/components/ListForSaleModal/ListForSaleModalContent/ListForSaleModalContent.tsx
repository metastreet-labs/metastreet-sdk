import Divider from "../../Divider";
import MetaStreetModal from "../../MetaStreetModal";
import LeverageBuyTokenInfo from "../../token-info/LeverageBuyTokenInfo";
import { useListForSale } from "../state/ListForSaleContext";
import ListForSaleModalForm from "./ListForSaleModalForm";

const ListForSaleModalContent = () => {
  const { leverageBuy, transactionState } = useListForSale();
  const { status } = transactionState;

  return (
    <>
      <MetaStreetModal.Title>List for Sale</MetaStreetModal.Title>
      {status == "complete" ? "<ListForSaleSuccessAnimation />" : <LeverageBuyTokenInfo leverageBuy={leverageBuy} />}
      <Divider className="bwl-modal-content-divider" />
      {status == "idle" ? <ListForSaleModalForm /> : null}
      {status == "loading" || status == "error" ? "<ListForSaleModalTransaction />" : null}
      {status == "complete" ? "<ListForSaleModalSuccess />" : null}
    </>
  );
};

export default ListForSaleModalContent;
