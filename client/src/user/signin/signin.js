import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../core/Navbar/Navbar';
import { signin, authenticate, isAuthenticated, isAdmin } from '../../auth/helper/index';
import './signin.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



toast.configure();

class Signin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            loading: false
        }
    }

    //Toast Notifications
    notify = (value, type) => {
        if (type === 'success') {
            toast.success(value);
        }
        if (type === 'error') {
            toast.error(value);
        }
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }

        if (this.state.email.length < 6) {
            this.notify('Provide valid email', 'error');
            return;
        }

        if (this.state.password.length < 5) {
            this.notify('password should not be less than 5 charcters', 'error');
            return;
        }

        this.setState({
            loading: true
        });

        //METHOD from auth/index
        signin(user)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                    this.setState({
                        email: '',
                        password: '',
                        loading: false
                    });
                    this.notify(data.error, 'error');
                    return;
                }
                
                // console.log(data);

                //Method from auth/index to store token and user
                authenticate(data, () => {
                    this.setState({
                        email: '',
                        password: '',
                        loading: false
                    });
                });


                //Checking for user or Admin and pushing/redirecting to respective dashboards
                isAuthenticated() && isAdmin().role === 1 ? this.props.history.push('/admin/dashboard') : this.props.history.push('/user/dashboard');

                this.notify(data.message, 'success');
            })
            .catch(error => {
                this.setState({
                    email: '',
                    password: '',
                    loading: false
                });

                console.log(error);
                this.notify('something went wrong', 'error');
            })
    }


    render() {
        let btnText;
        btnText = this.state.loading ? (<div className="spinner-border spinner-border-sm" role="status">
            <span className="sr-only">Loading...</span>
        </div>) : 'Signin';

        return (
            <Fragment>
                <Navbar />
                <div className="container-fluid d-flex justify-content-center mt-3">
                    <div className="row signinForms">
                        <div className="col-md-4 bgImg d-none d-md-flex">
                            <h5 className="text-center">Grab your fav Tshirts Now</h5>
                        </div>
                        <div className="col-md-8 p-2 form-section">
                            <h3 className="text-center">Signin</h3>
                            <form id='form' onSubmit={this.onSubmitHandler}>
                                <div className='input-group'>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        autoComplete="off"
                                        placeholder="email"
                                        required
                                        value={this.state.email}
                                        onChange={this.onChangeHandler} />
                                </div>
                                <div className='input-group'>
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="password"
                                        required
                                        value={this.state.password}
                                        onChange={this.onChangeHandler} />
                                </div>
                                <small id="emailHelp" className="form-text text-muted">Don't have an account? <Link to='/signup'>Signup Here</Link></small>
                                <button className="form-btn">{btnText}</button>
                            </form>
                            <div className='forgot-password-section'>
                                <h6>Need help?</h6>
                                <Link to='/forgot-password'><span>Forgot Password</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}


export default Signin;