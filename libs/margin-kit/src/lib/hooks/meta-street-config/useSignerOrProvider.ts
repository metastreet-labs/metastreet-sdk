import { SignerOrProvider } from "@metastreet-labs/margin-core";
import { providers, Signer } from "ethers";
import { useMetaStreetConfig } from "../../components/MetaStreetConfig";

interface UseSignerOrProviderResult {
  signer: Signer | null | undefined;
  provider: providers.Provider;
  signerOrProvider: SignerOrProvider;
}

const useSignerOrProvider = (): UseSignerOrProviderResult => {
  const { signer, provider } = useMetaStreetConfig();
  return { signer, provider, signerOrProvider: signer || provider };
};

export default useSignerOrProvider;
