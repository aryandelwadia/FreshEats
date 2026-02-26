import '../../components/HomeCard/homecard.css'
import '../Login/login.css'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
import logo from '../../assets/Logo.png';

export default function SellerSignUp() {

    document.title = 'SignUp To Shop Now From The Widest Range Of Freshly Handpicked Fruits And Veggies All Over From India';

    const navigate = useNavigate();
    const [sellerInfo, setSellerInfo] = useState({ state: false, percent: 0 })

    const handleSignUp = async function (e) {
        e.preventDefault();

        const fname = document.getElementById('fname').value;
        const lname = document.getElementById('lname').value;
        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const number = document.getElementById('number').value;
        const storename = document.getElementById('storename').value;
        const address = document.getElementById('address').value;
        const storenumber = document.getElementById('storenumber').value;

        if (fname === "" || lname === "" || email === "" || password === "" || number === "") {
            toast.error("Please fill out all fields");
        }
        else {
            try {
                const response = await axios.post("http://localhost:3000/seller/signup", {
                    fname: fname,
                    lname: lname,
                    username: username,
                    email: email,
                    password: password,
                    number: number,
                    storename: storename,
                    address: address,
                    storenumber: storenumber
                });

                if (response.status === 200) {
                    toast.success('User Signed Up');
                    navigate('/');
                }
                else if (response.status === 440) {
                    toast.error("Duplicacy Founded");
                }
                else if (response.status === 500) {
                    toast.error("Please check all feilds again.");
                }
            }
            catch (err) {
                toast.error("Error occured");
            }
        }
    }

    function progressBar1() {

        let filled = 0;
        let totalfields = 8;
        const fields = ['fname', 'lname', 'username', 'number', 'email', 'password', 'storename', 'address'];

        fields.forEach(f => {
            if (document.getElementById(f).value != "") {
                filled++;
            }
        })
        let num = (filled / totalfields) * 100;
        setSellerInfo({ state: false, percent: num })
    }

    return <>
        <div className=' text-center block mt-10 text-3xl ccantora-one-regular font-bold text-[#06c167]'>Become Seller On Best Grocery Market In The World</div>
        <div className=" bg-black flex justify-center">
            <button>
                <Link to={'/'}>
                    <img src={logo} alt="" className='my-5' />
                </Link>
            </button>
        </div>
        <motion.div animate={{ width: sellerInfo.percent * 10, backgroundColor: "#06c167", transformOrigin: "left" }} className='h-5 mb-3 mx-auto rounded-3xl bg-[#1a1a1a]'></motion.div><p className='text-center mb-3 text-xl'>{Math.ceil(sellerInfo.percent)}%</p>
        <div className='bghc flex align-middle justify-center mx-96 p-10 rounded-xl mb-10'>

            <div>
                <div className='cantora-one-regular font-bold'>First Name</div>
                <input className='rounded-lg back cantora-one-regular font-bold p-1 w-96 mb-10' id='fname' onChange={progressBar1}></input>
                <div className='cantora-one-regular font-bold'>Last Name</div>
                <input className='rounded-lg back cantora-one-regular font-bold p-1 w-96 mb-10' id='lname' onChange={progressBar1}></input>
                <div className='cantora-one-regular font-bold'>Username</div>
                <input className='rounded-lg back cantora-one-regular font-bold p-1 w-96 mb-10' id='username' onChange={progressBar1}></input>
                <div className='cantora-one-regular font-bold'>Phone Number</div>
                <input className='rounded-lg back cantora-one-regular font-bold p-1 w-96 mb-10' id='number' onChange={progressBar1}></input>
                <div className='cantora-one-regular font-bold'>E-mail</div>
                <input className='rounded-lg back cantora-one-regular font-bold p-1 w-96 mb-10' id='email' onChange={progressBar1}></input>
                <div className='cantora-one-regular font-bold'>Password</div>
                <input className='rounded-lg back cantora-one-regular font-bold p-1 w-96 mb-10' type='password' id='password' onChange={progressBar1}></input>
                <div className='cantora-one-regular font-bold'>Store Name</div>
                <input className='rounded-lg back cantora-one-regular font-bold p-1 w-96 mb-10' id='storename' onChange={progressBar1}></input>
                <div className='cantora-one-regular font-bold'>Store Address</div>
                <input className='rounded-lg back cantora-one-regular font-bold p-1 w-96 mb-10' id='address' onChange={progressBar1}></input>
                <div className='cantora-one-regular font-bold'>Store Number</div>
                <input className='rounded-lg back cantora-one-regular font-bold p-1 w-96 mb-10' id='storenumber' onChange={progressBar1}></input>
                <br />
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-2xl bg p-2 px-4 fredoka mr-5" onClick={handleSignUp}>SignUp</motion.button>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-2xl p-2 px-4 fredoka fp" >
                    <Link to={"/seller/login"}>
                        Login
                    </Link>
                </motion.button>
            </div>
        </div>

    </>
}