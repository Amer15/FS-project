import React from 'react';
import Navbar from './Navbar/Navbar';

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
            <footer className='container-fluid bg-dark text-light mt-auto py-3'>
                <div className='container-fluid text-white text-center py-4'>
                    <h5>Contact us for any queries</h5>
                    <button className='btn btn-warning btn-lg'>contact us</button>
                </div>
                <div className='container bg-dark text-muted text-center'>
                    <p>MERN project &copy; 2020</p>
                </div>
            </footer>
        </>
    )
}

export default Base;
