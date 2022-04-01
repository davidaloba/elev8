import { AppProps } from 'next/app'
import { wrapper } from '@store'
import '@styles/global.css'

const MyApp = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />

export default wrapper.withRedux(MyApp)
