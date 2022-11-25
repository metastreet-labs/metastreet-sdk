import { useAccount, useQuery } from "wagmi";
import useChainID from "../../../hooks/useChainID";
import useSignerOrProvider from "../../../hooks/useSignerOrProvider";

const useETHBalance = () => {
  const { address = "" } = useAccount();
  const chainID = useChainID();
  const { signer, provider } = useSignerOrProvider();

  return useQuery(
    ethBalanceQueryKeys.address(chainID, address),
    () => (signer ? signer.getBalance() : provider.getBalance(address)),
    { enabled: Boolean(address) }
  );
};

const ethBalanceQueryKeys = {
  all: (chainID: number) => ["eth-balance", chainID],
  address: (chainID: number, address: string) => [...ethBalanceQueryKeys.all(chainID), address],
};

export default useETHBalance;
