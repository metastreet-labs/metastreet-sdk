import { useNetwork, useQuery } from "wagmi";
import { getReadableError } from "../../utils/errors";
import getOSFlagged, { BaseToken, GetOSFlaggedResult } from "../fetchers/getOSFlagged";

interface UseOSFlaggedResult<T extends BaseToken> {
  tokens: GetOSFlaggedResult<T> | undefined;
  tokensError: string | null;
}

const useOSFlagged = <T extends BaseToken>(
  tokens: T[],
  extraParams?: { onSuccess?: (tokens: GetOSFlaggedResult<T>) => void }
): UseOSFlaggedResult<T> => {
  const { chain } = useNetwork();
  const isMainnet = chain?.id == 1;

  const { data, error } = useQuery<GetOSFlaggedResult<T>, Error>(
    osfQueryKeys.tokens(tokens),
    () => getOSFlagged(tokens),
    { enabled: isMainnet, onSuccess: extraParams?.onSuccess }
  );

  if (!isMainnet) {
    return { tokens: { unflagged: tokens, flagged: [] }, tokensError: null };
  }
  return { tokens: data, tokensError: error && getReadableError(error) };
};

const osfQueryKeys = {
  all: () => ["os-flagged"],
  tokens: (tokens: BaseToken[]) => [...osfQueryKeys.all(), tokens],
};

export default useOSFlagged;
