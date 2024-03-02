import '../../components/HomeCard/homecard.css'
import './login.css'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Login(){
    return<>
    <div className=" bg-black flex justify-center">
        <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}>
            <Link to={'/'}>
                <img src="src/assets/logo.png" alt="" className='my-10'/>
            </Link>
        </motion.button>
    </div>
    <div className='bghc flex align-middle justify-center mx-96 p-32 rounded-xl'>
        <div>
            <div className='cantora-one-regular font-bold'>E-mail</div>
            <input className='rounded-lg back cantora-one-regular font-bold p-1 w-96 mb-10' ></input>
            <div className='cantora-one-regular font-bold'>Password</div>
            <input className='rounded-lg back cantora-one-regular font-bold p-1 w-96 mb-10' type='password'></input>
            <br />
            <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} className="text-2xl bg p-2 px-4 fredoka mr-5" >Login</motion.button>
            <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} className="text-2xl p-2 px-4 fredoka fp" >Forget Password</motion.button>
            <br />
            <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} className="text-2xl p-2 px-4 fredoka fp mt-5" >
                <Link to={'/signup'}>
                    Don't have account yet
                </Link>
            </motion.button>
        </div>
    </div>

    </>
}