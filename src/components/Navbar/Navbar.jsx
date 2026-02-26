import './navbar.css';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Logo from '../../assets/Logo.png';
import CloseIcon from '../../assets/red-x-10340.svg';
import MoreButton from '../../assets/More Button.png';

export default function Navbar({ userLoginState, setUserLoginState }) {

    const { scrollYProgress } = useScroll();
    const [showSidebar, setShowSidebar] = useState(false);

    function handleSidebar() {
        setShowSidebar(true);
    }

    async function handleLogout() {
        try {
            await axios.post('http://localhost:3000/user/logout', {}, { withCredentials: true });
            setUserLoginState(false);
            toast.success("You have logged out successfully");
        }
        catch (err) {
            toast.error("Error Occurred");
        }
    };

    useEffect(() => {
        function getCookie(name) {
            const cookies = document.cookie.split('; ');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].split('=');
                if (cookie[0] === name) {
                    return cookie[1];
                }
            }
            return null;
        }

        let l = getCookie('loggedin') ? true : false;

        if (l) {
            setUserLoginState(true)
        }
        else {
            setUserLoginState(false);
        }
    }, []);

    return <>
        <AnimatePresence>
            {showSidebar && <motion.div initial={{ opacity: 0, y: "-100px" }} animate={{ opacity: 1, y: "0px" }} exit={{ opacity: 0, y: '-100px' }} transition={{ duration: 0.4 }} className='fixed z-50 top-0 h-screen w-screen backdrop-blur-3xl flex justify-center align-middle'>
                <div className='my-10 flex justify-center align-middle text-center'>
                    <motion.ul initial={{ opacity: 0, y: "-50px" }} animate={{ opacity: 1, y: "0px" }} exit={{ opacity: 0, y: '-50px' }} transition={{ duration: 0.6 }}>
                        <li className='my-4'>
                            <button onClick={() => {
                                setShowSidebar(false);
                            }}>
                                <img src={CloseIcon} alt="" className='h-10 w-10' />
                            </button>
                        </li>
                        <li className='my-4 text-xl hover:underline fredoka'> <button>Trending Recipes</button> </li>
                        <li className='my-4 text-xl hover:underline fredoka'><button>What's New</button></li>
                        <li className='my-4 text-xl hover:underline fredoka'><button><Link to={'seller/login'}>Sell On Our Website</Link></button></li>
                        {userLoginState ? <li className='my-4 text-xl hover:underline fredoka'><button><Link to={'/cart'}>Cart</Link></button></li> : <li className='my-4 text-xl hover:underline fredoka'><button onClick={() => { toast.error("Login First") }}><Link to={'/login'}>Cart</Link></button></li>}
                        {userLoginState && <li className='my-4 text-xl hover:underline fredoka'><button><Link to={'/orders'}>My Orders</Link></button></li>}
                        {userLoginState ? <li className='my-4 text-xl hover:underline fredoka'><button><Link to={`/user/profile`}>Profile</Link></button></li> : <li className='my-4 text-xl hover:underline fredoka'><button onClick={() => { toast.error("Login First") }} ><Link to={'/login'}>Profile</Link></button></li>}
                        {!userLoginState && <li className='my-4 text-xl hover:underline fredoka'>{!userLoginState && <button><Link to={'/login'}>Login</Link></button>}</li>}
                        <li className='my-4 text-xl hover:underline fredoka'>{userLoginState && <button onClick={handleLogout}>Logout</button>}</li>
                        {!userLoginState && <li className='my-4 text-xl hover:underline fredoka'><button><Link to={'/signup'}>Sign Up</Link></button></li>}
                        <li className='my-4 text-xl hover:underline fredoka md:hidden'><button><Link to={'/shopnow'}>Shop Now</Link></button></li>
                    </motion.ul>
                </div>
            </motion.div>}
        </AnimatePresence>
        <motion.div style={{ scaleX: scrollYProgress, transformOrigin: "left", position: 'fixed', width: "100%", height: 10, backgroundColor: "#06c167" }} className='z-50'>
        </motion.div>
        <div className="flex justify-between mb-5 items-center">
            <div className="mt-6 md:mt-10">
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9, rotate: '2deg' }}>
                    <Link to={'/'}>
                        <img src={Logo} className="ml-4 md:ml-10 h-16 md:h-24" />
                    </Link>
                </motion.button>
            </div>
            <div className="mt-8 md:mt-12 flex items-center">
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="mx-5 text-3xl hover:underline fredoka hidden md:inline-block"><Link to={'/shopnow'}>Shop Now</Link></motion.button>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="mx-5 text-3xl hover:underline fredoka hidden lg:inline-block">Trending Recipies</motion.button>
                {!userLoginState && <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9, rotate: '2deg' }} className="mx-5 text-xl md:text-3xl bg p-2 px-4 md:p-4 md:px-6 fredoka hidden md:inline-block" ><Link to={'/login'}>Login</Link></motion.button>}
                {userLoginState && <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9, rotate: '2deg' }} className="mx-5 text-xl md:text-3xl bg p-2 px-4 md:p-4 md:px-6 fredoka hidden md:inline-block" onClick={handleLogout} >Logout</motion.button>}
                <button className='mr-4 md:mr-10'><img src={MoreButton} alt="" onClick={handleSidebar} /></button>
            </div>
        </div>
    </>
}