import { AppProps } from "next/app";
import "../styles/global.css";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link href="../public/logo.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
