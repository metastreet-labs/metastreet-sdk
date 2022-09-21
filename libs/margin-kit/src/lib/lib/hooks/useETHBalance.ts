import { useAccount, useProvider, useQuery } from "wagmi";
import getETHBalance from "../fetchers/getETHBalance";

const useETHBalance = () => {
  const { address } = useAccount();
  const provider = useProvider();

  const queryKey = ["eth-balance", address];
  const { data, error } = useQuery(queryKey, () => getETHBalance(provider, address ?? ""), {
    enabled: Boolean(address),
  });

  return { balance: data, balanceError: error };
};

export default useETHBalance;
