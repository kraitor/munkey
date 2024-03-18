import React from 'react';
import { motion } from 'framer-motion';

const Letter = (props: any) => {
    const {
        character: char,
        delay,
        widthLetter,
        heightLetter
    } = props;

    const [character, setCharacter] = React.useState<any>(null);

    React.useEffect(() => {
        setCharacter(char);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        if(char !== character) {
            setCharacter(char);
        }
    }, [char, character]);

    return (
        <motion.div
            style={{ position: 'relative', minWidth: widthLetter, marginLeft: 2, marginRight: 2, textAlign: 'center', height: heightLetter }}
            key={character}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                delay,
                duration: 0.4
            }}>
            <span style={{ position: 'absolute', minWidth: widthLetter, width: widthLetter, top: 0, left: 0, textAlign: 'center', height: heightLetter }}>
                { character }
            </span>
        </motion.div>
    )
}

export default Letter;