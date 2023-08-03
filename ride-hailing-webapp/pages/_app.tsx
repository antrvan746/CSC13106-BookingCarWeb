import { AppProps } from "next/app";
import "../styles/global.css";
import Head from "next/head";
import { useLoadScript } from "@react-google-maps/api";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <link rel="shortcut icon" href="/logo.png" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
