import { NextPage } from "next";
import BuyWithLeverageSection from "../components/BuyWithLeverageSection";
import PositionsSection from "../components/PositionsSection";

const Index: NextPage = () => {
  return (
    <div className="flex flex-col p-4 space-y-4">
      <BuyWithLeverageSection />
      <PositionsSection />
    </div>
  );
};

export default Index;
