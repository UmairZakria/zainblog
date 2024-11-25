'use client'
import React, { useState, useEffect } from 'react';


const Scroll = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Empty dependency array means this runs once on mount
    const  handelonescroll = ()=> {
      window.scrollTo(0, 0);

    }
    return (
        <>
            {showButton && (
                <button className='text-xl bg-black rounded-full p-3 text-white text-center' onClick={handelonescroll} style={{ position: 'fixed', bottom: '30px', right: '30px' }}>
                TOP
                </button>
            )}
        </>
    );
};

export default Scroll;
