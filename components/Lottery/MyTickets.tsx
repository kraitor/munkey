import React, { useRef } from 'react';
import Lottie from 'react-lottie';
import _ from 'lodash';
import * as animationData from '../../animations/check.json'
import styles from '../../styles/lottery.module.scss'
import Ticket from './Ticket';

const MyTickets = (props) => {
    const {
        tickets
    } = props;

    const [inputNumber, setInputNumber] = React.useState(null);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', width: '100%', height: '100%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
            <h1 className={styles.fire} style={{ fontWeight: 800, color :'white', fontSize: '2em', marginBottom: 15 }}>Your tickets</h1>

            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                { tickets && tickets.length === 0 &&
                    <p style={{ fontSize: '1.2em', color: 'white', textDecoration: 'underline' }}>You don't have any tickets for current lottery</p>
                }

                { tickets && tickets.length > 0 &&
                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        { tickets.map((ticket, index) => {
                            return (
                                <div key={index} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: 20, background: 'rgba(0,0,0,.075)', padding: 10, borderRadius: 20, border: '1px solid rgba(255,255,255,.05)', marginTop: 20 }}>
                                    <h1 style={{ fontSize: '2em', textAlign: 'center', fontWeight: 800, color: 'white', marginTop: 0, marginBottom: 0 }}>Ticket #{ parseInt(ticket.ticketId) }</h1>

                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                        <Ticket
                                            numbers={ticket.numbers}
                                        />
                                        {/* { ticket.numbers.map((number, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className={styles.buy_button_container}
                                                    style={{ position: 'relative' }}>
                                                    <div
                                                        className={'wrapper-glow-button'}>
                                                        <button
                                                            className={`glow-on-hover`}
                                                            type="button"
                                                            style={{ minWidth: 100 }}>
                                                            { number }
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })} */}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        </div>
    )
}

const Number = (props) => {
    const {
        number,
        selected: selectedNumber,
        onSelected
    } = props;

    const [selected, isSelected] = React.useState(false);
    const [playingAnimation, isPlayingAnimation] = React.useState(false);
    const lottieRef = React.useRef(null);

    React.useEffect(() => {
        isSelected(selectedNumber);
        if(selectedNumber == true) {
            isPlayingAnimation(true);
        } else {
            isPlayingAnimation(false);
        }
    }, [selectedNumber]);

    return (
        <div
            onClick={onSelected}
            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 80, height: 80, borderRadius: 40, color: 'white', margin: 10, position: 'relative', cursor: 'pointer', background: '#555' }}
            className={[styles.number, selectedNumber ? styles.selectedNumber : styles.nonSelected].join(' ')}>
            <h1 style={{ fontWeight: 800 }}>{ number }</h1>

            <Lottie
                ref={lottieRef}
                options={{
                    loop: false,
                    autoplay: false, 
                    animationData: animationData,
                    rendererSettings: {
                        preserveAspectRatio: 'none'
                    }
                }}
                height={80}
                width={80}
                isPaused={!playingAnimation}
                style={{ position: 'absolute', top: 0, left: 0, width: 80, height: 80, zIndex: 100 }}
            />
        </div>
    )
}

export default MyTickets;