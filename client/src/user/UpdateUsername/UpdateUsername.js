import React, { Component, Fragment } from 'react';
import Navbar from '../../core/Navbar/Navbar';
import { isAuthenticated, getUser } from '../../auth/helper/index';
import './UpdateUsername.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



toast.configure();

const API = process.env.REACT_APP_SERVER_URL;


class Username extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            name: '',
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

        const token = isAuthenticated();
        const userDetails = getUser();
        const userId = userDetails._id;

        const { email, name } = this.state;
        const data = {
            email,
            name
        }

        return fetch(`${API}/update/username/${userId}`, {
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
                        name: '',
                        loading: false
                    });
                }
                else {
                    console.log(data);
                    this.notify(data.message, 'success');
                    this.setState({
                        email: '',
                        name: '',
                        loading: false
                    });
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    email: '',
                    name: '',
                    loading: false
                });
            })

    }



    render() {
        let btnText = this.state.loading ? 'Updating...' : 'Update'
        return (
            <Fragment>
                <Navbar />
                <div className='container mt-5 update-section p-3 rounded' id='updateUsername-container'>
                    <h4 className='mb-2'>Update your username</h4>
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
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="name"
                                        required
                                        autoComplete="off"
                                        value={this.state.name}
                                        onChange={this.onChangeHandler} />
                                </div>
                                <button className="update-btn">{btnText}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}



export default Username;