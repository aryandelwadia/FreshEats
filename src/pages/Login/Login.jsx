import '../../components/HomeCard/homecard.css'
import './login.css'
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
    <div className='bghc flex align-middle justify-center mx-96 p-32 rounded-xl'>
        <div>
            <div className='cantora-one-regular font-bold'>E-mail</div>
            <input className='rounded-lg back cantora-one-regular font-bold p-1 w-96 mb-10' ></input>
            <div className='cantora-one-regular font-bold'>Password</div>
            <input className='rounded-lg back cantora-one-regular font-bold p-1 w-96 mb-10' type='password'></input>
            <br />
            <button className="text-2xl bg p-2 px-4 fredoka mr-5" >Login</button>
            <button className="text-2xl p-2 px-4 fredoka fp" >Forget Password</button>
        </div>
    </div>

    </>
}