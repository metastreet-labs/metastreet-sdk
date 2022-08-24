import { AppProps } from "next/app";
import Head from "next/head";
import "./styles.css";

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Welcome to test!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default CustomApp;
