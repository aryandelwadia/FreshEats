export default function Items(props) {

    const imgSrc = props.img && props.img.startsWith('http') ? props.img : `http://localhost:3000/uploads/${props.img}`;

    return <>
        <div className="bghc rounded-xl m-4 md:m-10">
            <div className="w-full">
                <img src={imgSrc} alt="" className="rounded-t-xl h-48 md:h-64 w-full object-cover" />
            </div>
            <div className="p-5">
                <p className="fredoka text-xl">{props.name}</p>
                <p className="cantora-one-regular text-lg text-[#426b1f]">${props.price} /kg</p>
                <p className="cantora-one-regular text-[#6d6d6d]">{props.place}</p>
                <button className=" border border-[#426b1f] p-1 rounded-lg hover:bg-[#426b1f] duration-300" onClick={props.handleAddToCart}>Add To Cart</button>
            </div>
        </div>
    </>
}