import React, { Component, Fragment } from 'react';
import { NavLink, withRouter, Link } from 'react-router-dom';
import { isAuthenticated, signout, isAdmin, getUser } from '../../auth/helper/index';
import './Navbar.css';


class NewNavbar extends Component {
    constructor() {
        super();

        this.state = {
            clicked: false
        }
    }

    onClickHandler = () => {
        this.setState({
            clicked: !this.state.clicked
        });
    }

    render() {
        const { history } = this.props;
        return (
            <nav className='NavbarItems'>
                <Link className='logo' to='/'><h1 className='Navbar-logo'>Tshirt Store</h1></Link>
                <div className='menu-icon' onClick={this.onClickHandler}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    <li>
                        <NavLink
                            exact
                            className='nav-links'
                            activeClassName='active-class'
                            to='/'>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            exact
                            className='nav-links'
                            activeClassName='active-class'
                            to='/all-products'>
                            Products
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            exact
                            className='nav-links'
                            activeClassName='active-class'
                            to='/user/dashboard'>
                            User Dashboard
                        </NavLink>
                    </li>
                    {
                        isAuthenticated && isAdmin().role === 1 ?
                            <li>
                                <NavLink
                                    exact
                                    className='nav-links'
                                    activeClassName='active-class'
                                    to='/admin/dashboard'>
                                    Admin Dashboard
                                </NavLink>
                            </li> : null
                    }
                    <li>
                        <NavLink
                            exact
                            className='nav-links'
                            activeClassName='active-class'
                            to='/user/cart'>
                            Cart
                        </NavLink>
                    </li>
                    {
                        !isAuthenticated() || !getUser() ?
                            <Fragment>
                                <li>
                                    <NavLink
                                        exact
                                        className='nav-links'
                                        activeClassName='active-class'
                                        to='/signin'>Signin</NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        exact
                                        className='nav-links'
                                        activeClassName='active-class'
                                        to='/signup'>Signup</NavLink>
                                </li>
                            </Fragment>
                            :
                            <li>
                                <NavLink
                                    className='nav-links'
                                    activeClassName='active-class'
                                    to='/signin'
                                    onClick={() => {
                                        signout(() => {
                                            history.push('/')
                                        })
                                    }}>Signout</NavLink>
                            </li>
                    }
                </ul>
            </nav>
        )
    }
}


export default withRouter(NewNavbar);