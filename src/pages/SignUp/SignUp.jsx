import '../../components/HomeCard/homecard.css'
import '../Login/login.css'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function SignUp(){
    
    document.title='SignUp To Shop Now From The Widest Range Of Freshly Handpicked Fruits And Veggies All Over From India';

    const navigate = useNavigate();
    
    const handleSignUp = async function(e){
        e.preventDefault();

        const fname = document.getElementById('fname').value;
        const lname = document.getElementById('lname').value; 
        const email = document.getElementById('email').value; 
        const usernameIn = document.getElementById('username').value; 
        const password = document.getElementById('password').value;
        const number = document.getElementById('number').value; 

        if(fname=="" || lname=="" || email=="" || password=="" || number==""){
            toast.error( "Please fill out all fields" );
        }
        else{
            try{
                const response = await axios.post("http://localhost:3000/user/signup",{
                    fname: fname,
                    lname: lname,
                    username: usernameIn,
                    email: email,
                    password: password,
                    number: number
                });

                if(response.status === 200){
                    toast.success('User Signed Up');
                    navigate('/');
                }
                else if (response.status === 440){
                    toast.error("Duplicacy Founded");
                }
                else if (response.status === 500){
                    toast.error("Please check all feilds again.");
                }
            }
            catch(err){
                toast.error("Error occured");
                console.log(err.message);
            }
        }
    }
    
    return<>
    <div className=" bg-black flex justify-center">
        <button>
            <Link to={'/'}>
                <img src="src/assets/logo.png" alt="" className='my-5'/>
            </Link>
        </button>
    </div>
    <div className='bghc flex align-middle justify-center mx-96 p-10 rounded-xl'>
        <div>
            <div className='cantora-one-regular font-bold'>First Name</div>
            <input className='rounded-lg back cantora-one-regular font-bold p-1 w-96 mb-10' id='fname'></input>
            <div className='cantora-one-regular font-bold'>Last Name</div>
            <input className='rounded-lg back cantora-one-regular font-bold p-1 w-96 mb-10' id='lname'></input>
            <div className='cantora-one-regular font-bold'>Username</div>
            <input className='rounded-lg back cantora-one-regular font-bold p-1 w-96 mb-10' id='username'></input>
            <div className='cantora-one-regular font-bold'>Phone Number</div>
            <input className='rounded-lg back cantora-one-regular font-bold p-1 w-96 mb-10' id='number'></input>
            <div className='cantora-one-regular font-bold'>E-mail</div>
            <input className='rounded-lg back cantora-one-regular font-bold p-1 w-96 mb-10' id='email'></input>
            <div className='cantora-one-regular font-bold'>Password</div>
            <input className='rounded-lg back cantora-one-regular font-bold p-1 w-96 mb-10' type='password' id='password'></input>
            <br />
            <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} className="text-2xl bg p-2 px-4 fredoka mr-5" onClick={handleSignUp}>Sign Up</motion.button>
            <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} className="text-2xl p-2 px-4 fredoka fp" >
                <Link to={"/login"}>
                    Login
                </Link>
            </motion.button>
        </div>
    </div>

    </>
}