import React, { Component } from 'react';
import Card from '../Card/Card';
import { getAllProducts } from '../../admin/helper/adminapicall';
import Loader from '../loader/loader';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';



class Home extends Component {
    constructor() {
        super();

        this.state = {
            products: [],
            error: false,
            success: false,
            loading: false,
            errorMsg: ''
        }
    }

    //load all products
    loadAllProducts = () => {
        this.setState({
            loading: true
        });

        //Method from helper
        getAllProducts()
            .then(data => {
                if (data.error) {
                    // console.log(data.error);
                    this.setState({
                        error: true,
                        loading: false,
                        errorMsg: ''
                    });
                }
                else {
                    // console.log(data);
                    this.setState({
                        products: data,
                        loading: false,
                        errorMsg: ''
                    });
                }
            })
            .catch(err => {
                // console.log(err);
                this.setState({
                    loading: false,
                    errorMsg: 'Could not load products, failed to reach server'
                });
            })
    }

    componentDidMount() {
        this.loadAllProducts();
    }


    render() {
        let products;
        if (this.state.products.length > 0) {
            products = this.state.products.map(product => {
                return (
                    <Card key={product._id} product={product} />
                )
            });
        }
        else if (this.state.products.length === 0 && this.state.errorMsg === '') {
            products = (
                <div className='col-8 text-center m-auto'>
                    <h4 className='text-center'>No products to show</h4>
                </div>
            );
        }
        else if (this.state.errorMsg) {
            products = (
                <div className='col-8 text-center m-auto'>
                    <h4 className='text-center'>{this.state.errorMsg}</h4>
                </div>
            );
        }


        return (
            <>
                <Navbar />
                <div className='container-fluid'>
                    <div className='jombotron bg-light text-center text-dark py-5'>
                        <h1 className='display-4'>Home</h1>
                        <p className='lead'>All products page</p>
                    </div>
                </div>
                <div className='container mb-5 p-2'>
                    <div className="row d-flex justify-content-center">
                        <p>All products</p>
                    </div>
                    <div className='row text-center'>
                        {this.state.loading ? <Loader /> : products}
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}




export default Home;