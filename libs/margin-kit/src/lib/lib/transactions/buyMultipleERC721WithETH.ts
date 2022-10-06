import { LeverageBuyWrapperV1__factory } from "@metastreet-labs/pe-contracts-typechain";
import { BigNumber, BigNumberish, Signer } from "ethers";
import { LEVERAGE_BUY_WRAPPER_ADDRESS, VAULT_ADDRESS } from "../../env";
import { BWLToken } from "../../types";
import getReservoirFillCalldata from "../fetchers/getReservoirFillCalldata";

export interface BuyMultipleERC721WithETHProps {
  tokens: BWLToken[];
  purchasePrices: BigNumberish[];
  downPayments: BigNumberish[];
  maxRepayments: BigNumberish[];
  duration: number;
}

const buyMultipleERC721WithETH = async (signer: Signer, props: BuyMultipleERC721WithETHProps) => {
  const totalDownPayment = props.downPayments.reduce((total, dp) => BigNumber.from(total).add(BigNumber.from(dp)), 0);
  const fillCalldatas = await Promise.all(props.tokens.map(getReservoirFillCalldata));
  const contract = LeverageBuyWrapperV1__factory.connect(LEVERAGE_BUY_WRAPPER_ADDRESS, signer);
  return contract.buyMultipleERC721WithETH(
    props.purchasePrices,
    fillCalldatas,
    VAULT_ADDRESS,
    props.duration,
    props.downPayments,
    props.maxRepayments,
    { value: totalDownPayment }
  );
};

export default buyMultipleERC721WithETH;