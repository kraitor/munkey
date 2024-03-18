import React from 'react';
import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import Loader from '../components/Layout/Loader';
import Router from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        <>
            <Component {...pageProps} />
            <ToastContainer />

            <Loader
                active={loading}
            />
        </>
    )
}

export default MyApp
