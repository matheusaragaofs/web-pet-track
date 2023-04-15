import '@/styles/globals.css'
import 'react-responsive-modal/styles.css';
import { useRouter } from 'next/router';

import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import 'react-toastify/dist/ReactToastify.css';
import { store } from '../redux/store'

import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import withAuth from '@/components/WithAuth';
import _ from 'lodash';
import HeaderMenu from '@/components/HeaderMenu';
const App = ({ Component, pageProps, user, handleLogout }: AppProps) => {

  return (
    <Provider store={store}>
      <div className='d-flex   bg-gradient-to-r   from-[#4505a7] to-[#5312bd]  h-screen items-center justify-center w-full overflow-hidden'>
        <HeaderMenu showingOptions={true} handleLogout={handleLogout} user={user}  />
        <Component {...pageProps} user={user} />
      </div>
      <ToastContainer />
    </Provider>
  );
}

export default withAuth(App)