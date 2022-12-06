import { ReadableError, refinanceETH, waitForSubgraphSync } from "@metastreet-labs/margin-core";
import { ContractReceipt, ContractTransaction } from "ethers";
import useSigner from "../../../hooks/meta-street-config/useSigner";
import useDefinedDeployment from "../../../hooks/useDefinedDeployment";
import useTransactionSteps, {
  getTransactionStatus,
  TransactionState,
  TransactionStep,
} from "../../../hooks/useTransactionState";
import { daysToSeconds } from "../../../utils/dates";
import { RefinanceFormState } from "./useRefinanceForm";

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

interface UseRefinanceTransactionParams {
  escrowID: string;
  formState: RefinanceFormState;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export interface UseRefinanceTransactionResult {
  transactionState: TransactionState;
  refinance: () => Promise<void>;
}

const useRefinanceTransaction = (params: UseRefinanceTransactionParams): UseRefinanceTransactionResult => {
  const { escrowID, formState, onSuccess, onError } = params;
  const signer = useSigner();
  const deployment = useDefinedDeployment();
  const [steps, updateStep, resetSteps] = useTransactionSteps(getSteps());

  const refinance = async () => {
    if (!signer || !formState.quote) return;

    resetSteps(getSteps());
    updateStep(0, { status: "loading" });

    let tx: ContractTransaction;
    try {
      tx = await refinanceETH({
        signer,
        lbWrapperAddress: deployment.lbWrapperAddress,
        escrowID,
        duration: daysToSeconds(formState.duration),
        downPayment: formState.downPayment,
        maxRepayment: formState.quote.repayment.mul(105).div(100),
        vaultAddress: formState.activeLimits.vaultAddress,
      });
    } catch (e) {
      const error = e as ReadableError;
      updateStep(0, { status: "error", description: error.message });
      onError?.(error);
      return;
    }

    updateStep(0, { status: "complete" });
    updateStep(1, { status: "loading" });

    let receipt: ContractReceipt;
    try {
      receipt = await tx.wait(2);
    } catch (e) {
      updateStep(1, { status: "error", description: "The transaction wasn't added to the blockchain" });
      onError?.(e);
      return;
    }

    try {
      await waitForSubgraphSync({ subgraphURI: deployment.subgraphURI, blockNumber: receipt.blockNumber });
      updateStep(1, { status: "error", description: "Subgraph sync failed" });
    } catch (e) {
      onError?.(e);
    }

    updateStep(1, { status: "complete" });
    onSuccess?.();
  };

  return {
    transactionState: { steps, status: getTransactionStatus(steps) },
    refinance,
  };
};

export default useRefinanceTransaction;
