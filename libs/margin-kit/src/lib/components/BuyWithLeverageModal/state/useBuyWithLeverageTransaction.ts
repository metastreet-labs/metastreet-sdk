import {
  buyMultipleERC721WithETH,
  buySingleERC721WithETH,
  getReadableError,
  getReservoirFillCalldata,
} from "@metastreet-labs/margin-core";
import { ContractTransaction } from "ethers";
import { useSigner } from "wagmi";
import useDefinedMetaStreetDeployment from "../../../hooks/useDefinedMetaStreetDeployment";
import useTransactionSteps, { TransactionStatus, TransactionStep } from "../../../hooks/useTransactionState";
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
  const { deployment } = useDefinedMetaStreetDeployment();
  const [steps, updateStep, resetSteps] = useTransactionSteps(getSteps());

  const buy = async (): Promise<void> => {
    // make sure there's a signer and a quote
    if (!signer || !formState.quote) return;

    /* prepare transaction props */
    const duration = formState.duration * 86400;
    const purchasePrices = tokens.map((token) => toUnits(token.tokenPrice).toString());
    const downPayments = formState.downPayments.map((downPayment) => downPayment.toString());
    const maxRepayments = formState.quote.repayments.map((repayment) => repayment.mul(105).div(100).toString());

    /* send transaction based on the number of tokens */
    const sendTransaction = async () => {
      const fillCallDatas = await Promise.all(tokens.map((t) => getReservoirFillCalldata({ ...t, deployment })));

      if (tokens.length > 1) {
        return buyMultipleERC721WithETH({
          signer,
          deployment,
          purchasePrices,
          downPayments,
          maxRepayments,
          duration,
          fillCallDatas,
        });
      } else {
        return buySingleERC721WithETH({
          signer,
          deployment,
          purchasePrice: purchasePrices[0],
          downPayment: downPayments[0],
          maxRepayment: maxRepayments[0],
          duration,
          fillCallData: fillCallDatas[0],
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
      await tx.wait(2);
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

  const initiated = steps[0].status != "idle";
  const errored = Boolean(steps.find((step) => step.status == "error"));
  const completed = steps[steps.length - 1].status == "complete";
  let status: TransactionStatus = "idle";
  if (initiated) status = "loading";
  if (errored) status = "error";
  if (completed) status = "complete";

  return {
    transactionState: { steps, status },
    buy,
  };
};

export default useBuyWithLeverageTransaction;
