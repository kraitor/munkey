import React from 'react';
import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'
import Loader from '../components/Layout/Loader';
import Router from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function getLibrary(provider) {
    return new Web3(provider)
}

function MyApp({ Component, pageProps }) {
    const [loading, isLoading] = React.useState(true);

    React.useEffect(() => {
        Router.events.on('routeChangeStart', () => {
            isLoading(true);
        });
        Router.events.on('routeChangeComplete', () => {
            isLoading(false);
        });
        Router.events.on('routeChangeError', () => {
            isLoading(false);
        });

        setTimeout(() => {
            isLoading(false);
        }, 1500);
    }, []);
    
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <Component {...pageProps} />
            <ToastContainer />

            <Loader
                active={loading}
            />
        </Web3ReactProvider>
    )
}

export default MyApp
