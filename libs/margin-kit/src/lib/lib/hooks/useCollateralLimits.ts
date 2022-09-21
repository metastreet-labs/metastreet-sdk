import { useProvider, useQuery } from "wagmi";
import { BWLToken } from "../../types";
import { getReadableError } from "../../utils/errors";
import getCollateralLimits, { CollateralLimits } from "../fetchers/getCollateralLimits";

const useCollateralLimits = (tokens: BWLToken[]) => {
  const provider = useProvider();
  const { collectionAddress, tokenID } = tokens[0];

  const { data, error } = useQuery<CollateralLimits, Error>(
    collateralLimitsQueryKeys.tokens(collectionAddress, tokens),
    () => {
      return getCollateralLimits(provider, {
        collectionAddress,
        tokenID,
      });
    }
  );

  return { limits: data, limitsError: error && getReadableError(error) };
};

const collateralLimitsQueryKeys = {
  all: () => ["bulk-collateral-limits"],
  collection: (address: string) => [...collateralLimitsQueryKeys.all(), address],
  tokens: (collectionAddress: string, tokens: BWLToken[]) => [
    ...collateralLimitsQueryKeys.collection(collectionAddress),
    tokens.map((token) => token).join("-"),
  ],
};

export default useCollateralLimits;
