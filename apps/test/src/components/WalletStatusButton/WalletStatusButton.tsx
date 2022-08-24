import Davatar from "@davatar/react";
import { useEffect, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import useGlobalContext from "~test/context/global/useGlobalContext";
import useWeb3 from "~test/context/web3/useWeb3";
import { ConnectWalletButton, WalletInfo, WalletInfoButton } from "./WalletStatusButtonUI";

const truncateAddress = (address: string) => {
  return address.slice(0, 6) + "..." + address.slice(address.length - 4);
};

const WalletStatusButton = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { provider } = useWeb3();
  const { setConnectWalletModalOpen } = useGlobalContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !address) {
    return <ConnectWalletButton onClick={() => setConnectWalletModalOpen(true)} />;
  }

  return (
    <WalletInfoButton
      davatar={<Davatar size={32} provider={provider} address={address} />}
      content={<WalletInfo address={truncateAddress(address)} />}
      menuItems={[
        { onClick: () => setConnectWalletModalOpen(true), children: "Change wallet" },
        { onClick: disconnect, children: "Disconnect", warning: true },
      ]}
    />
  );
};

export default WalletStatusButton;
