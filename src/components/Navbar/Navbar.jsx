import './navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar(){
    return <>
        <div className="flex justify-between mb-5">
            <div className="mt-10">
                <button>
                    <Link to={'/'}>
                        <img src="src\assets\Logo.png" className="ml-10 h-24"/>
                    </Link>
                </button>
            </div>
            <div className="mt-12">
                <button className="mx-5 text-3xl hover:underline fredoka">Trending Recipies</button>
                <button className="mx-5 text-3xl hover:underline fredoka">Trending Recipies</button>
                <button className="mx-5 text-3xl bg p-4 px-6 fredoka" ><Link to={'/login'}>Login</Link></button>
                <button className='mr-10'><img src="src/assets/More Button.png" alt="" /></button>
            </div>
        </div> 
    </>
}