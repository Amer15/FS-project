import React, { Component, Fragment } from 'react';
import Navbar from '../../core/Navbar/Navbar';
import { isAuthenticated, getUser } from '../../auth/helper/index';
import './UpdatePassword.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



toast.configure();

const API = process.env.REACT_APP_SERVER_URL;


class UpdatePassword extends Component {
    constructor() {
        super();

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
        const token = isAuthenticated();
        const userDetails = getUser();
        const userId = userDetails._id;

        const { email, password } = this.state;

        const data = {
            email: email,
            password: password
        }

        return fetch(`${API}/update/password/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                    this.setState({
                        email: '',
                        password: '',
                        loading: false
                    });
                }
                else {
                    console.log(data);
                    this.notify(data.message, 'success');
                    this.setState({
                        email: '',
                        password: '',
                        loading: false
                    });
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    email: '',
                    password: '',
                    loading: false
                });
            })

    }

    render() {
        return (
            <Fragment>
                <Navbar />
                <div className='container mt-5 update-section p-3 rounded' id='updatePassword-container'>
                    <h4 className='mb-2'>Update your password</h4>
                    <div className='row'>
                        <div className='col-8'>
                            <form onSubmit={this.onSubmitHandler}>
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
                                        placeholder="new password"
                                        required
                                        value={this.state.password}
                                        onChange={this.onChangeHandler} />
                                </div>
                                <button className="update-btn">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}



export default UpdatePassword;