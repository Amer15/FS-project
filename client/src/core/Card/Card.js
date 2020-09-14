import React, { Component } from 'react';
import CardImage from '../CardImage/CardImage';
import { addCartToLocalStorage } from '../helper/cartHelper';
import { isAuthenticated, getUser, signout } from '../../auth/helper/index';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from 'react-router-dom';
import './card.css';


toast.configure();


class Card extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: this.props.product,
            addedToCart: false
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

    addToCartHandler = product => {
        isAuthenticated() && getUser() ? addCartToLocalStorage(product, () => {
            this.notify('product added to the cart', 'success');
        }) : signout(() => {
            this.notify('Please signin first to add product to the cart', 'error');
            setTimeout(() => {
                this.props.history.push('/')
            }, 2000)
        });
    }

    addToWishListHandler = productId => {
        console.log(productId);
    }


    render() {
        return (
            <div className="col-6 col-md-4 d-flex justify-content-center my-2">
                <div className="card MyCard">
                    <CardImage product={this.props.product} />
                    <div className="card-body p-2">
                        <h5 className="card-title MyCard-title">{this.props.product.name}</h5>
                        <p className="card-text MyCard-text">{this.props.product.description}</p>
                        <p className='price'>Rs. {this.props.product.price}</p>
                        <button
                            onClick={() => this.addToCartHandler(this.props.product)}
                            className="btn add-btn">
                            <i className="fas fa-shopping-cart"></i> Add to cart</button>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(Card);