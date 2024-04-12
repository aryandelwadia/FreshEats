import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import LOGO from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


export default function Profile({ setLoginState }) {

    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        fname: "",
        lname: "",
        username: '',
        number: '',
        email: '',
        usertype: '',
    });

    useEffect(() => {

        async function userDetail() {
            try {
                const response = await axios.get("http://localhost:3000/user/currentUser", { withCredentials: true });
                let user = response.data;
                if (user) {
                    setUserData({
                        fname: user.fname,
                        lname: user.lname,
                        username: user.username,
                        number: user.number,
                        email: user.email,
                        usertype: user.usertype,
                    });
                }
            } catch (err) {
                console.log(err.message);
            }
        };

        userDetail();
    }, []);

    async function handleLogout(){
        
        const response = await axios.post('http://localhost:3000/user/logout', {},{withCredentials: true});
        try{

            setLoginState(false);
            navigate('/');
            toast.success("You have logged out successfully");
            
        }
        catch(err){
            toast.error("Error Occurred123");
        }
    };

    return (
        <div>
            <div className=" bg-black flex justify-center">
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Link to={'/'}>
                        <img src={LOGO} alt="" className='my-10' />
                    </Link>
                </motion.button>
            </div>
            <div className="flex justify-evenly items-center">
                <div className="">
                    <Link to={'/'}>
                        <button className="h-12 w-12 bg-[#142328] rounded-full">🏠</button>
                    </Link>
                    <img src={LOGO} alt="" className="rounded-full bg-white h-60 w-60 m-5
                    " />
                    <button className="fredoka text-3xl text-[#06c167] hover:underline">Cart</button><br />
                    <button className="fredoka text-3xl text-[#06c167] hover:underline" onClick={handleLogout}>Logout</button>
                </div>
                <div>
                    <div className="fredoka text-3xl text-[#06c167] my-2">Name: <div className="text-white mx-10">{userData.fname} {userData.lname}</div></div>
                    <div className="fredoka text-3xl text-[#06c167] my-2">Username: <div className="text-white mx-10">{userData.username}</div></div>
                    <div className="fredoka text-3xl text-[#06c167] my-2">Email: <div className="text-white mx-10">{userData.email}</div></div>
                    <div className="fredoka text-3xl text-[#06c167] my-2">Number: <div className="text-white mx-10">{userData.number}</div></div>
                    <div className="fredoka text-3xl text-[#06c167] my-2">UserType: <div className="text-white mx-10">{userData.usertype}</div></div>
                </div>
            </div>
        </div>
    );
}
