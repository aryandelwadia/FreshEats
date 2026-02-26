import Logo from '../../assets/Logo.png';

export default function CartItems({ id, name, price, place, img, quantity, onQuantityChange, onRemove }) {

    const imgSrc = img && img.startsWith('http') ? img : Logo;

    return <>
        <div className="bghc rounded-xl m-4 md:m-10 flex w-full md:w-1/2 lg:w-1/3">
            <div className="w-60 flex-shrink-0">
                <img src={imgSrc} alt="" className="rounded-l-xl h-full object-cover" />
            </div>
            <div className="p-5 flex flex-col justify-between w-full">
                <div>
                    <p className="fredoka text-xl">{name}</p>
                    <p className="cantora-one-regular text-lg text-[#426b1f]">${price} /kg</p>
                    {place && <p className="cantora-one-regular text-sm text-[#6d6d6d]">{place}</p>}
                </div>
                <div className="flex items-center gap-3 mt-2">
                    <label className="fredoka text-sm">Qty:</label>
                    <input
                        type="number"
                        value={quantity}
                        min={1}
                        onChange={(e) => onQuantityChange(id, parseInt(e.target.value) || 1)}
                        className="border border-[#426b1f] p-1 rounded-lg bghc fredoka duration-300 w-16 text-center"
                    />
                </div>
                <p className="fredoka text-[#06c167] mt-1">Subtotal: ${(price * quantity).toFixed(2)}</p>
                <button
                    onClick={() => onRemove(id)}
                    className="text-red-500 hover:text-red-400 fredoka text-sm mt-2 text-left hover:underline"
                >
                    Remove
                </button>
            </div>
        </div>
    </>
}