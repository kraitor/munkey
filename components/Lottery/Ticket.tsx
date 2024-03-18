import React from 'react';
import { motion } from 'framer-motion';

const Ticket = (props: any) => {
    const {
        numbers
    } = props;

    return (
        <div className='d-flex flex-row justify-content-center align-items-center' style={{ height: 40, marginBottom: 20 }}>
            { numbers.map((number, index) => {
                return (
                    <motion.div
                        style={{ position: 'relative', minWidth: 80, textAlign: 'center', height: 40 }}
                        key={`winning-number-${number}`}
                        initial={{ y: (-5 * index), opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            delay: (0.2 * index),
                            duration: (0.2 * index)
                        }}>
                        <span style={{ position: 'absolute', minWidth: '100%', width: '100%', top: 0, left: 0, textAlign: 'center', height: '100%', fontWeight: 800, color: '#f0b90b', fontSize: '2em', textShadow: '6px 6px #332f24, 3px 3px #332f24' }}>
                            { number }
                        </span>
                    </motion.div>
                )
            })}
        </div>
    )
}

export default Ticket;