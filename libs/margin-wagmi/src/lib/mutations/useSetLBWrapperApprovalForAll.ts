import { setLBWrapperApprovalForAll, SetLBWrapperApprovalForAllParams } from "@metastreet-labs/margin-core";
import useDeployment from "../DeploymentContext/useDeployment";
import { sendTransaction, SendTransactionOptions } from "../helpers/sendTransaction";

export type UseSetLBWrapperApprovalForALlParams = Omit<SetLBWrapperApprovalForAllParams, "deployment"> &
  SendTransactionOptions;

export const useSetLBWrapperApprovalForAll = (props: UseSetLBWrapperApprovalForALlParams) => {
  const { signer, ...sendTransactionOptions } = props;
  const { deployment } = useDeployment();

  const fetcher = () => {
    return sendTransaction(() => setLBWrapperApprovalForAll({ deployment, signer }), sendTransactionOptions);
  };

  // TODO: Add mutation from react-query

  return fetcher;
};
