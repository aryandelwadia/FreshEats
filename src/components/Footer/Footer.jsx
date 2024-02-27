import './footer.css'

export default function Footer(){
    return <>
        <div className="footerbg ">
            <div className=' text-center my-5 flex justify-center align-middle pt-5'>
                <p>Connect With Us</p>
                <button><img src="src/assets/Insta.png" alt="" className='w-10 h-10 mx-2'/></button>
                <button><img src="src/assets/fb.png" alt="" className='w-10 h-10 mx-2'/></button>
                <button><img src="src/assets/x.png" alt="" className='w-10 h-10 mx-2'/></button>
            </div>
            <div className='flex justify-evenly pb-5'>
                <button className='hover:underline'>Condition of Use & Sales</button>
                <button className='hover:underline'>Privacy Terms</button>
                <button className='hover:underline'>Interest Based Sales</button>
            </div>
            <div className='flex justify-center pb-5'>
            ©2024, MoveN’Eats.com or its affiliates
            </div>
        </div>
    </>
}