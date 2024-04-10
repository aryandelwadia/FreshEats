import '../../components/HomeCard/homecard.css'
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import toast from "react-hot-toast"
import logo from '../../assets/logo.png'

export default function SellerLogin({ loginState, setLoginState }){
    
    const navigate = useNavigate();

    const handleLogin = async (e)=>{
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if(email == "" || password == ""){
            toast.error("Please fill out all fields");
        }
        else{
            try{
                const response = await axios.post('http://localhost:3000/seller/login', {
                    email: email,
                    password: password
                },{withCredentials: true});
                if(response.status === 200) {
                    toast.success("Logged In Successfully");
                    navigate('/');
                }
                else if(response.status === 401){
                    toast.error("Wrong Credentials");
                }
            }
            catch(err){
                {
                    toast.error("Error Occured");
                }
            }
        }
    }
    
    return <>
    <div className=' text-center block mt-10 text-3xl ccantora-one-regular font-bold text-[#06c167]'>Become Seller On Best Grocery Market In The World</div>
    <div className=" bg-black flex justify-center">
        <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} >
            <Link to={'/'}>
                    <img src={logo} alt="" className='my-10'/>
            </Link>
            
        </motion.button>
    </div>
    <form className='bghc flex align-middle justify-center mx-96 p-32 rounded-xl'>
        <div>
            <div className='cantora-one-regular font-bold' >E-mail</div>
            <input className='rounded-lg back cantora-one-regular font-bold p-1 w-96 mb-10' id='email'></input>
            <div className='cantora-one-regular font-bold'>Password</div>
            <input className='rounded-lg back cantora-one-regular font-bold p-1 w-96 mb-10' type='password' id='password'></input>
            <br />
            <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} className="text-2xl bg p-2 px-4 fredoka mr-5" onClick={handleLogin} >Login</motion.button>
            <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} className="text-2xl p-2 px-4 fredoka fp" >Forget Password</motion.button>
            <br />
            <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} className="text-2xl p-2 px-4 fredoka fp mt-5" >
                <Link to={'/seller/signup'}>
                    Don't have account yet
                </Link>
            </motion.button>
        </div>
    </form>

    </>
}