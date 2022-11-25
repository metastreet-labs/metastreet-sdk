import { useAccount, useQuery } from "wagmi";
import useChainID from "../../../hooks/useChainID";
import useSignerOrProvider from "../../../hooks/useSignerOrProvider";

export const useETHBalance = () => {
  const { address = "" } = useAccount();
  const chainID = useChainID();
  const { signer, provider } = useSignerOrProvider();

  return useQuery(
    useETHBalanceQKs.address(chainID, address),
    () => (signer ? signer.getBalance() : provider.getBalance(address)),
    { enabled: Boolean(address) }
  );
};

export const useETHBalanceQKs = {
  all: (chainID: number) => ["eth-balance", chainID],
  address: (chainID: number, address: string) => [...useETHBalanceQKs.all(chainID), address],
};
