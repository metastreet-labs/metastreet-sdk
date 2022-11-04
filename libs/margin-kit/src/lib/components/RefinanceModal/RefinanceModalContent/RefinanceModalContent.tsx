import MetaStreetModal from "../../MetaStreetModal";
import RefinanceTokenInfo from "../../token-info/RefinanceTokenInfo";
import useRefinance from "../state/useRefinance";

interface RefinanceModalContentProps {
  onClose: () => void;
}

const RefinanceModalContent = (props: RefinanceModalContentProps) => {
  const { leverageBuy } = useRefinance();

  return (
    <>
      <MetaStreetModal.Title>Refinance</MetaStreetModal.Title>
      <RefinanceTokenInfo leverageBuy={leverageBuy} />
      <div className="flex h-56 items-center justify-center">This is a refinance modal</div>
    </>
  );
};

export default RefinanceModalContent;
