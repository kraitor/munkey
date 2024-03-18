import React, { useRef } from 'react';
import Lottie from 'react-lottie';
import _ from 'lodash';
import * as animationData from '../../animations/check.json'
import { toast } from "react-toastify";
import styles from '../../styles/lottery.module.scss'

const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const NumberSelector = (props) => {
    const {
        visible,
        ticketSize,
        range, // Array of ranges ([0, 49] would mean only numbers from 0 to 49 included)
        onChange,
        onConfirm,
        loading
    } = props;

    const [inputNumber, setInputNumber] = React.useState(null);
    const [selectedNumbers, setSelectedNumbers] = React.useState<any[]>([]);

    const onToggleNumber = (number, deleting = false) => {
        if(number == null || (number == '' && number != '0') || isNaN(number)) {
            return;
        } else if(deleting) {
            selectedNumbers.splice(selectedNumbers.indexOf(number), 1);
            setSelectedNumbers([...selectedNumbers]);
            if(onChange)
                onChange(selectedNumbers);

            return;
        }
        /* else if(!deleting && selectedNumbers.indexOf(number) > -1) {
            toast.error('That number is already on the list');
            return;
        } */

        // Check number
        if(number < range[0] || number > range[1]) {
            toast.error(`The number should be between ${range[0]} to ${range[1]}`);
            return;
        }

        // const updatedNumbers = _.xor(selectedNumbers, [number]);
        selectedNumbers.push(number);
        setSelectedNumbers(selectedNumbers);

        if(onChange)
            onChange(selectedNumbers);
    }

    const onConfirmTicket = () => {
        onConfirm(selectedNumbers);
    }

    React.useEffect(() => {
        if(visible) {
            setSelectedNumbers([]);
            setInputNumber(null);
        }
    }, [visible]);

    const isAllSelected = () => selectedNumbers.length >= ticketSize;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
            <h1 style={{ fontSize: '2em', textAlign: 'center', fontWeight: 800, color: 'white', marginTop: 0, marginBottom: 0 }}>Buy a ticket</h1>
            <h1 style={{ textAlign: 'center', fontWeight: 200, color: 'white', marginTop: 10, marginBottom: 10 }}>{ selectedNumbers.length } / 5 numbers selected</h1>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                { !isAllSelected() &&
                    <div className={styles.buy_ticket_input}>
                        <input
                            type='number'
                            placeholder={'Enter a number'}
                            value={inputNumber}
                            onChange={(evt: any) => {
                                setInputNumber(parseInt(evt.target.value));
                            }}
                            autoFocus
                            onKeyDown={(e: any) => {
                                if (e.key === 'Enter') {
                                    onToggleNumber(inputNumber);
                                    setInputNumber('');
                                }
                            }}
                        />
                        <div className={styles.buy_button_container}>
                            <div
                                className={'wrapper-glow-button buy-button'}>
                                <button
                                    className={`glow-on-hover flip-btn`}
                                    type="button"
                                    onClick={() => {
                                        onToggleNumber(inputNumber);
                                        setInputNumber('');
                                    }}>
                                    Add number
                                </button>
                            </div>
                        </div>
                    </div>
                }

                { !isAllSelected() &&
                    <p style={{ color: 'white', marginTop: 15, marginBottom: 15, fontWeight: 200 }}>Numbers should be between { `${range[0]} - ${range[1]}` }</p>
                }

                { selectedNumbers && selectedNumbers.length > 0 &&
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        { selectedNumbers.map((number, index) => {
                            return (
                                <div
                                    key={number}
                                    className={styles.buy_button_container}
                                    style={{ position: 'relative' }}>
                                    <div
                                        className={'wrapper-glow-button buy-button'}>
                                        <button
                                            className={`glow-on-hover selected`}
                                            type="button"
                                            style={{ minWidth: 100 }}>
                                            { number }
                                        </button>

                                        <div
                                            className='rodal-close'
                                            onClick={() => onToggleNumber(number, true)}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }

                { isAllSelected() &&
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ width: '100%', height: 3, marginTop: 20, marginBottom: 20, background: 'rgba(255,255,255,.1)', borderRadius: 10 }}></div>
                        <div
                            className={'wrapper-glow-button buy-button'}>
                            <button
                                className={`glow-on-hover flip-btn ${loading ? 'disabled' : ''}`}
                                type="button"
                                onClick={onConfirmTicket}>
                                { loading ?
                                    'Waiting for transaction..'
                                :
                                    'Confirm Ticket'
                                }
                            </button>
                        </div>
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

export default NumberSelector;