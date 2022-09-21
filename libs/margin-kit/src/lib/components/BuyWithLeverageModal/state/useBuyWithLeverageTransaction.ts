import { ContractTransaction } from "ethers";
import { CONFIRMATIONS } from "meta-street/env";
import useTransactionSteps, { TransactionStatus, TransactionStep } from "meta-street/hooks/useTransactionState";
import buyMultipleERC721WithETH from "meta-street/lib/transactions/buyMultipleERC721WithETH";
import buySingleERC721WithETH from "meta-street/lib/transactions/buySingleERC721WithETH";
import { BWLToken } from "meta-street/types";
import { getReadableError } from "meta-street/utils/errors";
import { toUnits } from "meta-street/utils/numbers";
import { useSigner } from "wagmi";
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

type UseBuyWithLeverageTransactionProps = {
  tokens: BWLToken[];
  formState: BuyWithLeverageFormState;
  onBuySuccess?: () => void;
};

const useBuyWithLeverageTransaction = (props: UseBuyWithLeverageTransactionProps) => {
  const { tokens, formState, onBuySuccess } = props;
  const { data: signer } = useSigner();
  const [steps, updateStep, resetSteps] = useTransactionSteps(getSteps());

  const buy = async (): Promise<void> => {
    // make sure there's a signer and a quote
    if (!signer || !formState.quote) return;

    /* prepare transaction props */
    const duration = formState.duration * 86400;
    const purchasePrices = tokens.map((token) => toUnits(token.tokenPrice).toString());
    const downPayments = formState.downPayments.map((downPayment) => downPayment.toString());
    const maxRepayments = formState.quote.repayments.map((repayment) => repayment.mul(1.05).ceil().toString());

    /* send transaction based on the number of tokens */
    const sendTransaction = () => {
      if (tokens.length > 1) {
        return buyMultipleERC721WithETH(signer, {
          tokens,
          purchasePrices,
          downPayments,
          maxRepayments,
          duration,
        });
      } else {
        return buySingleERC721WithETH(signer, {
          token: tokens[0],
          purchasePrice: purchasePrices[0],
          downPayment: downPayments[0],
          maxRepayment: maxRepayments[0],
          duration,
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
      return updateStep(0, { status: "error", description: error });
    }
    // if signing succeeds, set first step as complete
    updateStep(0, { status: "complete" });
    // and set second step as loading
    updateStep(1, { status: "loading" });
    // wait for block confirmation
    try {
      await tx.wait(CONFIRMATIONS);
      // if transaction was confirmed, set second step as complete
      updateStep(1, { status: "complete" });
      // call on success callback
      onBuySuccess?.();
    } catch (e) {
      // if transaction wasn't confirmed, set second step as errored
      const description = getReadableError(e);
      updateStep(1, { status: "error", description });
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
