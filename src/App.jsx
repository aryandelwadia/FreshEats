import './App.css'
import HomePage from './pages/HomePage/HomePage'
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import { useState } from 'react';

function App() {

  const [loginState, setLoginState] = useState(false);

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage loginState={loginState} setLoginState={setLoginState} />}/>
        <Route path='/login' element={<Login loginState={loginState} setLoginState={setLoginState} />}/>
        <Route path='/signup' element={<SignUp />}/>
      </Routes>
    </>
  )
}

export default App
