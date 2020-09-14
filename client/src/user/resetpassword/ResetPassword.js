import React, { Component, Fragment } from 'react';
import Navbar from '../../core/Navbar/Navbar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ResetPassword.css';
import { resetPassword } from '../helper/userapicalls';



toast.configure();

class ResetPassword extends Component {
    constructor() {
        super();

        this.state = {
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
        this.setState({
            loading: true
        });

        const { token } = this.props.match.params;
        const { password } = this.state;

        
        resetPassword(token, password)
        .then(data => {
            if(data.error){
                this.setState({
                    password: '',
                    loading: false
                });
                this.notify('something went wrong', 'error');
            }
            else{
                this.setState({
                    password: '',
                    loading: false
                });
                this.notify(data.message, 'success');
            }
        })
        .catch(err => {
            console.log(err);
            this.setState({
                password: '',
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
                                <h2 className='text-center'>RESET PASSWORD</h2>
                                <form onSubmit={this.onSubmitHandler}>
                                    <div className='formGroup'>
                                        <label htmlFor="password">New Password</label>
                                        <input type="password"
                                            name="password"
                                            placeholder="enter password"
                                            required
                                            value={this.state.password}
                                            onChange={this.onChangeHandler} />
                                    </div>

                                    <p>Enter your new password.</p>
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

export default ResetPassword;