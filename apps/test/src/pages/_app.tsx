import { AppProps } from "next/app";
import Head from "next/head";
import Connect from "../components/Connect";
import DemoMetaStreetConfig from "../components/DemoMetaStreetConfig";
import WagmiProvider from "../components/WagmiProvider";
import useMounted from "../hooks/useMounted";
import "../styles/styles.css";

const CustomApp = ({ Component, pageProps }: AppProps) => {
  // Sad workaround to fix hydration error
  const mounted = useMounted();
  if (!mounted) return null;

  return (
    <WagmiProvider>
      <DemoMetaStreetConfig>
        <Head>
          <title>MetaStreet SDK Demo</title>
        </Head>
        <main className="flex">
          <Connect>
            <Component {...pageProps} />
          </Connect>
        </main>
      </DemoMetaStreetConfig>
    </WagmiProvider>
  );
};

export default CustomApp;
