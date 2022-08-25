import { ReactNode } from "react";
import { useAccount, useConnect } from "wagmi";
import useMounted from "../hooks/useMounted";

interface ConnectProps {
  children: ReactNode;
}

const Connect = (props: ConnectProps) => {
  const { children } = props;
  const { isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const mounted = useMounted();

  if (!mounted) return null;

  if (isConnected) return <>{children}</>;

  const connector = connectors[0];
  return (
    <>
      <button disabled={!connector.ready} key={connector.id} onClick={() => connect({ connector })}>
        {isLoading && pendingConnector?.id === connector.id ? "Connecting..." : "Connect"}
      </button>
      {error ? <div>{error.message}</div> : null}
    </>
  );
};

export default Connect;
