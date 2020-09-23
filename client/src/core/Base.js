import React from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

const Base = ({
    title = 'My Title Here',
    description = 'This is description',
    className = 'bg-white text-dark p-4',
    children
}) => {
    return (
        <>
            <Navbar />
            <div className='container-fluid'>
                <div className='jombotron bg-light text-center text-dark py-5'>
                    <h1 className='display-4'>{title}</h1>
                    <p className='lead'>{description}</p>
                </div>
                <div className={className}>{children}</div>
            </div>
            <Footer />
        </>
    )
}

export default Base;
