export interface WalletConnectButtonProps {
  className?: string;

  name: string;
  icon: React.ReactNode;
  onClick: () => void;
  connected: boolean;
}

const WalletConnectButton = ({ name, icon, onClick, connected, className = "" }: WalletConnectButtonProps) => {
  return (
    <button
      className="my-1 flex flex-row items-center justify-between rounded-lg border-2 border-purple-900 p-4 font-semibold text-purple-900 hover:bg-purple-900 hover:text-white"
      onClick={onClick}
    >
      {icon}
      <span>{name}</span>
    </button>
  );
};

export default WalletConnectButton;
