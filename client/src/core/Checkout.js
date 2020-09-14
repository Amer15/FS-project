import React, { Component } from 'react';
import { emptyCart, getDetailsOfCartItems } from './helper/cartHelper';
import StripeCheckout from 'react-stripe-checkout';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from 'react-router-dom';
// import { createOrder } from './helper/orderHelper';
import { getUser, isAuthenticated } from '../auth/helper/index';



toast.configure();

const API = process.env.REACT_APP_SERVER_URL;

class Checkout extends Component {
  constructor() {
    super();

    this.state = {
      products: null
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



  //Payment Method
  makePayment = token => {

    const { totalPrice } = this.props;

    const bodyData = {
      token,
      totalPrice
    }



    return fetch(`${API}/make/stripepayment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyData)
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.error) {
          console.log(data.error);
        }
        else {

          // console.log(data);
          // console.log('Transaction_id ' + data.id);
          // console.log('Charged Rs ' + data.amount / 100);
          const amount = data.amount / 100;
          const transaction_id = data.id;

          const { _id } = getUser();
          const userId = _id;
          const token = isAuthenticated();
          const cartProducts = getDetailsOfCartItems();

          const order = {
            products: cartProducts,
            amount: amount,
            transaction_id: transaction_id
          }

          return fetch(`${API}/order/create/${userId}`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(order)
          })
          .then(response => {
            return response.json();
          })
          .then(data => {
            if (data.error) {
              this.notify('purchase failed', 'error');
              console.log(data.error);
            }
            else {
              // this.notify('saved order in DB', 'success');
              console.log(data);
              emptyCart(() => {
                this.props.history.push('/')
                this.notify('purchase successfull', 'success');
              });
            }
          })
          .catch(err =>console.log(err));


          // createOrder(token, orderProducts, orderData)
          //   .then(data => {
              // if (data.error) {
              //   this.notify('Could not save order in DB', 'error');
              //   console.log(data.error);
              // }
              // else {
              //   this.notify('saved order in DB', 'success');
              //   console.log(data);
              // }
          //   })
          //   .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    let payBtn = this.props.totalPrice > 0 ?
      <StripeCheckout
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        token={this.makePayment}
        amount={this.props.totalPrice * 100}
        currency='INR'
        name='Buy Now'
        description='buy your fav tshirts'
        shippingAddress
        billingAddress>
        <button
          style={{ 'cursor': 'default', 'fontWeight': '600', 'opacity': '1' }}
          className='btn btn-primary mt-2 px-4'>Pay with Stripe</button>
      </StripeCheckout> : <button
        style={{ 'cursor': 'not-allowed', 'fontWeight': '600', 'opacity': '0.6' }}
        className='btn btn-primary mt-2 px-4'>Pay with Stripe</button>


    return (
      <div className='checkout-container text-center'>
        <h5>Total amount : Rs. {this.props.totalPrice}</h5>
        {payBtn}
        <br />
      </div>
    )
  }
}

export default withRouter(Checkout);
