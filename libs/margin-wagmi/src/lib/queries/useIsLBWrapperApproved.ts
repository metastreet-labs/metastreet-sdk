import { isLBWrapperApproved, IsLBWrapperApprovedParams } from "@metastreet-labs/margin-core";
import { useProvider, useQuery } from "wagmi";
import useDeployment from "../DeploymentContext/useDeployment";

export interface UseIsLBWrapperApprovedParams
  extends Omit<IsLBWrapperApprovedParams, "deployment" | "signerOrProvider"> {
  queryOptions?: Parameters<typeof useQuery<boolean, Error>>[2];
}

export const useIsLBWrapperApproved = (params: UseIsLBWrapperApprovedParams) => {
  const { owner, queryOptions } = params;

  const provider = useProvider();
  const { deployment } = useDeployment();

  const fetcher = () => isLBWrapperApproved({ signerOrProvider: provider, deployment, owner });

  return useQuery<boolean, Error>(isLBWrapperApprovedQueryKeys.owner({ owner }), fetcher, queryOptions);
};

export const isLBWrapperApprovedQueryKeys = {
  all: () => ["is-lb-wrapper-approved"],
  owner: ({ owner }: Pick<IsLBWrapperApprovedParams, "owner">) => [...isLBWrapperApprovedQueryKeys.all(), owner],
};
