import { ReactNode } from "react";
import { useSigner } from "wagmi";
import WalletConnectModal from "./WalletConnectModal";
import WalletStatusButton from "./WalletStatusButton";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { data: signer } = useSigner();

  return (
    <main className="flex h-screen w-screen flex-col">
      <WalletConnectModal />
      <div className="flex h-20 items-center px-6 shadow">
        <WalletStatusButton />
      </div>
      {signer ? (
        <div className="flex flex-grow overflow-y-auto overflow-x-hidden">{children}</div>
      ) : (
        <div className="flex w-full flex-grow items-center justify-center">Connect wallet</div>
      )}
    </main>
  );
};

export default Layout;
