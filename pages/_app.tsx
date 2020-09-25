import Head from 'next/head'
import { AppProps } from 'next/app'


import 'bootstrap/dist/css/bootstrap.min.css';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

export default function CustomApp({ Component, pageProps }: AppProps) {
	return <>
		{/* <Head></Head> */}
		<Component {...pageProps} />
	</>
}