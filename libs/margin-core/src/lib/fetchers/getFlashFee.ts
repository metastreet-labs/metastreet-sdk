import { IERC3156FlashLender__factory, LeverageBuyWrapperV1__factory } from "@metastreet-labs/pe-contracts-typechain";
import { BigNumber, BigNumberish } from "ethers";
import { withReadableError } from "../errors";
import { FetcherParams } from "./types";

export interface GetFlashFeeParams extends FetcherParams {
  loanAmount: BigNumberish;
}

const _getFlashFee = async (params: GetFlashFeeParams): Promise<BigNumber> => {
  const { lbWrapperAddress, loanAmount, signerOrProvider } = params;
  const lbWrapper = LeverageBuyWrapperV1__factory.connect(lbWrapperAddress, signerOrProvider);
  const [flashLenderAddress, wethAddress] = await Promise.all([lbWrapper.flashLender(), lbWrapper.weth()]);

  const flashLender = IERC3156FlashLender__factory.connect(flashLenderAddress, signerOrProvider);
  const flashFee = await flashLender.flashFee(wethAddress, loanAmount);

  return flashFee;
};

export const getFlashFee = withReadableError(_getFlashFee);
