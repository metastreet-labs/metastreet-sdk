import { useQuery } from "wagmi";
import getReservoirCollections, { ReservoirCollection } from "../fetchers/getReservoirCollections";
import useSupportedCollections from "./useSupportedCollections";

const useSupportedReservoirCollections = () => {
  const { supportedCollections = [] } = useSupportedCollections();

  const { data, error } = useQuery<ReservoirCollection[], Error>(
    srcQueryKeys.collections(supportedCollections),
    () => getReservoirCollections(supportedCollections),
    {
      enabled: Boolean(supportedCollections.length),
    }
  );

  return { collections: data, collectionsError: error };
};

// src == supportedReservoirCollections
const srcQueryKeys = {
  all: () => ["supported-reservoir-collections"],
  collections: (addresses: string[]) => [...srcQueryKeys.all(), addresses],
};

export default useSupportedReservoirCollections;
