import {
  getCollateralLimits,
  GetCollateralLimitsParams,
  GetCollateralLimitsResult,
} from "@metastreet-sdk/pe-contracts-core";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import useDeployment from "../useDeployment/useDeployment";

type TokenIdentifier = Pick<GetCollateralLimitsParams, "collectionAddress" | "tokenID">;

export interface UseCollateralLimitsParams extends Omit<GetCollateralLimitsParams, "deployment"> {
  queryOptions: UseQueryOptions<GetCollateralLimitsResult>;
}

export function useCollateralLimits({
  collectionAddress,
  tokenID,
  signerOrProvider,
  purchasePrice,
  queryOptions,
}: UseCollateralLimitsParams) {
  const deployment = useDeployment();

  const fetcher = () =>
    getCollateralLimits({ signerOrProvider, collectionAddress, tokenID, deployment, purchasePrice });

  return useQuery({
    queryKey: collateralLimitsQueryKeys.token({ collectionAddress, tokenID }),
    queryFn: fetcher,
    ...queryOptions,
  });
}

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

export default useCollateralLimits;
