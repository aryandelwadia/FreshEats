export default function Items(props){
    return<>
        <div className="bghc rounded-xl m-10">
            <div className="w-96 ">
                <img src="src/assets/tomato.png" alt="" className="rounded-t-xl"/>
            </div>
            <div className="p-5">
                <p className="fredoka text-xl">{props.name}</p>
                <p className="cantora-one-regular text-lg text-[#426b1f]">${props.price} /kg</p>
                <p className="cantora-one-regular text-[#6d6d6d]">{props.place}</p>
                <button className=" border border-[#426b1f] p-1 rounded-lg hover:bg-[#426b1f] duration-300">Add To Cart</button>
            </div>
        </div>
    </>
}