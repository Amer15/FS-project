import React, { Fragment } from 'react';
import Navbar from '../../core/Navbar/Navbar';
import Footer from '../../core/Footer/Footer';
import { Link } from 'react-router-dom';
import { getUser } from '../../auth/helper/index';
import './UserDashboard.css';


const UserDashboard = () => {
  const details = getUser();
  return (
    <Fragment>
      <Navbar />
      <div className='container rounded mt-5 mb-4 p-1 user-dashboard'>
        <div className='row user-main-section'>
          <div className='col-sm-12 col-md-4 user-dashboard-left-section d-flex flex-column align-items-center'>
            <h1 className='user-icon'><i className="fas fa-user-circle"></i></h1>
            <p>{details.name}</p>
            <p>{details.email}</p>
            <Link to='/account/myorders' className='links'><p>My Orders</p></Link>
            <Link to='/account/update/password' className='links'><p>Update password</p></Link>
            <Link to='/account/update/username' className='links'><p>Update username</p></Link>
          </div>
          <div className='col-sm-12 text-center col-md-8 user-dashboard-right-section d-flex align-items-center'>
            <h2>Welcome to User Dashboard, {details.name}</h2>
          </div>
        </div>
      </div>
      <Footer/>
    </Fragment>
  );
}


export default UserDashboard;