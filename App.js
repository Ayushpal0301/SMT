import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Aboutpage from './Pages/Aboutpage';
import Contactpage from './Pages/Contactpage';
import Policy from './Pages/Policy';
import Pagenotfound from './Pages/Pagenotfound';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Dashboard from './Pages/User/Dashboard';
import PrivateRoute from './Components/Layout/Routes/Private';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AdminRoute from './Components/Layout/Routes/AdminRoute';
import CreateCategory from './Pages/Admin/CreateCategory';
import CreateProduct from './Pages/Admin/CreateProduct';
import Users from './Pages/Admin/Users';
import Orders from './Pages/User/Orders';
import Profile from './Pages/User/Profile';
import Products from './Pages/Admin/Products';
import UpdateProduct from './Pages/Admin/UpdateProduct';



const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/dashboard' element={<PrivateRoute/>}>
        <Route path='user' element={<Dashboard/>}/>
        <Route path='user/orders' element={<Orders/>}/>
        <Route path='user/profile' element={<Profile/>}/>

        </Route>
        <Route path='/dashboard' element={<AdminRoute/>}>
        <Route path='admin' element={<AdminDashboard/>}/>
        <Route path='admin/create-category' element={<CreateCategory/>}/>
        <Route path='admin/create-Product' element={<CreateProduct/>}/>
        <Route path='admin/product/:slug' element={<UpdateProduct/>}/>
        <Route path='admin/products' element={<Products/>}/>
        <Route path='admin/users' element={<Users/>}/>
        </Route>
        <Route path='/about' element={<Aboutpage/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/contact' element={<Contactpage/>}/>
        <Route path='/policy' element={<Policy/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/*' element={<Pagenotfound/>}/>
      </Routes>
    </>
  )
}

export default App
