import './App.css'
import HomePage from './pages/HomePage/HomePage'
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import { useEffect, useState } from 'react';
import { useCookies, CookiesProvider } from 'react-cookie';
import { AnimatePresence } from 'framer-motion';
import SellerLogin from './pages/Login/SellerLogin';
import SellerSignUp from './pages/SignUp/SellerSignUp';
import Profile from './pages/Profile/Profile';
import axios from 'axios';


function App() {

  const [loginState, setLoginState] = useState(false);

  useEffect(()=>{

    checkUserLogin();
    checkSellerLogin();
    
  },[]);
  
  async function checkUserLogin(){
    const response = await axios.get('http://localhost:5173/user/getcookie', {withCredentials: true})
    setLoginState(response);   
  }

  async function checkSellerLogin(){
    const response = await axios.get('http://localhost:5173/seller/getcookie', {withCredentials: true})
    setLoginState(response);   
  }

  return (
    <>
      <AnimatePresence>
        <CookiesProvider>
          <Routes>
            <Route path='/' element={<HomePage loginState={loginState} setLoginState={setLoginState}  checkUserLogin={checkUserLogin} />}/> {/*checkUserLogin={checkUserLogin} */}
            <Route path='/login' element={<Login loginState={loginState} setLoginState={setLoginState} checkUserLogin={checkUserLogin}/>}/>
            <Route path='/seller/login' element={<SellerLogin loginState={loginState} setLoginState={setLoginState} checkSellerLogin={checkSellerLogin}/>}/>
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
