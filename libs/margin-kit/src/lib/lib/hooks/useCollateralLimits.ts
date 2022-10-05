import {
  getCollateralLimits,
  GetCollateralLimitsParams,
  GetCollateralLimitsResult,
  ReadableError,
} from "@metastreet-labs/margin-core";
import { useQuery } from "wagmi";
import useMetaStreetDeployment from "../../components/MetaStreetDeploymentProvider/useMetaStreetDeployment";

type UseCollateralLimitsParams = Pick<GetCollateralLimitsParams, "collectionAddress" | "tokenID">;

const useCollateralLimits = (params: UseCollateralLimitsParams) => {
  const { provider, deployment } = useMetaStreetDeployment();

  return useQuery<GetCollateralLimitsResult, ReadableError>(collateralLimitsQueryKeys.token(params), () => {
    return getCollateralLimits({ signerOrProvider: provider, deployment, ...params });
  });
};

const collateralLimitsQueryKeys = {
  all: () => ["collateral-limits"],
  token: (params: UseCollateralLimitsParams) => [...collateralLimitsQueryKeys.all(), params],
};

export default useCollateralLimits;
