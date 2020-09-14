import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import Hero from '../Hero/Hero';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './LandingPage.css'

const LandingPage = () => {
    return (
        <Fragment>
            <Navbar/>
            <div className='container-fluid'>
                <div className='row hero-section1'>
                    <h1>Launching new collections soon</h1>
                    <button className='btn btn-outline-success'>Notify Me</button>
                </div>
                <div className='row text-center p-2 category-section mb-5'>
                    <div className='col-12 mt-3'>
                        <h5>Shop by category</h5>
                        <div className='underline'></div>
                        <div className='shopBy-container mt-4'>
                            <div className='shopBy shop-section1'>
                                <Link to='/products/category/Summer/5f4f49237afe873fe005a78a'><h6>Summer</h6></Link>
                            </div>
                            <div className='shopBy shop-section2'>
                                <Link to='/products/category/Winter/5f5782e112f20149e8ab349f'><h6>Winter</h6></Link>
                            </div>
                            <div className='shopBy shop-section3'>
                                <Link to='/products/category/Casual/5f4f49197afe873fe005a789'><h6>Casual</h6></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Hero />
            <Footer />
        </Fragment>
    )
}


export default LandingPage;
