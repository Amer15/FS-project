import React, { Component } from 'react';
import Base from './Base';
import Checkout from './Checkout';
import { getCartDetails, updateCartItems, getCartTotalPrice } from './helper/cartHelper';

const API = process.env.REACT_APP_SERVER_URL;

class Cart extends Component {
    constructor(){
        super();

        this.state = {
            cartItems: null
        }
    }

    componentDidMount(){
        const cartItems = getCartDetails();
        this.setState({
            cartItems: cartItems
        });
    }


    onRemoveCartItemHandler = (itemId) => {
      const items = [...this.state.cartItems];
      let newItems = items.filter( item => item._id !== itemId);
    
      //Update LocalStorage Cart and state cartItems
      updateCartItems(newItems);

      if(newItems.length === 0){
        newItems = null;
      }

      this.setState({
          cartItems: newItems
      });
    }

    getTotalPrice = () => {
        //Helper method
        return getCartTotalPrice();
    }


    render() {
        //  console.log(this.getTotalPrice())
        let items = this.state.cartItems && this.state.cartItems.length > 0 ? this.state.cartItems.map( (item, i) => {
            return (
                <div key={i} className='row text-white text-center bg-dark d-flex justify-content-between my-2 p-1'>
                <div className='col-4 d-flex justify-content-center align-items-center'>
                    <img
                        src={`${API}/product/photo/${item._id}`}
                        alt='product'
                        // style={{ maxHeight: "100%", maxWidth: "100%" }}
                        style={{height: '85%', width: '100%'}}
                        className="rounded"
                    />
                </div>
                <div className='col-8 p-1'>
                    <h5>{item.name}</h5>
                    <p>Rs. {item.price}</p>
                    <button 
                    className='btn btn-danger align-self-center'
                    style={{'fontSize':'14px'}}
                    onClick={() => this.onRemoveCartItemHandler(item._id)}>
                    <i className="fas fa-trash"></i>  Remove Item</button>
               </div>
            </div>
            )
        }) : 'no items in cart';
        
        return (
            <Base title='My Cart'
                description='your cart is ready for checkout'
                className='container p-4 mb-4'>
                <div className='row'>
                    <div className='col-sm-12 col-md-6'>
                        {items}
                    </div>
                    <div className='col-sm-12 col-md-6 p-2'>
                        <Checkout 
                        products={this.state.cartItems} 
                        totalPrice={this.getTotalPrice()}/>
                    </div>
                </div>
            </Base>
        )
    }
}


export default Cart;
