import React, { Component } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { isAuthenticated, getUser } from '../auth/helper/index';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCategoryById, updateCategory } from './helper/adminapicall';



toast.configure();

class UpdateCategory extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            loading: false,
            success: false,
            error: false
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

    //loading category
    loadCategory = () => {
        const { categoryId } = this.props.match.params;

        this.setState({
            loading: true
        });

        //Method from helper
        getCategoryById(categoryId)
        .then( data =>{
            if(data.error){
                console.log(data.error)
            }
            else{
                // console.log(data);
                this.setState({
                    name: data.name,
                    loading: false
                });
            }
        })
        .catch( err => {
            console.log(err);
            this.setState({
                loading: false
            });
        })
    }


    componentDidMount(){
        this.loadCategory();
    }


    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        const { categoryId } = this.props.match.params;

        this.setState({
            loading: true
        });

        const token = isAuthenticated();
        const user = getUser();
        const name = this.state.name;

        if (name.length < 4) {
            this.notify('Name should be atleast 4 characters long', 'error');
            return;
        }

        //Method from helper
        updateCategory(categoryId, user._id, token, { name })
            .then(data => {
                if (data.error) {
                    this.setState({
                        name: '',
                        loading: false,
                        success: false,
                        error: true
                    });
                    console.log(data.error);
                }
                else {
                    this.setState({
                        name: '',
                        loading: false,
                        success: true,
                        error: false
                    });
                    // console.log(data);
                    this.notify(data.message, 'success');
                }
            })
            .catch(err => console.log(err));
    }



    render() {
        let btnText = this.state.loading ? 'Adding...' : 'Update Category';
        return (
            <Base title='Add Category'
                description='Add tshirt categories'
                className='bg-white text-dark p-4'>
                <div className='row'>
                    <div className='col-md-8 offset-md-2'>
                        <form>
                            <div className='form-group'>
                                <label htmlFor="category" className='lead'>Category</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="category"
                                    autoComplete='off'
                                    required
                                    placeholder="ex. winter"
                                    value={this.state.name}
                                    name='name'
                                    onChange={this.onChangeHandler} />
                            </div>
                            <button
                                type="button"
                                className="btn btn-outline-info"
                                onClick={this.onSubmitHandler}>{btnText}</button>
                        </form>
                    </div>
                </div>
                <br />
                <div className='row mt-4 '>
                    <div className='col-md-8 offset-md-2'>
                        <Link to='/admin/dashboard'>
                            <button type="button" className="btn btn-dark">Admin dashboard</button>
                        </Link>
                    </div>
                </div>
            </Base>
        )
    }
}


export default UpdateCategory;