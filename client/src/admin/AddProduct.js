import React, { Component } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { getAllcategories, createProduct } from './helper/adminapicall';
import { isAuthenticated, getUser } from '../auth/helper/index';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


toast.configure();


class AddProduct extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            description: '',
            price: '',
            total_units: '',
            categories: [],
            category: '',
            photo: '',
            loading: false,
            formData: new FormData()
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

    //Load all categories 
    componentDidMount() {
        getAllcategories()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    this.setState({
                        categories: data
                    })
                }
            })
            .catch(error => console.log(error))
    }

    //onChange 
    onChangeHandler = (e) => {
        const name = e.target.name;

        const formData = this.state.formData;
        if (name === 'photo') {
            // console.log('photo');
            formData.set(name, e.target.files[0]);
            this.setState({
                [e.target.name]: e.target.files[0],
                formData: formData
            });

        }
        else {
            formData.set(name, e.target.value);
            this.setState({
                [e.target.name]: e.target.value,
                formData: formData
            });
        }
    }



    onSubmitHandler = (e) => {
        e.preventDefault();
        const token = isAuthenticated();
        const user = getUser();
        const data = this.state.formData;


        //Method from admin
        createProduct(user._id, token, data)
            .then(data => {
                if (data.error) {
                    // console.log(data.error);
                    this.setState({
                        name: '',
                        description: '',
                        photo: '',
                        total_units: '',
                        price: '',
                        category: '',
                        formData: new FormData()
                    });
                }

                this.setState({
                    name: '',
                    description: '',
                    photo: '',
                    total_units: '',
                    price: '',
                    category: '',
                    formData: new FormData()
                });

                this.notify(data.message, 'success');

                //Redirect to admin dashboard after 4sec
                setTimeout(() => {
                    this.props.history.push('/admin/dashboard')
                }, 4000)
            })
            .catch(error => {
                this.setState({
                    name: '',
                    description: '',
                    photo: '',
                    total_units: '',
                    category: '',
                    formData: new FormData()
                });
                console.log(error)
            });
    }




    render() {
        let options;
        if (this.state.categories || this.state.categories.length > 0) {
            options = this.state.categories.map(category => {
                return <option
                    key={category._id}
                    value={category._id}>{category.name}</option>
            });
        }
        else {
            options = <>
                <option value="a">a</option>
                <option value="b">b</option>
            </>
        }


        return (
            <Base
                title='Add Product'
                description='Add all products from here'
                className='container bg-dark p-4 mb-5'>
                <div className='row mb-5'>
                    <div className='col-md-5'>
                        <Link to='/admin/dashboard'>
                            <button className='btn btn-info'>Admin dashboard</button>
                        </Link>
                    </div>
                </div>
                <div className='row d-flex justify-content-center'>
                    <div className='col-md-8'>
                        <form>
                            <span className='text-light lead'>Product photo</span>
                            <div className="form-group">
                                <label className="btn btn-block btn-success">
                                    <input
                                        type="file"
                                        name="photo"
                                        accept="image"
                                        placeholder="choose a file"
                                        onChange={this.onChangeHandler}
                                    />
                                </label>
                            </div>
                            <div className="form-group">
                                <input
                                    name="name"
                                    className="form-control"
                                    placeholder="Name"
                                    value={this.state.name}
                                    onChange={this.onChangeHandler}
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    name="description"
                                    className="form-control"
                                    placeholder="Description"
                                    value={this.state.description}
                                    onChange={this.onChangeHandler}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Price"
                                    name='price'
                                    value={this.state.price}
                                    onChange={this.onChangeHandler}
                                />
                            </div>
                            <div className="form-group">
                                <select
                                    className="form-control"
                                    placeholder="Category"
                                    name='category'
                                    onChange={this.onChangeHandler}
                                >
                                    <option>Select</option>
                                    {options}
                                </select>
                            </div>
                            <div className="form-group">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Quantity"
                                    name='total_units'
                                    value={this.state.total_units}
                                    onChange={this.onChangeHandler}
                                />
                            </div>

                            <button
                                type="submit"
                                onClick={this.onSubmitHandler}
                                className="btn btn-success mb-3">
                                Create Product
                            </button>
                        </form>
                    </div>
                </div>
            </Base>
        )
    }
}


export default AddProduct;