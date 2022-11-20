import { SignerOrProvider } from "@metastreet-labs/margin-core";
import { providers, Signer } from "ethers";
import { useProvider, useSigner } from "wagmi";

interface UseSignerOrProviderResult {
  signer: Signer | null | undefined;
  provider: providers.Provider;
  signerOrProvider: SignerOrProvider;
}

const useSignerOrProvider = (): UseSignerOrProviderResult => {
  const { data: signer } = useSigner();
  const provider = useProvider();
  const signerOrProvider = signer ?? provider;

  return { signer, provider, signerOrProvider };
};

export default useSignerOrProvider;
