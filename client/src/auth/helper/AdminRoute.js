import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { isAuthenticated, isAdmin } from './index';


const AdminRoute = ({component:Component, ...rest}) => {
  return (
   <Route 
   {...rest}
   render={ props => {
      return  isAuthenticated() && isAdmin().role === 1 ? <Component {...props} /> : <Redirect to={{pathname: '/signin'}} />
   }} />
  )
}

export default AdminRoute;