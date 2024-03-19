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


function App() {

  const [cookies, setCookie, removeCookie] = useCookies();
  const [loginState, setLoginState] = useState(cookies.loggedin == undefined ? false : true);


  return (
    <>
      <AnimatePresence>
        <CookiesProvider>
          <Routes>
            <Route path='/' element={<HomePage loginState={loginState} setLoginState={setLoginState}  />}/>
            <Route path='/login' element={<Login loginState={loginState} setLoginState={setLoginState} />}/>
            <Route path='/seller/login' element={<SellerLogin loginState={loginState} setLoginState={setLoginState}/>}/>
            <Route path='/signup' element={<SignUp  />}/>
            <Route path='/seller/signup' element={<SellerSignUp />}/>
            <Route path={`/user/profile`} element={<Profile />} />
          </Routes>
        </CookiesProvider>
      </AnimatePresence>
    </>
  )
}

export default App
