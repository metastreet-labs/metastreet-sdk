import MetaStreetModal from "../MetaStreetModal";
import WalletConnectButton, { WalletConnectButtonProps } from "./WalletConnectButton";

export interface WalletConnectModalUIProps {
  wallets: Omit<WalletConnectButtonProps, "className">[];
  loading?: boolean;
  error?: Error | undefined;
  isOpen: boolean;
  onClose: () => void;
}

const Footer = ({
  className = "",
  error,
  loading,
}: Pick<WalletConnectModalUIProps, "loading" | "error"> & { className?: string }) => {
  if (loading) {
    return <span className={`text-center opacity-60 ${className}`}>Connecting...</span>;
  }

  if (error) {
    return <span className={`text-center text-orange-400 ${className}`}>{error.message}</span>;
  }

  return null;
};

const WalletConnectModalUI = ({ wallets, loading = false, error, isOpen, onClose }: WalletConnectModalUIProps) => {
  return (
    <MetaStreetModal isOpen={isOpen} onClose={onClose}>
      <MetaStreetModal.Title>Connect wallet</MetaStreetModal.Title>
      {wallets.map((wallet, index) => (
        <WalletConnectButton key={`${wallet.name}-${index}`} {...wallet} />
      ))}
      <Footer className="mt-4" loading={loading} error={error} />
    </MetaStreetModal>
  );
};

export default WalletConnectModalUI;
