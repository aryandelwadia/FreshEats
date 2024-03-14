import './App.css'
import HomePage from './pages/HomePage/HomePage'
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import { useState } from 'react';
import { useCookies } from 'react-cookie';


function App() {

  const [cookies, setCookies, removeCookies] = useCookies("login");
  const [loginState, setLoginState] = useState(cookies.login == undefined ? false : true);

  function setLoginCookie(e){
    e?setCookies("login",true,{path: '/'}):removeCookies("login");
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage loginState={loginState} setLoginState={setLoginState} setLoginCookie={setLoginCookie} cookies={cookies} />}/>
        <Route path='/login' element={<Login loginState={loginState} setLoginState={setLoginState} setLoginCookie={setLoginCookie} cookies={cookies} />}/>
        <Route path='/signup' element={<SignUp />}/>
      </Routes>
    </>
  )
}

export default App
