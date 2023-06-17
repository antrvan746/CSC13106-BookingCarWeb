import { AppProps } from "next/app";
import '../styles/global.css'
import Home from ".";


function MyApp({ Component, pageProps }: AppProps) {
	return <Component {...pageProps}/>;
}

export default MyApp;
