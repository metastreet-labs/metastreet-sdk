import { useMetaStreetQuery } from "../../../components/MetaStreetConfig/MetaStreetQueryClientProvider";
import useChainID from "../../../hooks/meta-street-config/useChainID";
import useSignerAddress from "../../../hooks/meta-street-config/useSignerAddress";
import useSignerOrProvider from "../../../hooks/meta-street-config/useSignerOrProvider";

export const useETHBalance = () => {
  const address = useSignerAddress() ?? "";
  const chainID = useChainID();
  const { signer, provider } = useSignerOrProvider();

  return useMetaStreetQuery(
    useETHBalanceQKs.address(chainID, address),
    () => (signer ? signer.getBalance() : provider.getBalance(address)),
    { enabled: Boolean(address) }
  );
};

export const useETHBalanceQKs = {
  all: (chainID: number) => ["eth-balance", chainID],
  address: (chainID: number, address: string) => [...useETHBalanceQKs.all(chainID), address],
};
