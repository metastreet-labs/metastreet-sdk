import { createContext, ReactNode, useState } from "react";

interface GlobalContextType {
  connectWalletModalOpen: boolean;
  setConnectWalletModalOpen: (isOpen: boolean) => void;
}

export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [connectWalletModalOpen, setConnectWalletModalOpen] = useState(false);

  const contextValue: GlobalContextType = {
    connectWalletModalOpen,
    setConnectWalletModalOpen,
  };

  return <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>;
};

export default GlobalProvider;
