import { ReactNode, useState } from "react";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const supportedChains = [chain.mainnet, chain.rinkeby];

const { provider } = configureChains(supportedChains, [
  // TODO: must add more providers, default one is highly throttled
  publicProvider(),
]);

const connectors = [new MetaMaskConnector({ chains: supportedChains })];

interface Web3ProviderProps {
  children: ReactNode;
}

const Web3Provider = ({ children }: Web3ProviderProps) => {
  const [client] = useState(() =>
    createClient({
      persister: null,
      autoConnect: true,
      provider,
      connectors,
    })
  );
  return <WagmiConfig client={client}>{children}</WagmiConfig>;
};

export default Web3Provider;
