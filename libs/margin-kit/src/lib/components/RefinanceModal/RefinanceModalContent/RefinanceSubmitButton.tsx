import useETHBalance from "../../../lib/hooks/useETHBalance";
import MetaStreetButton from "../../MetaStreetButton";
import useRefinance from "../state/useRefinance";

const RefinanceSubmitButton = () => {
  const { formState, actions } = useRefinance();
  const { data: balance } = useETHBalance();

  const isOwed = formState.downPayment.gt(0);
  const insufficientFunds = balance && balance.lt(formState.downPayment);
  const buttonDisabled = !formState.quote || !balance || insufficientFunds;

  return (
    <MetaStreetButton disabled={buttonDisabled} onClick={actions.refinance}>
      {isOwed ? (insufficientFunds ? "Insufficient Funds" : "Pay & Extend") : "Withdraw & Extend"}
    </MetaStreetButton>
  );
};

export default RefinanceSubmitButton;
