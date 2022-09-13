import { refinanceETH, RefinanceETHParams } from "@metastreet-labs/margin-core";
import useDeployment from "../DeploymentContext/useDeployment";
import { sendTransaction, SendTransactionOptions } from "../helpers/sendTransaction";

export type UseRefinanceETHParams = Omit<RefinanceETHParams, "deployment"> & SendTransactionOptions;

export const useRefinanceETH = (props: UseRefinanceETHParams) => {
  const { signer, escrowID, downPayment, duration, maxRepayment, ...sendTransactionOptions } = props;
  const { deployment } = useDeployment();

  const fetcher = () => {
    return sendTransaction(
      () => refinanceETH({ deployment, signer, escrowID, downPayment, duration, maxRepayment }),
      sendTransactionOptions
    );
  };

  // TODO: Add mutation from react-query

  return fetcher;
};
