import { ReactNode, useState } from "react";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";

const { provider } = configureChains([chain.mainnet, chain.goerli], [infuraProvider()]);

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
