import { ContractTransaction, providers } from "ethers";

export interface SendTransactionOptions {
  waitForConfirmations?: number;
  onSubmit?: (tx: ContractTransaction) => void;
  onSigningError?: (error: Error) => void;
  onError?: (hash: ContractTransaction["hash"], error: Error) => void;
  onSuccess?: (hash: ContractTransaction["hash"], receipt: providers.TransactionReceipt) => void;
}

export const sendTransaction = async (txFunc: () => Promise<ContractTransaction>, options: SendTransactionOptions) => {
  const { waitForConfirmations = 2, onError, onSigningError, onSubmit, onSuccess } = options;
  try {
    const tx = await txFunc();
    onSubmit?.(tx);
    try {
      const receipt = await tx.wait(waitForConfirmations);
      onSuccess?.(tx.hash, receipt);
    } catch (error) {
      onError?.(tx.hash, error as Error);
    }
  } catch (error) {
    onSigningError?.(error as Error);
  }
};
