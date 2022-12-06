import { getReadableError } from "@metastreet-labs/margin-core";
import { useQuery } from "wagmi";
import useChainID from "../../../hooks/meta-street-config/useChainID";
import getOSFlagged, { BaseToken, GetOSFlaggedResult } from "../../fetchers/getOSFlagged";

interface UseOSFlaggedResult<T extends BaseToken> {
  tokens: GetOSFlaggedResult<T> | undefined;
  tokensError: string | null;
}

export const useOSFlagged = <T extends BaseToken>(
  tokens: T[],
  extraParams?: { onSuccess?: (tokens: GetOSFlaggedResult<T>) => void }
): UseOSFlaggedResult<T> => {
  const chainID = useChainID();
  const isMainnet = chainID == 1;

  const { data, error } = useQuery<GetOSFlaggedResult<T>, Error>(
    useOSFlaggedQKs.tokens(tokens),
    () => getOSFlagged(tokens),
    { enabled: isMainnet, onSuccess: extraParams?.onSuccess }
  );

  if (!isMainnet) {
    return { tokens: { unflagged: tokens, flagged: [] }, tokensError: null };
  }
  return { tokens: data, tokensError: error && getReadableError(error).message };
};

export const useOSFlaggedQKs = {
  all: () => ["os-flagged"],
  tokens: (tokens: BaseToken[]) => [...useOSFlaggedQKs.all(), tokens],
};
