/* @ts-disable */
/* eslint-disable */

import React, { useCallback, useRef } from "react"
import { SEO } from '../components/SEO'
import Head from 'next/head';
import ReactCanvasConfetti from "react-canvas-confetti";
import { useRouter } from 'next/router'
import Footer from '../components/Layout/Footer';
import Rodal from 'rodal';
import _ from 'lodash';
import {
    CircularProgress,
    Snackbar
} from '@mui/material';
import styles from '../styles/nfts.module.scss'

import { copyToClipboard } from '../utils/clipboard';
import { toast } from "react-toastify";
import ImageLoader from 'react-load-image';
import 'rodal/lib/rodal.css';

const BASE_PATH = process.env.NODE_ENV == 'development' ? '' : '';

let INTERVAL_RELOAD = null;

const BET_TYPE = {
    UNKNOWN: 0,
    TAILS: 1,
    HEAD: 2
};

const canvasStyles = {
    position: "fixed",
    pointerEvents: "none",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0
};

const canvasStyles2 = {
    position: "fixed",
    pointerEvents: "none",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0
};

const NFTMint = (props) => {
    const refAnimationCenter = useRef(null);
    const refAnimationLaterals = useRef(null);

    const router = useRouter();
    const [mintingActive, isMintingActive] = React.useState(null);
    const [price, setPrice] = React.useState(null);
    const [originalPrice, setOriginalPrice] = React.useState(null);
    const [discount, setDiscount] = React.useState(null);
    const [tokenBalance, setTokenBalance] = React.useState(null);
    const [supply, setSupply] = React.useState(null);
    const [balanceOf, setBalanceOf] = React.useState(null);
    const [owned, setOwned] = React.useState(null);
    const [tokensToMint, setTokensToMint] = React.useState(1);
    const [maxTxMint, setMaxTxMint] = React.useState(0);
    const [maxSupply, setMaxSupply] = React.useState(0);
    const [minting, isMinting] = React.useState(false);
    const [loadingNftImage, isLoadingNftImage] = React.useState(false);

    const [tokenInfo, setTokenInfo] = React.useState(null);
    const [modalVisible, isModalVisible] = React.useState(false);
    const [messageNode, setMessageNode] = React.useState(null);
    const [loading, isLoading] = React.useState(false);
    const [betAmounts, setBetAmounts] = React.useState([]);
    const [connected, isConnected] = React.useState(false);
    const [multiplier, setMultiplier] = React.useState(-1);
    const [bnbValue, setBNBValue] = React.useState(null);
    const [snackbar, setSnackbar] = React.useState({
        open: false,
        message: '',
        type: 'success'
    });

    const [flipping, isFlipping] = React.useState(false);
    const [betAmount, setBetAmount] = React.useState(0);
    const [betType, setBetType] = React.useState(BET_TYPE.UNKNOWN);

    const getInstanceAnimationCenter = useCallback((instance) => {
        refAnimationCenter.current = instance;
    }, []);

    const getInstanceAnimationLaterals = useCallback((instance) => {
        refAnimationLaterals.current = instance;
    }, []);

    const makeShot = useCallback((particleRatio, opts) => {
        refAnimationCenter.current &&
            refAnimationCenter.current({
                ...opts,
                origin: { y: 0.7 },
                particleCount: Math.floor(200 * particleRatio)
            });
    }, []);

    function getAnimationSettings(angle, originX) {
        return {
            particleCount: 200,
            angle,
            spread: 55,
            origin: { x: originX },
            colors: ["#bb0000", "#ffffff"]
        };
    }

    const fireConfetti = useCallback(() => {
        makeShot(0.25, {
            spread: 26,
            startVelocity: 55
        });

        makeShot(0.2, {
            spread: 60
        });

        makeShot(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
        });

        makeShot(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
        });

        makeShot(0.1, {
            spread: 120,
            startVelocity: 45
        });

        // Lateral confettis
        if (refAnimationLaterals.current) {
            setTimeout(() => {
                refAnimationLaterals.current(getAnimationSettings(60, 0));
                refAnimationLaterals.current(getAnimationSettings(120, 1));
            }, 500);
        }
    }, [makeShot]);

    React.useEffect(() => {
        setTimeout(() => {
            try {
                document.querySelector('.preloader').remove();
            } catch (err) { }
        }, 2000);

        onStart();
    }, []);

    const onStart = () => {
        const revealNfts = [
            { id: 'preview_1', delay: 0, duration: 2000 },
            { id: 'preview_2', delay: 300, duration: 2000 },
            { id: 'preview_3', delay: 600, duration: 2000 },
            { id: 'preview_4', delay: 900, duration: 2000 },
            { id: 'preview_5', delay: 1200, duration: 2000 },
            { id: 'preview_6', delay: 1500, duration: 2000 },
            { id: 'preview_7', delay: 1800, duration: 2000 },
        ];

        const makeAnimation = (isFirstTime) => {
            const randomAnimations = [
                { opacity: 1, rotate: _.random(-10, 10), scale: 1.1, translateY: 5, translateX: -10, filter: 'blur(0px)' },
                { opacity: 1, rotate: 0, scale: 1, translateY: 0, translateX: 10, filter: 'blur(0px)' },
                { opacity: 1, rotate: 0, scale: 0.85, translateY: -5, translateX: 0, filter: 'blur(0px)' }
            ]

            let index = 0;

            for (const reveal of revealNfts) {
                index++;

                let randomAnimation = _.sample(randomAnimations);
                if (isFirstTime) {
                    randomAnimation = { opacity: 1, translateX: -5, filter: 'blur(10px)' }
                }

                anime({
                    targets: `#${reveal.id}`,
                    duration: reveal.duration,
                    delay: reveal.delay,
                    easing: 'easeOutElastic',
                    ...randomAnimation
                });
            }
        }

        makeAnimation(true)
        setTimeout(() => {
            makeAnimation(false)
            setInterval(() => {
                makeAnimation()
            }, 6 * 1000);
        }, 2 * 1000);

        setTimeout(() => {
            anime({
                targets: '#footer',
                complete: () => {
                    anime({
                        targets: '#footer',
                        duration: 5000
                    })
                }
            });
        }, 2 * 1000);
    }

    return (
        <div className={[styles.container, loading ? styles.loading : null, styles.has_footer].join(' ')}>

            <SEO
                title={'Munkey | Slerf Killer'}
                description={`Munkey in Solana | Don't miss | Slerf Killer!`}
                image="https://i.ibb.co/hZzjmYB/munkey.jpg"
            />

            <SnackbarElement
                open={snackbar.open}
                message={snackbar.message}
                autoHideDuration={snackbar.autoHideDuration ? snackbar.autoHideDuration : 3000}
                onClose={() => {
                    snackbar.open = false;
                    snackbar.message = false;
                    setSnackbar({ ...snackbar });
                }}
                type={snackbar.type}
            />

            {
                // @ts-disable-next-line
                // eslint-disable-next-line
            }
            <ReactCanvasConfetti refConfetti={getInstanceAnimationCenter} style={canvasStyles} />
            <ReactCanvasConfetti refConfetti={getInstanceAnimationLaterals} style={canvasStyles2} />

            <div className={styles.header_block}>
                <img
                    src="/assets/images/logo.png"
                    style={{ maxWidth: 150, borderRadius: '50%', overflow: 'hidden' }}
                />
            </div>

            <div className={`${[styles.game_container].join(' ')} ${flipping ? 'is_flipping' : ''}`}>
                <h1 style={{ fontSize: '5em', color: 'white', textAlign: 'center' }}>Munkey in SOLANA</h1>
                <h2 style={{ fontSize: '1.5em', color: 'rgba(255,255,255,.5)', textAlign: 'center' }}>SLERF KILLER</h2>
                <div className={styles.preview_boxes} id="preview_boxes">
                    <div id={'preview_1'} className={[styles.preview_nft]}></div>
                    <div id={'preview_2'} className={[styles.preview_nft]}></div>
                    <div id={'preview_3'} className={[styles.preview_nft]}></div>
                    <div id={'preview_4'} className={[styles.preview_nft]}></div>
                    <div id={'preview_5'} className={[styles.preview_nft]}></div>
                    <div id={'preview_6'} className={[styles.preview_nft]}></div>
                    <div id={'preview_7'} className={[styles.preview_nft]}></div>
                </div>

                <div className={styles.edition_selection} style={{ display: 'flex', flexDirection: 'row' }}>
                    <button
                        className={`glow-on-hover effect-1`}
                        type="button"
                        onClick={() => {
                            window.open("https://t.me/MunkeySolana")
                        }}>
                        <h1 style={{ letterSpacing: 2 }}>Telegram</h1>
                    </button>

                    <button
                        className={`glow-on-hover effect-2`}
                        type="button"
                        onClick={() => {
                            window.open("https://twitter.com/MunkeySOL")
                        }}>
                        <h1 style={{ letterSpacing: 2 }}>Twitter</h1>
                    </button>

                    <button
                        className={`glow-on-hover effect-3`}
                        type="button"
                        onClick={() => {
                            window.open("https://dexscreener.com/solana/5tjj6Ramjbjzn6Sdk9g51f1Psx8BseVeuZ6PRzbU5Rne")
                        }}>
                        <h1 style={{ letterSpacing: 2 }}>Chart</h1>
                    </button>
                </div>
            </div>

            <Rodal width={550} height={360} visible={modalVisible} onClose={() => isModalVisible(false)} className='modal_container'>
                {messageNode}
            </Rodal>

            {loading &&
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: loading ? 1 : 0, background: 'rgba(0,0,0,0.8)', zIndex: 999999999999 }}>
                    <CircularProgress size={50} style={{ color: '#76ccc3' }} />
                </div>
            }

            <Footer />
        </div>
    )
}

const SnackbarElement = (props) => {
    const {
        onClose
    } = props;

    return (
        <Snackbar
            {...props}
            ContentProps={{
                classes: {
                    root: [styles.snackbar_root, props.type == 'success' ? styles.snackbar_success : null].join(' ')
                }
            }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}
            action={
                <button
                    onClick={onClose}
                    className={[styles.snackbar_action_button].join(" ")}>
                    Close
                </button>
            }
        />
    )
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default NFTMint;