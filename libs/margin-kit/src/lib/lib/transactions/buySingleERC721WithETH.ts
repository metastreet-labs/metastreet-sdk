import { LeverageBuyWrapperV1__factory } from "@metastreet-labs/pe-contracts-typechain";
import { BigNumberish, Signer } from "ethers";
import { LEVERAGE_BUY_WRAPPER_ADDRESS, VAULT_ADDRESS } from "../../env";
import { BWLToken } from "../../types";
import getReservoirFillCalldata from "../fetchers/getReservoirFillCalldata";

export interface BuySingleERC721WithETHProps {
  token: BWLToken;
  purchasePrice: BigNumberish;
  downPayment: BigNumberish;
  maxRepayment: BigNumberish;
  duration: number;
}

const buySingleERC721WithETH = async (signer: Signer, props: BuySingleERC721WithETHProps) => {
  const { token, purchasePrice, downPayment, maxRepayment, duration } = props;
  const fillCalldata = await getReservoirFillCalldata(token);
  const contract = LeverageBuyWrapperV1__factory.connect(LEVERAGE_BUY_WRAPPER_ADDRESS, signer);
  return contract.buySingleERC721WithETH(purchasePrice, fillCalldata, VAULT_ADDRESS, duration, maxRepayment, {
    value: downPayment,
  });
};

export default buySingleERC721WithETH;
