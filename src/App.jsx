import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Category from './Components/Category'
import './App.css'
import HomePg from './Components/HomePg'
import SingleProductDetails from './Components/SingleProductDetails'
import UserProvider, { useUser } from './Provider/UserProvider';

import SignUp from './Components/SignUp'
import SignIn from './Components/SignIn'
import Login from './Components/Login'
import Cart from './Components/Cart'
import WishList from './Components/WishList'
import CheckOut from './Components/CheckOut'
import CheckOutEnd from './Components/CheckOutEnd'

function ProtectedRoute({ children }) {
  const { isUserLoggedIn } = useUser();

  if (!isUserLoggedIn) {
    return <Navigate to='/signin' />
  }
  return children;
}

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePg/>} />
        <Route path="/category/:category/*" element={<Category/>} />
        <Route path="/category/:category/product/:productId" element={<SingleProductDetails/>} />
        <Route path="/product/:productId" element={<SingleProductDetails/>} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/wishlist' element={<WishList/>} />
        <Route path='/checkout' element={<CheckOut/>} />
        <Route path='/checkoutcompleted' element={<CheckOutEnd/>} />
        <Route path='*' element={<Login/>} />
      </Routes>
      </BrowserRouter>
    </UserProvider> 
 )
}

export default App
