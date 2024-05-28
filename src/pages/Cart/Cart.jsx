import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import CartItems from "./CartItems";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Cart({ userLoginState, setUserLoginState }) {

    document.title = 'Shop Now From The Widest Range Of Freshly Handpicked Fruits And Veggies All Over From India';

    const [itemsdata, setItemsdata] = useState([]);
    const [totalprice, setTotalPrice] = useState(0);

    useEffect(() => {

        async function handledata() {
            try {
                let response = await axios.get('http://localhost:3000/item/getitem', { withCredentials: true });
                setItemsdata(response.data);
            }
            catch (err) {
                console.log(err.message);
            }
        }

        handledata();
    }, [])

    useEffect(() => {
        let totalprice = 0;
        itemsdata.forEach(item => {
            totalprice += item.itemprice;
        });
        setTotalPrice(totalprice);
    }, [itemsdata]);

    return <>
        <Navbar userLoginState={userLoginState} setUserLoginState={setUserLoginState} />
        <p className="text-center text-7xl cantora-one-regular ">Cart</p>
        <hr className="w-4/5 m-auto my-10" />
        <div className="flex justify-center align-middle mb-10 flex-wrap">
            {itemsdata.length > 0 ? (
                itemsdata.map(item => (
                    <CartItems key={item._id} name={item.itemname} price={item.itemprice} place={item.prodplace} />
                ))
            ) : (
                <p className="fredoka">No items available</p>
            )}
        </div>

            <div className="w-2/6 p-5 bghc rounded-2xl mx-auto">
                <p className="fredoka text-2xl mb-2">Order Summary</p>
                <p className="fredoka text-xl">Subtotal: ${totalprice}</p>
                <p className="fredoka text-xl">Shipping Charges: $1.99</p>
                <hr className="my-5 "/>
                <p className="fredoka text-xl">Total: ${totalprice + 1.99}</p>
                <button className="text-xl bg p-2 my-3 w-full fredoka">Procced To Checkout</button>
            </div>
        <Footer />
    </>
}