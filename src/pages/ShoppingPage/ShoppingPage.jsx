import axios from "axios";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Items from "./Items";
import { useEffect, useState } from "react";

export default function ShoppingPage({ userLoginState, setUserLoginState }) {

    document.title = 'Shop Now From The Widest Range Of Freshly Handpicked Fruits And Veggies All Over From India';

    const [itemsdata, setItemsdata] = useState([]);

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

    return <>
        <Navbar userLoginState={userLoginState} setUserLoginState={setUserLoginState} />
        <p className="text-center text-7xl cantora-one-regular ">Shop Now </p>
        <hr className="w-4/5 m-auto my-10" />
        <div className="flex justify-center align-middle mb-10 flex-wrap">
            <Items name="Heirloom Tomato" price='5.99' place="Grown in Vapi-Valsad Guj" />
            {itemsdata.length > 0 ? (
                itemsdata.map(item => (
                    <Items key={item._id} name={item.itemname} price={item.itemprice} place={item.prodplace} />
                ))
            ) : (
                <p>No items available</p>
            )}
        </div>
        <Footer />
    </>
}