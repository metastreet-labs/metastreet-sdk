import { ReactNode, useState } from "react";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const { provider } = configureChains([chain.mainnet, chain.rinkeby], [publicProvider()]);

interface WagmiProviderProps {
  children: ReactNode;
}

const WagmiProvider = ({ children }: WagmiProviderProps) => {
  const [client] = useState(
    createClient({
      persister: null,
      autoConnect: true,
      provider,
    })
  );

  return <WagmiConfig client={client}>{children}</WagmiConfig>;
};

export default WagmiProvider;
