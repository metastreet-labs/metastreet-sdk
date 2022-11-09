import { LoanPriceOracle__factory, Vault__factory } from "@metastreet-labs/pe-contracts-typechain";
import { withReadableError } from "../errors";
import { SignerOrProvider } from "./types";

interface GetSupportedCollectionsParams {
  signerOrProvider: SignerOrProvider;
  vaultAddress: string;
}

const _getSupportedCollections = async (params: GetSupportedCollectionsParams): Promise<string[]> => {
  const { signerOrProvider, vaultAddress } = params;
  const vault = Vault__factory.connect(vaultAddress, signerOrProvider);
  const loanPriceOracleAddress = await vault.loanPriceOracle();
  const loanPriceOracle = LoanPriceOracle__factory.connect(loanPriceOracleAddress, signerOrProvider);
  const addresses = await loanPriceOracle.supportedCollateralTokens();
  return addresses.map((a) => a.toLowerCase());
};

export const getSupportedCollections = withReadableError(_getSupportedCollections);
