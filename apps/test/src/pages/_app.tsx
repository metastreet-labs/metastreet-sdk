import { DeploymentProvider } from "@metastreet-labs/margin-kit";
import { AppProps } from "next/app";
import Head from "next/head";
import Connect from "../components/Connect";
import WagmiProvider from "../components/WagmiProvider";
import useMounted from "../hooks/useMounted";
import "../styles/styles.css";

const CustomApp = ({ Component, pageProps }: AppProps) => {
  // Sad workaround to fix hydration error
  const mounted = useMounted();
  if (!mounted) return null;

  return (
    <WagmiProvider>
      <DeploymentProvider>
        <Head>
          <title>MetaStreet SDK Demo</title>
        </Head>
        <main className="app">
          <Connect>
            <Component {...pageProps} />
          </Connect>
        </main>
      </DeploymentProvider>
    </WagmiProvider>
  );
};

export default CustomApp;
