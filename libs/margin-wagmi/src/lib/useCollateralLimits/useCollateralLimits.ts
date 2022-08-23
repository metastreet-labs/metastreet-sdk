import {
  getCollateralLimits,
  GetCollateralLimitsParams,
  GetCollateralLimitsResult,
} from "@metastreet-labs/margin-core";
import { useQuery } from "wagmi";
import useDeployment from "../useDeployment/useDeployment";

type TokenIdentifier = Pick<GetCollateralLimitsParams, "collectionAddress" | "tokenID">;

export interface UseCollateralLimitsParams extends Omit<GetCollateralLimitsParams, "deployment"> {
  queryOptions: Parameters<typeof useQuery<GetCollateralLimitsResult, Error>>[2];
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

  return useQuery<GetCollateralLimitsResult, Error>(
    collateralLimitsQueryKeys.token({ collectionAddress, tokenID }),
    fetcher,
    queryOptions
  );
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
