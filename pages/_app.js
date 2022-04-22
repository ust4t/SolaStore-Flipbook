import Head from "next/head";

import "../styles/colors.css";
import "../styles/globals.css";
import "../public/css/app.min.css";
import Script from "next/script";
import StoreProvider from "../context/StoreProvider";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Sola Store Magazine</title>
			</Head>
			<StoreProvider>
				<Component {...pageProps} />
			</StoreProvider>
			<Script
				src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
				integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
				crossOrigin="anonymous"
			/>
			<Script
				type="module"
				src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
				strategy="afterInteractive"
			/>
			<Script
				nomodule
				src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
				strategy="afterInteractive"
			/>
		</>
	);
}

export default MyApp;
