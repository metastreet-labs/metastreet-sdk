import { AppProps } from "next/app";
import Head from "next/head";
import Connect from "../components/Connect";
import WagmiProvider from "../components/WagmiProvider";
import "../styles/styles.css";

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <WagmiProvider>
      <Head>
        <title>Welcome to test!</title>
      </Head>
      <main className="app">
        <Connect>
          <Component {...pageProps} />
        </Connect>
      </main>
    </WagmiProvider>
  );
};

export default CustomApp;
