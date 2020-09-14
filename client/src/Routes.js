import React from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';

import AdminDashboard from './user/AdminDashboard/AdminDashBoard';
import UserDashboard from './user/UserDashboard/UserDashBoard';
import PrivateRoute from './auth/helper/PrivateRoute';
import AdminRoute from './auth/helper/AdminRoute';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import ManageCategories from './admin/ManageCategories';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import UpdateCategory from './admin/UpdateCategory';
import Cart from './core/Cart';
import Signup from './user/signup/signup';
import Signin from './user/signin/signin';
import Home from './core/Home/Home'; 
import ActivationPage from './core/ActivationPage/ActivationPage';
import UpdatePassword from './user/UpdatePassword/UpdatePassword';
import UpdateUsername from './user/UpdateUsername/UpdateUsername'
import LandingPage from './core/LandingPage/LandingPage';
import ForgotPassword from './user/forgotpassword/ForgotPassword';
import ResetPassword from './user/resetpassword/ResetPassword';
import UserOrders from './user/UserOrders/UserOrders';
import ProductByCategory from './core/ProductByCategoryPage/ProductByCategory'


const Routes = () => {
    return(
      <BrowserRouter>
        <Switch>
            <Route exact path='/' component={LandingPage}/>
            <Route exact path='/all-products' component={Home}/>
            <Route exact path='/products/category/:collection/:categoryId' component={ProductByCategory}/>
            <Route path='/signup' component={Signup}/>
            <Route path='/signin' component={Signin}/>
            <Route path='/account/activate/:token' exact component={ActivationPage}/>
            <Route path='/forgot-password' exact component={ForgotPassword}/>
            <Route path='/reset-password/:token' exact component={ResetPassword} />
            <PrivateRoute path='/account/update/password' exact component={UpdatePassword}/>
            <PrivateRoute path='/account/update/username' exact component={UpdateUsername}/>
            <PrivateRoute path='/account/myorders' exact component={UserOrders}/>
            <PrivateRoute path='/user/dashboard' exact component={UserDashboard} />
            <PrivateRoute path='/user/cart' exact component={Cart}/>
            <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
            <AdminRoute path='/admin/create/category' exact component={AddCategory}/>
            <AdminRoute path='/admin/create/product' exact component={AddProduct}/>
            <AdminRoute path='/admin/manage/categories' exact component={ManageCategories}/>
            <AdminRoute path='/admin/manage/products' exact component={ManageProducts}/>
            <AdminRoute path='/admin/update/product/:productId' exact component={UpdateProduct}/>
            <AdminRoute path='/admin/update/category/:categoryId' exact component={UpdateCategory} />
        </Switch>
      </BrowserRouter>
    )
}


export default Routes;