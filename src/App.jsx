import './App.css'
import HomePage from './pages/HomePage/HomePage'
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import { useState } from 'react';
import { useCookies, CookiesProvider } from 'react-cookie';
import { AnimatePresence } from 'framer-motion';
import SellerLogin from './pages/Login/SellerLogin';
import SellerSignUp from './pages/SignUp/SellerSignUp';
import Profile from './pages/Profile/Profile';
import ShoppingPage from './pages/ShoppingPage/ShoppingPage'
import Cart from './pages/Cart/Cart';

function App() {

  function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split('=');
      if (cookie[0] === name) {
        return cookie[1];
      }
    }
    return null; // Cookie not found
  }

  const [userLoginState, setUserLoginState] = useState(getCookie('loggedin') ? true : false);
  const [sellerLoginState, setSellerLoginState] = useState(getCookie('sellerLoggedin') ? true : false);


  return (
    <>
      <AnimatePresence>
        <CookiesProvider>
          <Routes>
            <Route path='/' element={<HomePage userLoginState={userLoginState} setUserLoginState={setUserLoginState} />} />
            <Route path='/login' element={<Login userLoginState={userLoginState} setUserLoginState={setUserLoginState} />} />
            <Route path='/seller/login' element={<SellerLogin sellerLoginState={sellerLoginState} setSellerLoginState={setSellerLoginState} />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/seller/signup' element={<SellerSignUp />} />
            <Route path={`/user/profile`} element={<Profile setUserLoginState={setUserLoginState} />} />
            <Route path='/shopnow' element={<ShoppingPage userLoginState={userLoginState} setUserLoginState={setUserLoginState} />} />
            <Route path='/cart' element={<Cart userLoginState={userLoginState} setUserLoginState={setUserLoginState} />} />
          </Routes>
        </CookiesProvider>
      </AnimatePresence>
    </>
  )
}

export default App
