import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';


const Footer = () => {
    return (
        <footer className='container-fluid bg-dark text-light mt-auto py-2'>
            <div className='container-fluid text-white text-center py-4'>
                <div className='row'>
                    <div className='col-xs-12 col-md-4 p-2 my-2'>
                        <h6>Follow us</h6>
                        <div className='social-media'>
                            <a href='/'><i className="fab fa-facebook"></i></a>
                            <a href='/'><i className="fab fa-instagram"></i></a>
                            <a href='/'><i className="fab fa-google-plus"></i></a>
                        </div>
                    </div>
                    <div className='col-xs-12 col-md-4 p-2 my-2'>
                        <h6>Contact us for any queries</h6>
                        <button className='btn btn-warning'>contact us</button>
                    </div>
                    <div className='col-xs-12 col-md-4 quick-links p-2 my-2'>
                        <h6>Quick Links</h6>
                        <div className='quick-links-container'>
                            <ul>
                                <Link to='/user/dashboard'><li>User Dashboard</li></Link>
                                <Link to='/user/cart'><li>Cart</li></Link>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container bg-dark text-muted text-center'>
                <p>Tshirt Store | Copyrights &copy; 2020</p>
            </div>
        </footer>
    )
}

export default Footer;