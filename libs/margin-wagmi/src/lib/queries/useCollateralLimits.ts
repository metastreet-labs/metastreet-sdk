import {
  getCollateralLimits,
  GetCollateralLimitsParams,
  GetCollateralLimitsResult,
} from "@metastreet-labs/margin-core";
import { useProvider, useQuery } from "wagmi";
import useDeployment from "../DeploymentContext/useDeployment";

type TokenIdentifier = Pick<GetCollateralLimitsParams, "collectionAddress" | "tokenID">;

export interface UseCollateralLimitsParams extends Omit<GetCollateralLimitsParams, "deployment" | "signerOrProvider"> {
  queryOptions: Parameters<typeof useQuery<GetCollateralLimitsResult, Error>>[2];
}

export const useCollateralLimits = (params: UseCollateralLimitsParams) => {
  const { collectionAddress, tokenID, purchasePrice, queryOptions } = params;

  const provider = useProvider();
  const deployment = useDeployment();

  const fetcher = () =>
    getCollateralLimits({ signerOrProvider: provider, collectionAddress, tokenID, deployment, purchasePrice });

  return useQuery<GetCollateralLimitsResult, Error>(
    collateralLimitsQueryKeys.token({ collectionAddress, tokenID }),
    fetcher,
    queryOptions
  );
};

export const collateralLimitsQueryKeys = {
  all: () => ["collateral-limits"],
  collection: ({ collectionAddress }: Pick<TokenIdentifier, "collectionAddress">) => [
    ...collateralLimitsQueryKeys.all(),
    collectionAddress,
  ],
  token: ({ collectionAddress, tokenID }: TokenIdentifier) => [
    ...collateralLimitsQueryKeys.collection({ collectionAddress }),
    tokenID,
  ],
};
