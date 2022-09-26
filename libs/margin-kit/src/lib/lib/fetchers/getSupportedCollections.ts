import { Provider } from "@ethersproject/providers";
import { LoanPriceOracle__factory, Vault__factory } from "@metastreet-labs/pe-contracts-typechain";
import { Signer } from "ethers";
import { VAULT_ADDRESS } from "../../env";

const getSupportedCollections = async (sop: Signer | Provider) => {
  const vault = Vault__factory.connect(VAULT_ADDRESS, sop);
  const loanPriceOracleAddress = await vault.loanPriceOracle();
  const loanPriceOracle = LoanPriceOracle__factory.connect(loanPriceOracleAddress, sop);
  const addresses = await loanPriceOracle.supportedCollateralTokens();
  return addresses.map((a) => a.toLowerCase());
};

export default getSupportedCollections;
