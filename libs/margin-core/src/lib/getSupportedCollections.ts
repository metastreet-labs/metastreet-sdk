import { LoanPriceOracle__factory, Vault__factory } from "@metastreet-sdk/pe-contracts-typechain";
import { FetcherParams } from "./types";

export const getSupportedCollections = (params: FetcherParams) => {
  const { signerOrProvider, deployment } = params;
  const vault = Vault__factory.connect(deployment.vaultAddress, signerOrProvider);
  const loanPriceOracleAddress = await vault.loanPriceOracle();
  const loanPriceOracle = LoanPriceOracle__factory.connect(loanPriceOracleAddress, signerOrProvider);
  const addresses = await loanPriceOracle.supportedCollateralTokens();
  return addresses.map((a) => a.toLowerCase());
};
