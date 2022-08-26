import { LoanPriceOracle__factory, Vault__factory } from "@metastreet-labs/pe-contracts-typechain";
import { withReadableError } from "../errors";
import { FetcherParams } from "./types";

const _getSupportedCollections = async (params: FetcherParams) => {
  const { signerOrProvider, deployment } = params;
  const vault = Vault__factory.connect(deployment.vaultAddress, signerOrProvider);
  const loanPriceOracleAddress = await vault.loanPriceOracle();
  const loanPriceOracle = LoanPriceOracle__factory.connect(loanPriceOracleAddress, signerOrProvider);
  const addresses = await loanPriceOracle.supportedCollateralTokens();
  return addresses.map((a) => a.toLowerCase());
};

export const getSupportedCollections = withReadableError(_getSupportedCollections);
