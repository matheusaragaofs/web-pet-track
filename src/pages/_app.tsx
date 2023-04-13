import '@/styles/globals.css'
import 'react-responsive-modal/styles.css';

import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import 'react-toastify/dist/ReactToastify.css';
import {store} from '../redux/store'

import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <ToastContainer/>
    </Provider>
  );
}
