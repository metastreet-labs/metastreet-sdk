import { useQuery } from "wagmi";
import getFees, { GetFeesParams, GetFeesResult } from "../../fetchers/getFees";

export type UseFeesQueryParams = GetFeesParams;

export const useFeesQuery = (params: UseFeesQueryParams) => {
  return useQuery<GetFeesResult, Error>(
    useFeesQueryQKs.collection(params),
    () => getFees(params),
    // no need to refetch at all
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 86400,
    }
  );
};

export const useFeesQueryQKs = {
  all: (chainID: number) => ["openSea_fees", chainID],
  collection: (params: GetFeesParams) => [...useFeesQueryQKs.all(params.chainID), params.collectionAddress],
};
