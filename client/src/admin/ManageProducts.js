import React, { Component } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { isAuthenticated, getUser } from '../auth/helper/index';
import { getAllProducts, deleteProduct } from '../admin/helper/adminapicall';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




toast.configure();


class ManageProducts extends Component {
    constructor() {
        super();

        this.state = {
            products: null,
            total_products: 0,
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

    //Method to load/get all products
    loadProducts = () => {
        getAllProducts()
        .then(data => {
            if (data.error) {
                console.log(data.error);
            }
            else {
                // console.log(data);
                this.setState({
                    products: data,
                    total_products: data.length
                });
            }
        })
        .catch(err => console.log(err))
    }

    //Loading all products
    componentDidMount() {
     this.loadProducts();
    }

    //Delete product
    onDeleteProductHandler = productId => {
        this.setState({
            loading: true
        });


        const token = isAuthenticated();
        const user = getUser();

        //Method from helper
        deleteProduct(productId, user._id, token)
            .then(data => {
                if (data.error) {
                    this.setState({
                        loading: false
                    });
                    console.log(data.error);
                    this.notify('something went wrong, failed to delete product','error');
                }
                else {
                    this.setState({
                        loading: false
                    });
                    // console.log(data);
                    //load products after deleting successfully
                    this.loadProducts();
                    this.notify(data.message, 'success');
                }
            })
            .catch(err => console.log(err))
    }


    render() {
        let products;
        if (this.state.products !== null && this.state.products.length > 0) {
            products = this.state.products.map(product => {
                return (
                    <div key={product._id} className='row text-center mb-2'>
                        <div className='col-md-4'>
                            <h6 className='text-left text-white'>{product.name}</h6>
                        </div>
                        <div className='col-md-4'>
                            <Link to={`/admin/update/product/${product._id}`}>
                                <button 
                                className='btn btn-success mb-4'>Update</button>
                            </Link>
                        </div>
                        <div className='col-md-4'>
                            <button
                                className='btn btn-danger mb-4'
                                onClick={() => this.onDeleteProductHandler(product._id)}>Delete</button>
                        </div>
                    </div>
                )
            })
        }
        else {
            products = <p className='text-center text-light lead'>No products to show</p>
        }

     
        return (
            <Base
                title='Manage Products'
                description='Manage all products from here'
                className='container bg-dark p-4 mb-4'>
                <Link to='/admin/dashboard'>
                    <button className='btn btn-outline-info mb-4'>Admin dashboard</button>
                </Link>
                <h2 className='mb-4 text-white font-weight-light text-center'>All products</h2>
                <div className='row'>
                    <div className='col-12'>
                        <h3 
                        className='text-center text-white my-5'>
                        Total products - <span className="badge badge-pill badge-secondary">{this.state.total_products}</span>
                       </h3>

                        {this.state.loading ? 'Loading...' : products}
                    </div>
                </div>
            </Base>
        )
    }
}


export default ManageProducts;



