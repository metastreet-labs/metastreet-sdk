import {
  createGetCollateralLimits,
  CreateGetCollateralLimitsParams,
  CreateGetCollateralLimitsResult,
} from "@metastreet-sdk/pe-contracts-core";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import useDeployment from "../useDeployment/useDeployment";

type TokenIdentifier = Pick<CreateGetCollateralLimitsParams, "collectionAddress" | "tokenID">;

export interface UseCollateralLimitsParams extends Omit<CreateGetCollateralLimitsParams, "deployment"> {
  queryOptions: UseQueryOptions<CreateGetCollateralLimitsResult>;
}

export function useCollateralLimits({
  collectionAddress,
  tokenID,
  signerOrProvider,
  purchasePrice,
  queryOptions,
}: UseCollateralLimitsParams) {
  const deployment = useDeployment();
  return useQuery({
    queryKey: collateralLimitsQueryKeys.token({ collectionAddress, tokenID }),
    queryFn: createGetCollateralLimits({ signerOrProvider, collectionAddress, tokenID, deployment, purchasePrice }),
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
