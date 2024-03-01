import '../../components/HomeCard/homecard.css'
import '../Login/login.css'
import { Link } from 'react-router-dom'

export default function Login(){
    return<>
    <div className=" bg-black flex justify-center">
        <button>
            <Link to={'/'}>
                <img src="src/assets/logo.png" alt="" className='my-10'/>
            </Link>
        </button>
    </div>
    <div className='bghc flex align-middle justify-center mx-96 p-20 rounded-xl'>
        <div>
            <div className='cantora-one-regular font-bold'>First Name</div>
            <input className='rounded-lg back cantora-one-regular font-bold p-1 w-96 mb-10' ></input>
            <div className='cantora-one-regular font-bold'>Last Name</div>
            <input className='rounded-lg back cantora-one-regular font-bold p-1 w-96 mb-10' ></input>
            <div className='cantora-one-regular font-bold'>Phone Number</div>
            <input className='rounded-lg back cantora-one-regular font-bold p-1 w-96 mb-10' ></input>
            <div className='cantora-one-regular font-bold'>E-mail</div>
            <input className='rounded-lg back cantora-one-regular font-bold p-1 w-96 mb-10' ></input>
            <div className='cantora-one-regular font-bold'>Password</div>
            <input className='rounded-lg back cantora-one-regular font-bold p-1 w-96 mb-10' type='password'></input>
            <br />
            <button className="text-2xl bg p-2 px-4 fredoka mr-5" >Sign Up</button>
            <button className="text-2xl p-2 px-4 fredoka fp" >Login</button>
        </div>
    </div>

    </>
}