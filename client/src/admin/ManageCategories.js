import React, { Component } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { isAuthenticated, getUser } from '../auth/helper/index';
import { getAllcategories, deleteCategory } from '../admin/helper/adminapicall';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




toast.configure();


class ManageCategories extends Component {
    constructor() {
        super();

        this.state = {
            categories: null,
            total_categories: 0,
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
    loadCategories = () => {
        getAllcategories()
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                }
                else {
                    // console.log(data);
                    this.setState({
                        categories: data,
                        total_categories: data.length
                    });
                }
            })
            .catch(err => console.log(err))
    }

    // //Loading all products
    componentDidMount() {
        this.loadCategories();
    }

    // //Delete product
    onDeleteCategoryHandler = categoryId => {
        this.setState({
            loading: true
        });


        const token = isAuthenticated();
        const user = getUser();

     // Method from helper
       deleteCategory(categoryId, user._id, token)
            .then(data => {
                if (data.error) {
                    this.setState({
                        loading: false
                    });
                    console.log(data.error);
                    this.notify('something went wrong, failed to delete category','error');
                }
                else {
                    this.setState({
                        loading: false
                    });
                    // console.log(data);
                    //load categories after deleting successfully
                    this.loadCategories();
                    this.notify(data.message, 'success');
                }
            })
            .catch(err => console.log(err))
    }


    render() {
        let categories;
        if (this.state.categories !== null && this.state.total_categories > 0) {
            categories = this.state.categories.map(category => {
                return (
                    <div key={category._id} className='row text-center mb-2'>
                        <div className='col-md-4'>
                            <h6 className='text-left text-white'>{category.name}</h6>
                        </div>
                        <div className='col-md-4'>
                            <Link to={`/admin/update/category/${category._id}`}>
                                <button
                                    className='btn btn-success mb-4'>Update</button>
                            </Link>
                        </div>
                        <div className='col-md-4'>
                            <button
                                className='btn btn-danger mb-4'
                                onClick={() => this.onDeleteCategoryHandler(category._id)}>Delete</button>
                        </div>
                    </div>
                )
            })
        }
        else {
            categories = <p className='text-center text-light lead'>No categories to show</p>
        }


        return (
            <Base
                title='Manage Categories'
                description='Manage all categories from here'
                className='container bg-dark p-4 mb-4'>
                <Link to='/admin/dashboard'>
                    <button className='btn btn-outline-info mb-4'>Admin dashboard</button>
                </Link>
                <h2 className='mb-4 text-white font-weight-light text-center'>All categories</h2>
                <div className='row'>
                    <div className='col-12'>
                        <h3
                            className='text-center text-white my-5'>
                            Total categories - <span className="badge badge-pill badge-secondary">{this.state.total_categories}</span>
                        </h3>

                        {categories}

                    </div>
                </div>
            </Base>
        )
    }
}


export default ManageCategories;