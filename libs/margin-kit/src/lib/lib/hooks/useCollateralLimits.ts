import {
  getCollateralLimits,
  GetCollateralLimitsParams,
  GetCollateralLimitsResult,
  ReadableError,
} from "@metastreet-labs/margin-core";
import { useProvider, useQuery } from "wagmi";
import useChainID from "../../hooks/useChainID";
import { useFetcherWithDeployment } from "./useFetcherWithDeployment";

type UseCollateralLimitsParams = Pick<GetCollateralLimitsParams, "collectionAddress" | "tokenID" | "vaultAddress">;

const useCollateralLimits = (params: UseCollateralLimitsParams) => {
  const provider = useProvider();
  const chainID = useChainID();

  const [fetcher, enabled] = useFetcherWithDeployment((deployment) => {
    return getCollateralLimits({ signerOrProvider: provider, deployment, ...params });
  });

  return useQuery<GetCollateralLimitsResult, ReadableError>(collateralLimitsQueryKeys.token(chainID, params), fetcher, {
    enabled,
  });
};

const collateralLimitsQueryKeys = {
  all: (chainID: number) => ["collateral-limits", chainID],
  token: (chainID: number, params: UseCollateralLimitsParams) => [...collateralLimitsQueryKeys.all(chainID), params],
};

export default useCollateralLimits;
