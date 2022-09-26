import { IERC3156FlashLender__factory, LeverageBuyWrapperV1__factory } from "@metastreet-labs/pe-contracts-typechain";
import Decimal from "decimal.js";
import { BigNumberish } from "ethers";
import { LEVERAGE_BUY_WRAPPER_ADDRESS } from "../../env";
import { SignerOrProvider } from "./interfaces";

const getFlashFee = async (sop: SignerOrProvider, amount: BigNumberish) => {
  const wrapper = LeverageBuyWrapperV1__factory.connect(LEVERAGE_BUY_WRAPPER_ADDRESS, sop);
  const [flashLenderAddress, wethAddress] = await Promise.all([wrapper.flashLender(), wrapper.weth()]);

  const flashLender = IERC3156FlashLender__factory.connect(flashLenderAddress, sop);

  const flashFee = await flashLender.flashFee(wethAddress, amount);
  return new Decimal(flashFee.toString());
};

export default getFlashFee;
