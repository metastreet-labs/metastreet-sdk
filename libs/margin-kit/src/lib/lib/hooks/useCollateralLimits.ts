import {
  getCollateralLimits,
  GetCollateralLimitsParams,
  GetCollateralLimitsResult,
  ReadableError,
} from "@metastreet-labs/margin-core";
import { useQuery } from "wagmi";
import useDefinedMetaStreetDeployment from "../../components/MetaStreetDeploymentProvider/useDefinedMetaStreetDeployment";

type UseCollateralLimitsParams = Pick<GetCollateralLimitsParams, "collectionAddress" | "tokenID">;

const useCollateralLimits = (params: UseCollateralLimitsParams) => {
  const { provider, deployment } = useDefinedMetaStreetDeployment();

  return useQuery<GetCollateralLimitsResult, ReadableError>(collateralLimitsQueryKeys.token(params), () => {
    return getCollateralLimits({ signerOrProvider: provider, deployment, ...params });
  });
};

const collateralLimitsQueryKeys = {
  all: () => ["collateral-limits"],
  token: (params: UseCollateralLimitsParams) => [...collateralLimitsQueryKeys.all(), params],
};

export default useCollateralLimits;
