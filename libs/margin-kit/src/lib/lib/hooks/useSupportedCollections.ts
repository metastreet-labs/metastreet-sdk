import { useProvider, useQuery } from "wagmi";
import { getReadableError } from "../../utils/errors";
import getSupportedCollections from "../fetchers/getSupportedCollections";

const useSupportedCollections = () => {
  const provider = useProvider();
  const queryKey = ["supported-collections"];
  const { data, error } = useQuery<string[], Error>(queryKey, () => getSupportedCollections(provider));

  const supportedCollections = data;
  const supportedCollectionsError = error && getReadableError(error);
  return { supportedCollections, supportedCollectionsError };
};

export default useSupportedCollections;
