import {
  getCollateralLimits,
  GetCollateralLimitsParams,
  GetCollateralLimitsResult,
  ReadableError,
} from "@metastreet-labs/margin-core";
import { useQuery } from "wagmi";
import useDefinedMetaStreetDeployment from "../../hooks/useDefinedMetaStreetDeployment";

type UseCollateralLimitsParams = Pick<GetCollateralLimitsParams, "collectionAddress" | "tokenID" | "vaultAddress">;

const useCollateralLimits = (params: UseCollateralLimitsParams) => {
  const { provider, deployment, chainID } = useDefinedMetaStreetDeployment();

  return useQuery<GetCollateralLimitsResult, ReadableError>(collateralLimitsQueryKeys.token(chainID, params), () => {
    return getCollateralLimits({ signerOrProvider: provider, deployment, ...params });
  });
};

const collateralLimitsQueryKeys = {
  all: (chainID: number) => ["collateral-limits", chainID],
  token: (chainID: number, params: UseCollateralLimitsParams) => [...collateralLimitsQueryKeys.all(chainID), params],
};

export default useCollateralLimits;
