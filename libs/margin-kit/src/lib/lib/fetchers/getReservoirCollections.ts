import { paths } from "@reservoir0x/reservoir-kit-client";
import { BASE_PROXY_URL } from "meta-street/env";

export type ReservoirCollection = NonNullable<
  paths["/collections/v4"]["get"]["responses"]["200"]["schema"]["collections"]
>[0];

const fetchCollections = async (addresses: string[]) => {
  const params = new URLSearchParams(addresses.map((a) => ["contract", a]));
  const url = `${BASE_PROXY_URL}/collections/v4?${params}`;
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) throw data;

  const unsortedCollections = data.collections as ReservoirCollection[];
  const sortedCollections = unsortedCollections.sort((a, b) => {
    const aIdx = addresses.indexOf(a.id?.toLowerCase() ?? "");
    const bIdx = addresses.indexOf(b.id?.toLowerCase() ?? "");
    return aIdx - bIdx;
  });
  return sortedCollections;
};

export default fetchCollections;
