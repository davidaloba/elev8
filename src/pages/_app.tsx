import { AppProps } from 'next/app'
import { store } from '@store'
import { Provider } from 'react-redux'
import '@styles/global.css'

const MyApp = ({ Component, pageProps }: AppProps) => <Provider store={store}><Component {...pageProps} /></Provider>

export default MyApp
