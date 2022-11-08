import { fromUnits, prettyFormatNumber } from "../../../utils/numbers";
import Divider from "../../Divider";
import MetaStreetModal from "../../MetaStreetModal";
import { DebtSlider } from "../../sliders/DebtSlider";
import RefinanceTokenInfo from "../../token-info/RefinanceTokenInfo";
import useRefinance from "../state/useRefinance";

interface RefinanceModalContentProps {
  onClose: () => void;
}

const RefinanceModalContent = (props: RefinanceModalContentProps) => {
  const { leverageBuy, formState, actions } = useRefinance();
  const debtAmount = prettyFormatNumber(fromUnits(formState.debtAmount));

  return (
    <>
      <MetaStreetModal.Title>Refinance</MetaStreetModal.Title>
      <RefinanceTokenInfo leverageBuy={leverageBuy} />
      <Divider className="bwl-modal-content-divider" />
      <DebtSlider debtAmount={debtAmount} debtFactor={formState.debtFactor} setDebtFactor={actions.setDebtFactor} />
      <div className="flex h-56 items-center justify-center">This is a refinance modal</div>
    </>
  );
};

export default RefinanceModalContent;
