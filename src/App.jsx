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

  const [loginState, setLoginState] = useState();
  // const [currentUser, setCurrentUser] = useState(null);

  useEffect(()=>{
    login();
  },[])

  async function login(){
    let response = axios.get('http://localhost:3000/user/currentUser');
    console.log(response);
    if(response ){
      setLoginState(true);
    }
    else{
      setLoginState(false);
    }
  }
  
  return (
    <>
      <AnimatePresence>
        <CookiesProvider>
          <Routes>
            <Route path='/' element={<HomePage loginState={loginState} setLoginState={setLoginState}  />}/> {/*checkUserLogin={checkUserLogin} */}
            <Route path='/login' element={<Login loginState={loginState} setLoginState={setLoginState}  />}/>{/*setCurrentUser={setCurrentUser}*/}
            <Route path='/seller/login' element={<SellerLogin loginState={loginState} setLoginState={setLoginState} />}/>
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
