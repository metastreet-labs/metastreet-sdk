import { createListing, getOrderFromReceipt, getReadableError, Marketplace, Order } from "@metastreet-labs/margin-core";
import { BigNumber, ContractReceipt, ContractTransaction, utils } from "ethers";
import { useSigner } from "wagmi";
import useDefinedMetaStreetDeployment from "../../../hooks/useDefinedMetaStreetDeployment";
import useTransactionSteps, {
  getTransactionStatus,
  TransactionState,
  TransactionStep,
} from "../../../hooks/useTransactionState";
import { toUnits } from "../../../utils/numbers";
import { useFees } from "../FeesProvider";
import { ListForSaleFormActions, ListForSaleFormState } from "./useListForSaleForm";

export interface UseListForSaleTransactionResult {
  transactionState: TransactionState;
  listForSale: () => Promise<void>;
}

export interface UseListForSaleTransactionParams {
  formState: ListForSaleFormState;
  formActions: ListForSaleFormActions;
  escrowID: string;
  postOrderToOpenSea: (order: Order) => Promise<void>;
}

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
  {
    title: "Posting to OpenSea",
    description: "Making the order visible on OpenSea",
    status: "idle",
  },
];

export const useListForSaleTransaction = (params: UseListForSaleTransactionParams): UseListForSaleTransactionResult => {
  const { formState, formActions, escrowID, postOrderToOpenSea } = params;
  const { deployment } = useDefinedMetaStreetDeployment();
  const { data: signer } = useSigner();
  const fees = useFees();

  const [steps, updateStep, resetSteps] = useTransactionSteps(getSteps());

  const listForSale = async () => {
    if (!signer) throw new Error("listForSale called with no signer");

    formActions.setFormSubmitted(true);
    if (formState.listingPriceError) return;

    resetSteps(getSteps());
    updateStep(0, { status: "loading" });

    const startTimestamp = Math.ceil(new Date().getTime() / 1000);
    const endTimestamp = startTimestamp + 7 * 86400;
    const salt = BigNumber.from(utils.randomBytes(32));
    const listingPrice = toUnits(formState.listingPriceNum).toString();

    let tx: ContractTransaction;
    try {
      tx = await createListing({
        deployment,
        signer,
        escrowID,
        marketplace: Marketplace.Seaport,
        feeBasisPoints: fees.opensea.bps,
        feeRecipient: fees.opensea.recipient,
        royaltyBasisPoints: fees.royalty.bps,
        royaltyRecipient: fees.royalty.recipient,
        listingPrice,
        startTimestamp,
        endTimestamp,
        salt,
      });
    } catch (e) {
      updateStep(0, { status: "error", description: (e as Error).message });
      return;
    }

    updateStep(0, { status: "complete" });
    updateStep(1, { status: "loading" });

    let receipt: ContractReceipt;
    try {
      receipt = await tx.wait(2);
    } catch (e) {
      updateStep(1, { status: "error", description: "The transaction was not added to the blockchain" });
      return;
    }

    updateStep(1, { status: "complete" });
    updateStep(2, { status: "loading" });

    try {
      const order = getOrderFromReceipt(receipt);
      await postOrderToOpenSea(order);
    } catch (e) {
      const error = getReadableError(e);
      updateStep(2, { status: "error", description: error.message });
      return;
    }

    updateStep(2, { status: "complete" });
  };

  return { transactionState: { steps, status: getTransactionStatus(steps) }, listForSale };
};
