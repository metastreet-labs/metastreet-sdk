import { withReadableError } from "../errors";
import { getSupportedCollections } from "./getSupportedCollections";
import { SignerOrProvider } from "./types";

export interface GetVaultsSupportedCollectionsParams {
  signerOrProvider: SignerOrProvider;
  vaultAddresses: string[];
}

export interface GetVaultsSupportedCollectionsResult {
  all: string[];
  [vaultAddress: string]: string[];
}

const _getVaultsSupportedCollections = async (
  params: GetVaultsSupportedCollectionsParams
): Promise<GetVaultsSupportedCollectionsResult> => {
  const { vaultAddresses, signerOrProvider } = params;
  const supportedCollections = await Promise.all(
    vaultAddresses.map((vaultAddress) => getSupportedCollections({ signerOrProvider, vaultAddress }))
  );
  const result: GetVaultsSupportedCollectionsResult = { all: [] };
  supportedCollections.forEach((collections, idx) => {
    result.all = [...result.all, ...collections];
    result[vaultAddresses[idx]] = collections;
  });
  // remove duplicated values
  result.all = [...new Set(result.all)];
  return result;
};

export const getVaultsSupportedCollections = withReadableError(_getVaultsSupportedCollections);
