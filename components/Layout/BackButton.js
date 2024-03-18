import React from 'react';
import { useRouter } from 'next/router'

const BackButton = (props) => {
    const router = useRouter();

    return (
        <section
            onClick={() => {
                router.back();
            }}
            style={{ position: 'absolute', top: 10, left: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
            <img src="/assets/images/icons/left.svg" alt="Back" style={{ maxWidth: 40, marginRight: 10 }} />
            <p style={{ color: 'white', fontWeight: 800 }}>Back</p>
        </section>
    )
}

export default BackButton;