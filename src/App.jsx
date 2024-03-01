import './App.css'
import HomePage from './pages/HomePage/HomePage'
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<SignUp />}/>
      </Routes>
    </>
  )
}

export default App
