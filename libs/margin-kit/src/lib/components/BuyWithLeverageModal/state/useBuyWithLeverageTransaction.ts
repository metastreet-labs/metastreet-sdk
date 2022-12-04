import {
  buyMultipleERC721WithETH,
  buySingleERC721WithETH,
  getReadableError,
  getReservoirFillCalldata,
  waitForSubgraphSync,
} from "@metastreet-labs/margin-core";
import { ContractTransaction } from "ethers";
import { useSigner } from "wagmi";
import useDefinedDeployment from "../../../hooks/useDefinedDeployment";
import useTransactionSteps, { getTransactionStatus, TransactionStep } from "../../../hooks/useTransactionState";
import { BWLToken } from "../../../types";
import { toUnits } from "../../../utils/numbers";
import { BuyWithLeverageFormState } from "./useBuyWithLeverageForm";

const getSteps = (): TransactionStep[] => [
  {
    title: "Sign Transaction",
    description: "Waiting for you to sign the transaction",
    status: "idle",
  },
  {
    title: "Blockchain Finalization",
    description: "Waiting for block confirmations",
    status: "idle",
  },
];

interface UseBuyWithLeverageTransactionProps {
  tokens: BWLToken[];
  formState: BuyWithLeverageFormState;
  onBuySuccess?: () => void;
}

const useBuyWithLeverageTransaction = (props: UseBuyWithLeverageTransactionProps) => {
  const { tokens, formState, onBuySuccess } = props;
  const { data: signer } = useSigner();
  const deployment = useDefinedDeployment();
  const [steps, updateStep, resetSteps] = useTransactionSteps(getSteps());

  const buy = async (): Promise<void> => {
    // make sure there's a signer and a quote
    if (!signer || !formState.quote) return;

    /* prepare transaction props */
    const duration = formState.duration * 86400;
    const purchasePrices = tokens.map((token) => toUnits(token.tokenPrice).toString());
    const downPayments = formState.downPayments.map((downPayment) => downPayment.toString());
    const maxRepayments = formState.quote.repayments.map((repayment) => repayment.mul(105).div(100).toString());
    const { vaultAddress } = formState.activeLimits;
    const { lbWrapperAddress } = deployment;

    /* send transaction based on the number of tokens */
    const sendTransaction = async () => {
      const fillCallDatas = await Promise.all(tokens.map((t) => getReservoirFillCalldata({ ...t, ...deployment })));

      if (tokens.length > 1) {
        return buyMultipleERC721WithETH({
          signer,
          lbWrapperAddress,
          purchasePrices,
          downPayments,
          maxRepayments,
          duration,
          fillCallDatas,
          vaultAddress,
        });
      } else {
        return buySingleERC721WithETH({
          signer,
          lbWrapperAddress,
          purchasePrice: purchasePrices[0],
          downPayment: downPayments[0],
          maxRepayment: maxRepayments[0],
          duration,
          fillCallData: fillCallDatas[0],
          vaultAddress,
        });
      }
    };

    // re-initialize steps
    resetSteps(getSteps());
    // set first step as loading
    updateStep(0, { status: "loading" });
    // wait for user to sign transaction
    let tx: ContractTransaction;
    try {
      tx = await sendTransaction();
    } catch (e) {
      // if signing fails, set first step as errored and return
      const error = getReadableError(e);
      return updateStep(0, { status: "error", description: error.message });
    }
    // if signing succeeds, set first step as complete
    updateStep(0, { status: "complete" });
    // and set second step as loading
    updateStep(1, { status: "loading" });
    // wait for block confirmation
    try {
      const receipt = await tx.wait(2);
      await waitForSubgraphSync({ subgraphURI: deployment.subgraphURI, blockNumber: receipt.blockNumber });
      // if transaction was confirmed, set second step as complete
      updateStep(1, { status: "complete" });
      // call on success callback
      onBuySuccess?.();
    } catch (e) {
      // if transaction wasn't confirmed, set second step as errored
      const error = getReadableError(e);
      updateStep(1, { status: "error", description: error.message });
    }
  };

  return {
    transactionState: { steps, status: getTransactionStatus(steps) },
    buy,
  };
};

export default useBuyWithLeverageTransaction;
