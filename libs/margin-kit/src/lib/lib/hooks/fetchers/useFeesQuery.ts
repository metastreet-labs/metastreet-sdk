import { useQuery } from "wagmi";
import getFees, { GetFeesParams, GetFeesResult } from "../../fetchers/getFees";

export type UseFeesQueryParams = GetFeesParams;

export default function useFeesQuery(params: UseFeesQueryParams) {
  return useQuery<GetFeesResult, Error>(
    useFeesQueryKeys.collection(params),
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
}

export const useFeesQueryKeys = {
  all: (chainID: number) => ["openSea_fees", chainID],
  collection: (params: GetFeesParams) => [...useFeesQueryKeys.all(params.chainID), params.collectionAddress],
};
