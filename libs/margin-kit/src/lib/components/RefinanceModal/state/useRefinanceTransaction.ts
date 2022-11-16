import { ReadableError, refinanceETH } from "@metastreet-labs/margin-core";
import { ContractTransaction } from "ethers";
import { useSigner } from "wagmi";
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
  const { data: signer } = useSigner();
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
        deployment,
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

    try {
      await tx.wait(2);
    } catch (e) {
      updateStep(1, { status: "error", description: "The transaction wasn't added to the blockchain" });
      onError?.(e);
      return;
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
