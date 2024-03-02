import './navbar.css';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function Navbar(){
    
    const {scrollYProgress} = useScroll();
    
    return <>
        <motion.div style={{scaleX: scrollYProgress, transformOrigin: "left", position: 'fixed', width: "100%", height: 20, backgroundColor: "#06c167"}} className=' z-50'>
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
                <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} className="mx-5 text-3xl hover:underline fredoka">Trending Recipies</motion.button>
                <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9, rotate: '2deg'}}  className="mx-5 text-3xl bg p-4 px-6 fredoka" ><Link to={'/login'}>Login</Link></motion.button>
                <button className='mr-10'><img src="src/assets/More Button.png" alt="" /></button>
            </div>
        </div> 
    </>
}