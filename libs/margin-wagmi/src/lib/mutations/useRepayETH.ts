import { repayETH, RepayETHParams } from "@metastreet-labs/margin-core";
import useDeployment from "../DeploymentContext/useDeployment";
import { sendTransaction, SendTransactionOptions } from "../helpers/sendTransaction";

export type UseRepayETHParams = Omit<RepayETHParams, "deployment"> & SendTransactionOptions;

export const useRepayETH = (props: UseRepayETHParams) => {
  const { escrowID, repayment, signer, ...sendTransactionOptions } = props;
  const { deployment } = useDeployment();

  const fetcher = () => {
    return sendTransaction(() => repayETH({ deployment, escrowID, repayment, signer }), sendTransactionOptions);
  };

  // TODO: Add mutation from react-query

  return fetcher;
};
