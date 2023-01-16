import { ReactNode, useState } from "react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli, mainnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { provider } = configureChains([mainnet, goerli], [publicProvider()]);

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
