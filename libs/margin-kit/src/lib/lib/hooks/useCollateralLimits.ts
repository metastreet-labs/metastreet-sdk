import {
  getCollateralLimits,
  GetCollateralLimitsParams,
  GetCollateralLimitsResult,
  ReadableError,
} from "@metastreet-labs/margin-core";
import { useQuery } from "wagmi";
import useChainID from "../../hooks/useChainID";
import useSignerOrProvider from "../../hooks/useSignerOrProvider";
import { useFetcherWithDeployment } from "./useFetcherWithDeployment";

type UseCollateralLimitsParams = Pick<GetCollateralLimitsParams, "collectionAddress" | "tokenID" | "vaultAddress">;

const useCollateralLimits = (params: UseCollateralLimitsParams) => {
  const { signerOrProvider } = useSignerOrProvider();
  const chainID = useChainID();

  const fetcher = useFetcherWithDeployment((deployment) => {
    return getCollateralLimits({ signerOrProvider, ...deployment, ...params });
  });

  return useQuery<GetCollateralLimitsResult, ReadableError>(collateralLimitsQueryKeys.token(chainID, params), fetcher);
};

const collateralLimitsQueryKeys = {
  all: (chainID: number) => ["collateral-limits", chainID],
  token: (chainID: number, params: UseCollateralLimitsParams) => [...collateralLimitsQueryKeys.all(chainID), params],
};

export default useCollateralLimits;
