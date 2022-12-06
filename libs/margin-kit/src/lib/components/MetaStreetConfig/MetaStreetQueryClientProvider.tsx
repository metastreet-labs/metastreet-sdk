import {
  QueryClient,
  QueryClientProvider,
  QueryFunction,
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { createContext, PropsWithChildren } from "react";

const MetaStreetQueryClientContext = createContext<QueryClient | undefined>(undefined);

type UseQuery = <TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, "queryKey" | "queryFn" | "context">
) => UseQueryResult<TData, TError>;

export const useMetaStreetQuery: UseQuery = (queryKey, queryFn, options) => {
  return useQuery(queryKey, queryFn, { ...options, context: MetaStreetQueryClientContext });
};

type MetaStreetQueryClientProviderProps = PropsWithChildren<{ client: QueryClient }>;

const MetaStreetQueryClientProvider = (props: MetaStreetQueryClientProviderProps) => {
  const { client, children } = props;

  return (
    <QueryClientProvider client={client} context={MetaStreetQueryClientContext}>
      {children}
    </QueryClientProvider>
  );
};

export default MetaStreetQueryClientProvider;
