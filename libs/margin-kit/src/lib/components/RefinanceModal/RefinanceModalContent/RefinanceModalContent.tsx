import Divider from "../../Divider";
import MetaStreetModal from "../../MetaStreetModal";
import RefinanceTokenInfo from "../../token-info/RefinanceTokenInfo";
import useRefinance from "../state/useRefinance";
import RefinanceModalForm from "./RefinanceModalForm";
import RefinanceModalTransaction from "./RefinanceModalTransaction";

interface RefinanceModalContentProps {
  onClose: () => void;
}

const RefinanceModalContent = (props: RefinanceModalContentProps) => {
  const { transactionState, leverageBuy } = useRefinance();
  const { status } = transactionState;

  return (
    <>
      <MetaStreetModal.Title>Refinance</MetaStreetModal.Title>
      {transactionState.status == "complete" ? "Success animation" : <RefinanceTokenInfo leverageBuy={leverageBuy} />}
      <Divider className="bwl-modal-content-divider" />
      {status == "idle" ? <RefinanceModalForm /> : null}
      {status == "loading" || status == "error" ? <RefinanceModalTransaction onClose={props.onClose} /> : null}
      {status == "complete" ? "<ModalSuccess />" : null}
    </>
  );
};

export default RefinanceModalContent;
