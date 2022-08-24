import { useAccount, useConnect } from "wagmi";
import useGlobalContext from "~test/context/global/useGlobalContext";
import WalletConnectModalUI from "./WalletConnectModalUI";
import WALLETS, { WalletName } from "./walletsMetadata";

const WalletConnectModal = () => {
  const { connectWalletModalOpen, setConnectWalletModalOpen } = useGlobalContext();
  const { connect, connectors, isLoading, error } = useConnect({
    onSuccess: (data) => {
      if (data?.chain.unsupported) {
        throw new Error("Unsupported chain");
      }
      setConnectWalletModalOpen(false);
    },
  });
  const { connector: activeConnector } = useAccount();

  const wallets = connectors.map((connector) => {
    const data = WALLETS[connector.name as WalletName];
    return {
      name: connector.name,
      icon: (
        <div className="border-backgroundColor bg-cardBackgroundColor flex h-10 w-10 items-center justify-center rounded-xl border-2 p-1.5">
          <img src={data.iconURL} alt={connector.name} />
        </div>
      ),
      onClick: () => connect({ connector }),
      connected: connector.name === activeConnector?.name,
    };
  });

  return (
    <WalletConnectModalUI
      wallets={wallets}
      isOpen={connectWalletModalOpen}
      onClose={() => {
        if (isLoading) return;
        setConnectWalletModalOpen(false);
      }}
      loading={isLoading}
      error={error ?? undefined}
    />
  );
};

export default WalletConnectModal;
