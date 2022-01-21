import type { AppProps } from 'next/app'
// import 'react-datasheet/lib/react-datasheet.css';
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
