import React, { Component, Fragment } from 'react';
import Navbar from '../../core/Navbar/Navbar';
import { forgotPassword } from '../helper/userapicalls';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ForgotPassword.css';



toast.configure();


class ForgotPassword extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
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
        this.setState({
            loading: true
        });

        const { email } = this.state;

        forgotPassword(email)
        .then(data => {
            if(data.error){
                console.log(data.error);
                this.setState({
                    email: '',
                    loading: false
                });
                this.notify(data.error, 'error');
            }
            else{
                this.setState({
                    email: '',
                    loading: false
                });
                this.notify(data.message, 'success');
            }
        })
        .catch(err => {
            console.log(err);
            this.setState({
                email: '',
                loading: false
            });
        })
    }

    render() {
        let btnText = this.state.loading ? (<div className="spinner-border spinner-border-sm" role="status">
            <span className="sr-only">Loading...</span>
        </div>) : 'Submit';

        return (
            <Fragment>
                <Navbar />
                <div className='container p-3 mt-4'>
                    <div className='row d-flex justify-content-center'>
                        <div className='col-10 d-flex justify-content-center'>
                            <div className='form-container'>
                                <h2 className='text-center'>FORGOT PASSWORD</h2>
                                <form onSubmit={this.onSubmitHandler}>
                                    <div className='formGroup'>
                                        <label htmlFor="email">Email</label>
                                        <input type="email"
                                            name="email"
                                            placeholder="enter email"
                                            autoComplete="off"
                                            required
                                            value={this.state.email}
                                            onChange={this.onChangeHandler} />
                                    </div>

                                    <p>Please provide an email linked to your account.</p>
                                    <button className='submitBtn'>
                                        {btnText}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default ForgotPassword;