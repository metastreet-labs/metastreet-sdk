import MetaStreetModal from "../../MetaStreetModal";

interface RefinanceModalContentProps {
  onClose: () => void;
}

const RefinanceModalContent = (props: RefinanceModalContentProps) => {
  return (
    <>
      <MetaStreetModal.Title>Refinance</MetaStreetModal.Title>
      <div className="flex h-56 items-center justify-center">This is a refinance modal</div>
    </>
  );
};

export default RefinanceModalContent;
