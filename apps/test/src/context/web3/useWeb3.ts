import { useProvider } from "wagmi";

export default function useWeb3() {
  const provider = useProvider();

  return { provider, chainID: provider.network.chainId };
}
