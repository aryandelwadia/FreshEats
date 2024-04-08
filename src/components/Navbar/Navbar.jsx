import './navbar.css';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Navbar({ loginState, setLoginState, checkUserLogin }){
    
    const {scrollYProgress} = useScroll();
    const [showSidebar, setShowSidebar] = useState(false);

    function handleSidebar(){
        setShowSidebar(true);
    }

    async function handleLogout(){
        
        const response = await axios.post('http://localhost:3000/user/logout', {},{withCredentials: true});
        try{

            setLoginState(false);
            toast.success("You have logged out successfully");
        }
        catch(err){
            toast.error("Error Occurred123");
        }
    };

    useEffect(()=>{
        checkUserLogin();
    },[])

    return <>
        <AnimatePresence>
            {showSidebar && <motion.div initial={{opacity: 0, y: "-100px"}} animate={{opacity: 1, y: "0px"}} exit={{opacity: 0, y: '-100px'}} transition={{duration: 0.4}} className='fixed z-50 top-0 h-screen w-screen backdrop-blur-3xl flex justify-center align-middle'>
                    <div className='my-10 flex justify-center align-middle text-center'>
                        <motion.ul initial={{opacity: 0, y: "-50px"}} animate={{opacity: 1, y: "0px"}} exit={{opacity: 0, y: '-50px'}} transition={{duration: 0.6}}>
                            <li className='my-4'>
                                <button onClick={()=>{
                                    setShowSidebar(false);
                                }}>
                                    <img src="src/assets/red-x-10340.svg" alt="" className='h-10 w-10'/>
                                </button>
                            </li>
                            <li className='my-4 text-xl hover:underline fredoka'> <button>Trending Recipes</button> </li>
                            <li className='my-4 text-xl hover:underline fredoka'><button>What's New</button></li>
                            <li className='my-4 text-xl hover:underline fredoka'><button><Link to={'seller/login'}>Sell On Our Website</Link></button></li>
                            {loginState ? <li className='my-4 text-xl hover:underline fredoka'><button>Cart</button></li> : <li className='my-4 text-xl hover:underline fredoka'><button onClick={()=>{toast.error("Login First")}}><Link to={'login'}>Cart</Link></button></li>}
                            {loginState ? <li className='my-4 text-xl hover:underline fredoka'><button><Link to={`/user/profile`}>Profile</Link></button></li> : <li className='my-4 text-xl hover:underline fredoka'><button onClick={()=>{toast.error("Login First")}} ><Link to={'login'}>Profile</Link></button></li>}
                            {!loginState && <li className='my-4 text-xl hover:underline fredoka'>{!loginState && <button><Link to={'login'}>Login</Link></button>}</li> }               
                            <li className='my-4 text-xl hover:underline fredoka'>{loginState && <button onClick={handleLogout}>Logout</button>}</li>                        
                            {!loginState && <li className='my-4 text-xl hover:underline fredoka'><button><Link to={'signup'}>Sign Up</Link></button></li>}
                        </motion.ul>
                    </div>
                </motion.div>}
        </AnimatePresence>
        <motion.div style={{scaleX: scrollYProgress, transformOrigin: "left", position: 'fixed', width: "100%", height: 10, backgroundColor: "#06c167"}} className=' z-50'>
        </motion.div>
        <div className="flex justify-between mb-5">
            <div className="mt-10">
                <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9, rotate: '2deg'}}>
                    <Link to={'/'}>
                        <img src="src\assets\Logo.png" className="ml-10 h-24"/>
                    </Link>
                </motion.button>
            </div>
            <div className="mt-12">
                <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} className="mx-5 text-3xl hover:underline fredoka">Trending Recipies</motion.button>
                {!loginState && <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9, rotate: '2deg'}}  className="mx-5 text-3xl bg p-4 px-6 fredoka" ><Link to={'login'}>Login</Link></motion.button>}
                {loginState && <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9, rotate: '2deg'}}  className="mx-5 text-3xl bg p-4 px-6 fredoka" onClick={handleLogout} >Logout</motion.button>}
                <button className='mr-10'><img src="src/assets/More Button.png" alt="" onClick={handleSidebar} /></button>
            </div>
        </div>        
    </>
}