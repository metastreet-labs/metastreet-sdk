import { ReactNode } from "react";
import { BWLToken } from "../../types";
import BuyWithLeverageButton from "../BuyWithLeverageButton";
import BuyWithLeverageModal from "../BuyWithLeverageModal";
import { useModalStateWithKey } from "../MetaStreetModal";

interface BuyWithLeverageProps {
  tokens: BWLToken[];
  title?: ReactNode;
  className?: string;
}

const BuyWithLeverage = (props: BuyWithLeverageProps) => {
  const { tokens, title, className } = props;
  const { isOpen, openModal, closeModal, key } = useModalStateWithKey();

  return (
    <>
      <BuyWithLeverageButton tokens={tokens} onClick={openModal} className={className} />
      <BuyWithLeverageModal tokens={tokens} title={title} isOpen={isOpen} onClose={closeModal} key={key} />
    </>
  );
};

export default BuyWithLeverage;
