import { LoanPriceOracle__factory, Vault__factory } from "@metastreet-labs/pe-contracts-typechain";
import { withReadableError } from "../errors";
import { createMulticall } from "../helpers/multicall";
import { getSupportedCollections } from "./getSupportedCollections";
import { SignerOrProvider } from "./types";

export interface GetVaultsSupportedCollectionsParams {
  signerOrProvider: SignerOrProvider;
  vaultAddresses: string[];
  multicallContractAddress: string;
}

export interface GetVaultsSupportedCollectionsResult {
  all: string[];
  [vaultAddress: string]: string[];
}

const _getVaultsSupportedCollections = async (
  params: GetVaultsSupportedCollectionsParams
): Promise<GetVaultsSupportedCollectionsResult> => {
  const { vaultAddresses, signerOrProvider, multicallContractAddress } = params;

  // if only 1 address, don't need to use multicall
  if (vaultAddresses.length <= 1) {
    const collections = await getSupportedCollections({ signerOrProvider, vaultAddress: vaultAddresses[0] });
    return { all: collections, [vaultAddresses[0]]: collections };
  }

  const { multicall } = createMulticall(multicallContractAddress, signerOrProvider);

  const loanPriceOracleAddresses = await multicall(
    vaultAddresses.map((vaultAddress) => {
      const vaultInstance = Vault__factory.connect(vaultAddress, signerOrProvider);

      return {
        target: vaultAddress,
        callData: vaultInstance.interface.encodeFunctionData("loanPriceOracle"),
        decode: (data) => [vaultAddress, vaultInstance.interface.decodeFunctionResult("loanPriceOracle", data)],
      };
    })
  );

  const uniqueLPOAddresses = new Set<string>();
  const lpoToVaultMap: Record<string, string[]> = {};
  for (const { result } of loanPriceOracleAddresses) {
    const vaultAddress = result[0];
    const [lpoAddress] = result[1] as [string];
    uniqueLPOAddresses.add(lpoAddress);
    const lpoToVaultMapEntry = lpoToVaultMap[lpoAddress];
    if (!lpoToVaultMapEntry) {
      lpoToVaultMap[lpoAddress] = [vaultAddress];
    } else {
      lpoToVaultMapEntry.push(vaultAddress);
    }
  }

  const supportedCollectionsResults = await multicall(
    [...uniqueLPOAddresses].map((lpoAddress) => {
      const lpoInstance = LoanPriceOracle__factory.connect(lpoAddress, signerOrProvider);
      return {
        target: lpoAddress,
        callData: lpoInstance.interface.encodeFunctionData("supportedCollateralTokens"),
        decode: (data) => [lpoAddress, lpoInstance.interface.decodeFunctionResult("supportedCollateralTokens", data)],
      };
    })
  );

  const vaultToSupportedCollectionsMap: Record<string, string[]> = {};
  for (const { result } of supportedCollectionsResults) {
    const lpoAddress = result[0];
    const [supportedCollections] = result[1] as [string[]];
    const vaultAddresses = lpoToVaultMap[lpoAddress];
    for (const vaultAddress of vaultAddresses) {
      vaultToSupportedCollectionsMap[vaultAddress] = supportedCollections.map((a) => a.toLowerCase());
    }
  }

  const all = [...new Set(Object.values(vaultToSupportedCollectionsMap).flat())];

  return {
    ...vaultToSupportedCollectionsMap,
    all,
  };
};

export const getVaultsSupportedCollections = withReadableError(_getVaultsSupportedCollections);
