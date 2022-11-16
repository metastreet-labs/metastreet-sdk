import Divider from "../../Divider";
import MetaStreetModal from "../../MetaStreetModal";
import RefinanceTokenInfo from "../../token-info/LeverageBuyTokenInfo";
import useRefinance from "../state/useRefinance";
import RefinanceModalForm from "./RefinanceModalForm";
import RefinanceModalSuccess, { RefinanceModalSuccessAnimation } from "./RefinanceModalSuccess";
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
      {status == "complete" ? <RefinanceModalSuccessAnimation /> : <RefinanceTokenInfo leverageBuy={leverageBuy} />}
      <Divider className="bwl-modal-content-divider" />
      {status == "idle" ? <RefinanceModalForm /> : null}
      {status == "loading" || status == "error" ? <RefinanceModalTransaction onClose={props.onClose} /> : null}
      {status == "complete" ? <RefinanceModalSuccess onClose={props.onClose} /> : null}
    </>
  );
};

export default RefinanceModalContent;
