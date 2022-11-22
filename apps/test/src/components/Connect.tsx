import { ReactNode } from "react";
import { useAccount, useConnect } from "wagmi";
import Button from "./Button";

interface ConnectProps {
  children: ReactNode;
}

const Connect = (props: ConnectProps) => {
  const { children } = props;
  const { isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();

  if (isConnected) return <>{children}</>;

  const connector = connectors[0];
  return (
    <>
      <Button disabled={!connector?.ready} key={connector.id} onClick={() => connect({ connector })}>
        {isLoading && pendingConnector?.id === connector.id ? "Connecting..." : "Connect"}
      </Button>
      {error ? <div>{error.message}</div> : null}
    </>
  );
};

export default Connect;
