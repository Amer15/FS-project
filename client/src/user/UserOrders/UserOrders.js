import React, { Component, Fragment } from 'react';
import Navbar from '../../core/Navbar/Navbar';
import Footer from '../../core/Footer/Footer';
import { getUser, isAuthenticated } from '../../auth/helper/index';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UserOrders.css';

toast.configure();

const API = process.env.REACT_APP_SERVER_URL;

class UserOrders extends Component {
    constructor() {
        super();

        this.state = {
            orders: [],
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

    getOrdersByUserId = () => {
        this.setState({
            loading: true
        });

        const { _id } = getUser();
        const userId = _id;
        const token = isAuthenticated();


        return fetch(`${API}/order/myorders/${userId}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    this.notify('Failed to get orders', 'error');
                    // console.log(data.error);
                    this.setState({
                        loading: false
                    });
                }
                else {
                    console.log(data);
                    this.setState({
                        orders: data.orders,
                        loading: false
                    });
                }
            })
            .catch(err => console.log(err));
    }


    componentDidMount = () => {
        this.getOrdersByUserId();
    }

    render() {
        let orders;
        if (this.state.orders.length === 0 && this.state.loading === true) {
            orders = <h6>Loading...</h6>
        }
        else if (this.state.orders.length === 0 && this.state.loading === false) {
            orders = <h6>No orders to show</h6>
        }
        else if (this.state.orders.length > 0 && this.state.loading === false) {
            orders = this.state.orders.map(order => {
                return (
                    <div key={order._id} className='row rounded d-flex justify-content-center my-2 myorder-main-card p-1'>
                        <div className='col-10 rounded p-2 myorder-card'>
                            <div>
                                <p><span className="badge badge-pill badge-dark">Order Id</span> : {order._id}</p>
                                <h6><span className="badge badge-pill badge-dark">Products ordered</span></h6>
                                <div className='pb-1'>
                                    {order.products.map(prod => {
                                        return (<p key={prod._id}>{prod.name}</p>)
                                    })}
                                </div>
                                <div>
                                    <span className='mx-2'><span className="badge badge-pill badge-dark">amount</span> : {order.amount}</span>
                                    <span><span className="badge badge-pill badge-dark">status</span> : {order.status}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }

        return (
            <Fragment>
                <Navbar />
                <div className='container mt-4 text-center p-3'>
                    <h5 className='pb-4'>My Orders</h5>
                    {orders}
                </div>
                <Footer />
            </Fragment>
        )
    }
}


export default UserOrders;
