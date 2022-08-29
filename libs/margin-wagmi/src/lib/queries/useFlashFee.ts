import { getFlashFee, GetFlashFeeParams } from "@metastreet-labs/margin-core";
import { BigNumber } from "ethers";
import { useProvider, useQuery } from "wagmi";
import useDeployment from "../DeploymentContext/useDeployment";

export interface UseFlashFeeParams extends Omit<GetFlashFeeParams, "deployment" | "signerOrProvider"> {
  queryOptions?: Parameters<typeof useQuery<BigNumber, Error>>[2];
}

export const useFlashFee = (params: UseFlashFeeParams) => {
  const { loanAmount, queryOptions } = params;

  const provider = useProvider();
  const { deployment } = useDeployment();

  const fetcher = () => getFlashFee({ signerOrProvider: provider, deployment, loanAmount });

  return useQuery<BigNumber, Error>(flashFeeQueryKeys.loanAmount({ loanAmount }), fetcher, queryOptions);
};

export const flashFeeQueryKeys = {
  all: () => ["flash-fee"],
  loanAmount: ({ loanAmount }: Pick<GetFlashFeeParams, "loanAmount">) => [...flashFeeQueryKeys.all(), loanAmount],
};
