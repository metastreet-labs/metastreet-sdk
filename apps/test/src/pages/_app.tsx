import { AppProps } from "next/app";
import GlobalProvider from "~test/context/global/GlobalProvider";
import Layout from "../components/Layout";
import Web3Provider from "../context/web3/Web3Provider";
import "../styles/styles.css";

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Web3Provider>
      <GlobalProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GlobalProvider>
    </Web3Provider>
  );
};

export default CustomApp;
