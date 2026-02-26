import Logo from '../../assets/Logo.png';

export default function CartItems(props) {
    return <>
        <div className="bghc rounded-xl m-4 md:m-10 flex w-full md:w-1/2 lg:w-1/3">
            <div className="w-60 ">
                <img src={Logo} alt="" className="rounded-l-xl" />
            </div>
            <div className="p-5">
                <p className="fredoka text-xl">{props.name}</p>
                <p className="cantora-one-regular text-lg text-[#426b1f]">${props.price} /kg</p>
                <input type="number" defaultValue={1} className="border border-[#426b1f] p-1 rounded-lg bghc fredoka duration-300 my-1" />
            </div>
        </div>
    </>
}