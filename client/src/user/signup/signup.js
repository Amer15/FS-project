import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../core/Navbar/Navbar';
import { signup } from '../../auth/helper/index';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './signup.css';

toast.configure();

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      loading: false,
      conformPassword: '',
      nameError: null,
      emailError: null,
      passwordError: null,
      conformPasswordError: null
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

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmitHandler = (e) => {
    e.preventDefault();
    this.setState({
      loading: true
    });

    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }

    if (user.password !== this.state.conformPassword) {
      this.notify('passwords doesnot match, please check and try again', 'error');
      return;
    }

    //METHOD from auth/index
    signup(user)
      .then(data => {
        this.setState({
          name: '',
          email: '',
          password: '',
          conformPassword: '',
          loading: false
        });

        if (data.error) {
          // console.log(data.error);
          this.notify(data.error, 'error');
        }
        else {
          // console.log(data)
          this.notify(data.message, 'success');
        }

      })
      .catch(error => {
        this.setState({
          name: '',
          email: '',
          password: '',
          conformPassword: '',
          loading: false
        });

        console.log(error);
        this.notify('something went wrong', 'error');
      })
  }


  render() {
    let btnText = this.state.loading ? (<div className="spinner-border spinner-border-sm" role="status">
      <span className="sr-only">Loading...</span>
    </div>) : 'Signup'
    return (
      <Fragment>
        <Navbar />
        <div className="container-fluid d-flex justify-content-center mt-3">
          <div className="row forms">
            <div className="col-md-4 bgImg d-none d-md-flex">
              <h5 className="text-center">Grab your fav Tshirts Now</h5>
            </div>
            <div className="col-md-8 p-2 form-section">
              <h3 className="text-center">Signup</h3>
              <form id='form' onSubmit={this.onSubmitHandler}>
                <div className='input-group'>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="name"
                    required
                    autoComplete="off"
                    value={this.state.name}
                    onChange={this.onChangeHandler} />
                </div>
                <div className='input-group'>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="off"
                    placeholder="email"
                    value={this.state.email}
                    onChange={this.onChangeHandler} />
                </div>
                <div className='input-group'>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    required
                    value={this.state.password}
                    onChange={this.onChangeHandler} />
                </div>
                <div className='input-group'>
                  <label htmlFor="conformPassword">Conform Password</label>
                  <input
                    type="password"
                    name="conformPassword"
                    id="conformPassword"
                    placeholder="conform password"
                    required
                    value={this.state.conformPassword
                    }
                    onChange={this.onChangeHandler} />
                </div>
                <small id="emailHelp" className="form-text text-muted">Already have an account? <Link to='/signin'>Signin Here</Link></small>
                <button className="form-btn">{btnText}</button>
              </form>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Signup;