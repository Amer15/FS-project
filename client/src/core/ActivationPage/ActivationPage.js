import React, { Component, Fragment } from 'react';
import jwt from 'jsonwebtoken';
import Navbar from '../Navbar/Navbar';
import './ActivationPage.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



toast.configure();

const API = process.env.REACT_APP_SERVER_URL;


class ActivationPage extends Component {

    //Toast Notifications
    notify = (value, type) => {
        if (type === 'success') {
            toast.success(value);
        }
        if (type === 'error') {
            toast.error(value);
        }
    }

    activateAccountHandler = () => {
        const { token } = this.props.match.params;
        const activationToken = { token }
        return fetch(`${API}/activate/account`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(activationToken)
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                if (data.error) {
                    // console.log(data.error);
                    this.notify(data.error, 'error');
                }
                else {
                    // console.log(data);
                    this.notify(data.message, 'success');
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        const decodeToken = jwt.decode(this.props.match.params.token);
        const { name } = decodeToken;
        return (
            <Fragment>
                <Navbar />
                <div className='container-fluid p-5 activation-main-section'>
                    <div className='row d-flex justify-content-center'>
                        <div className='col-xs-10 col-md-6 activate-card'>
                            <h4 className='mb-2'>Hey {name}, activate your account now.</h4>
                            <button
                                className='btn btn-success activate-btn'
                                onClick={this.activateAccountHandler}>Activate Now</button>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}


export default ActivationPage;