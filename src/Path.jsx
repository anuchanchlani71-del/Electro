import React from 'react'
import { BrowserRouter, Route,  Routes } from 'react-router-dom'
import Home from './Home/Home'
import Shop from './Shop/Shop'
import SinglePage from './SinglePage.jsx/SinglePage'
import Contact from './Contact.jsx/Contact'

import BestsellerMain from './Bestseller/BestSellerMain'
import Cart from './Cart.jsx/Cart'
import Checkout from './Checkout/Checkout'
import NotFound from './NotFound.jsx/NotFound'
import Login from './Login'
import Register from './Register'
import MyAccount from './MyProfile'
import Editcustomerprofile from './Editcustomerprofile'



import AdminWrapper from './Admin/Adminwrapper'
import AdminLogin from './Admin/components/AdminLogin';
import Dashboard from './Admin/components/Dashboard'
import Customers from './Admin/components/Customer/Customers';
import AddCustomer from './Admin/components/Customer/AddCustomer';
import EditCustomer from './Admin/components/Customer/EditCustomer';
import MyProfile from './Admin/components/MyProfile'
import Categories from './Admin/components/Category/Category'

import AddCategory from './Admin/components/Category/AddCategory'
import Product from './Admin/components/Product/Product'
import Addproducts from'./Admin/components/Product/AddProduct'
import Editcategory from './Admin/components/Category/EditCategory'
import EditProduct from './Admin/components/Product/EditProduct'
import Editadminprofile from './Admin/components/Editadminprofile'
import MyOrdersPage from './Myorders'

import MyOrders from './Admin/components/Order/Order'
import ContactManager from './Admin/components/Contact/Contact'
import ChangePassword from './Changepwd'
import ForgotPassword from './Forgotpwd'
import ResetPassword from './Resetpwd'

import Sliders from './Admin/components/Slider/Sliders'
import AddSlider from './Admin/components/Slider/AddSlider'
import EditSlider from './Admin/components/Slider/EditSlider'
import AdminForgotPassword from './Admin/components/Password/Forgetpwd'
import AdminChangePassword from './Admin/adminChangepwd'
import AdminResetPassword from './Admin/components/Password/Resetpwd'

export default function Path() {
  return (
    <div>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product" element={<SinglePage />} />
          <Route path="/bestsellers" element={<BestsellerMain />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
   
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/404" element={<NotFound />} />
           <Route path="/myorders" element={<MyOrdersPage/>} />

  <Route path="/myprofile" element={<MyAccount />} />
    <Route path="/Editprofile" element={< Editcustomerprofile/>} />
    <Route path="/changepwd" element={< ChangePassword/>} />
       <Route path="/forgotpwd" element={<ForgotPassword/>} />
         <Route path="/resetpwd" element={<ResetPassword/>} />


<Route path="/admin" element={<AdminWrapper><AdminLogin /></AdminWrapper>} />
<Route path="/admin/dashboard" element={<AdminWrapper><Dashboard /></AdminWrapper>} />
<Route path="/admin/customer" element={<AdminWrapper><Customers /></AdminWrapper>} />
<Route path="/admin/add-customer" element={<AdminWrapper><AddCustomer /></AdminWrapper>} />
<Route path="/admin/Edit-customer" element={<AdminWrapper><EditCustomer /></AdminWrapper>} />
<Route path="/admin/Profile" element={<AdminWrapper><MyProfile /></AdminWrapper>} />
<Route path="/admin/categories" element={<AdminWrapper><Categories/></AdminWrapper>} />
<Route path="/admin/addCategory" element={<AdminWrapper><AddCategory /></AdminWrapper>} />
<Route path="/admin/products" element={<AdminWrapper><Product/></AdminWrapper>} />
<Route path="/admin/addproducts" element={<AdminWrapper><Addproducts /></AdminWrapper>} />
<Route path="/admin/Edit-category" element={<AdminWrapper><Editcategory /></AdminWrapper>} />
<Route path="/admin/Edit-product" element={<AdminWrapper><EditProduct /></AdminWrapper>} />
<Route path="/admin/editprofile" element={<AdminWrapper><Editadminprofile/></AdminWrapper>} />
<Route path="/admin/orders" element={<AdminWrapper><MyOrders/></AdminWrapper>} />
<Route path="/admin/contact" element={<AdminWrapper><ContactManager/></AdminWrapper>} />
<Route path="/admin/sliders" element={<AdminWrapper><Sliders/></AdminWrapper>} />
<Route path="/admin/add-slider" element={<AdminWrapper><AddSlider/></AdminWrapper>} />
<Route path="/admin/edit-slider" element={<AdminWrapper><EditSlider/></AdminWrapper>} />
<Route path="/admin/forgetpwd" element={<AdminWrapper><AdminForgotPassword/></AdminWrapper>} />
<Route path="/admin/changepwd" element={<AdminWrapper><AdminChangePassword/></AdminWrapper>} />
<Route path="/admin/resetpwd" element={<AdminWrapper><AdminResetPassword/></AdminWrapper>} />



        </Routes>
      </BrowserRouter>

    </div>
  )
}
