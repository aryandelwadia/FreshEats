import './navbar.css';

export default function Navbar(){
    return <>
        <div className="flex justify-between mb-5">
            <div className="mt-10">
                <img src="src\assets\Logo.png" className="ml-10 h-24"/>
            </div>
            <div className="mt-12">
                <button className="mx-5 text-3xl hover:underline fredoka">Trending Recipies</button>
                <button className="mx-5 text-3xl hover:underline fredoka">Trending Recipies</button>
                <button className="mx-5 text-3xl bg p-4 px-6 fredoka">Login</button>
                <button className='mr-10'><img src="src/assets/More Button.png" alt="" /></button>
            </div>
        </div> 
    </>
}