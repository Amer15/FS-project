import React from 'react';
import {Link} from 'react-router-dom';
import './Hero.css';


const Hero = () => {
    return (
        <div className='container-fluid hero-section mt-4 mb-5'>
           <p>Explore all tshirts Now.</p>
           <Link to='/all-products'>
           <button className='buyBtn'>Buy Now <i className="fas fa-chevron-right"></i></button>
           </Link>
        </div>
    );
}

export default Hero;
