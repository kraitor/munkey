/* eslint-disable @next/next/no-sync-scripts */
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <meta charset="utf-8" />
                    <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                    {/* <meta name="description" content="Cas Inu | FlipCoin Game" />
                    <meta property="og:title" content="Cas Inu | FlipCoin Game" />
                    <meta property="og:description" content="Cas Inu | FlipCoin Game" />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://casinubsc.kraitor.dev/" />
                    <meta property="og:video" content="/assets/og_covers/ogcover_home.mp4" />
                    <meta property="og:video" content="/assets/og_covers/ogcover_home.mp4" /> */}

                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                    {/* <link href="https://fonts.googleapis.com/css2?family=Inter&display=optional" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" /> */}
                    <link href="/assets/css/global.css" rel="stylesheet" />
                    <link href="/assets/css/loader.css" rel="stylesheet" />
                    <link rel="icon" type="image/png" href="/favicon.png"></link>

                    { /* Basic website assets */ }
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css" integrity="sha512-1sCRPdkRXhBV2PBLUdRb4tMg1w2YPf37qatUFeS7zlBy7jJI8Lf4VHwWfZZfpXtYSLy85pkm9GaYVYMfw5BC1A==" crossOrigin="anonymous" referrerpolicy="no-referrer" />
                    <link href='https://fonts.googleapis.com/css?family=Poppins&display=optional' rel='stylesheet' />

                    <script
                        src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument