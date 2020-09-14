import React from 'react';
import Base from '../../core/Base';
import {Link} from 'react-router-dom';
import { getUser } from '../../auth/helper/index';
import './AdminDashboard.css';


const AdminDashboard = () => {
    const { name, email } = getUser();
    return (
      <Base 
      title='Welcome to admin dashboard' 
      description='Manage all yours products from here'
      className='container bg-white p-4'>

      <div className='row adminDashboard-container'>
          <div className='col-md-12 col-lg-3 left-section'>
              <div className='card'>
                  <h5 className='bg-dark text-white text-center m-0 p-2'>Admin Actions</h5>
                  <ul className='list-group bg-white text-center'>
                  <li className='list-group-item'>
                      <Link className='nav-link text-dark' to='/admin/create/product'>
                          Create product
                      </Link>
                  </li>
                  <li className='list-group-item'>
                      <Link className='nav-link text-dark' to='/admin/create/category'>
                          Create category
                      </Link>
                  </li>
                  <li className='list-group-item'>
                      <Link className='nav-link text-dark' to='/admin/manage/products'>
                          Manage products
                      </Link>
                  </li>
                  <li className='list-group-item'>
                      <Link className='nav-link text-dark' to='/admin/manage/categories'>
                          Manage categories
                      </Link>
                  </li>
              </ul>
              </div>
          </div>
          <div className='col-md-12 col-lg-8 right-section'>
           <div className='card bg-white'>
             <h4 className='card header p-2 mb-0'>Admin details</h4>
             <ul className='list-group'>
                  <li className='list-group-item'>
                   <span className="badge badge-dark mr-2">Name</span> : {name}
                  </li>
                  <li className='list-group-item'>
                   <span className="badge badge-dark mr-2">Email</span> : {email}
                  </li>
             </ul>
           </div>
          </div>
      </div>         
      </Base>
    );
}


export default AdminDashboard;
