import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import CartItems from "./CartItems";
import CheckoutModal from "./CheckoutModal";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from "axios";

export default function Cart({ userLoginState, setUserLoginState }) {

    document.title = 'Your Cart | FreshEats';

    const [itemsdata, setItemsdata] = useState([]);
    const [totalprice, setTotalPrice] = useState(0);
    const [showCheckout, setShowCheckout] = useState(false);
    const navigate = useNavigate();

    async function fetchCart() {
        try {
            let response = await axios.post('http://localhost:3000/cart/showItem', {}, { withCredentials: true });
            setItemsdata(response.data);
        }
        catch (err) {
            toast.error("Failed to load cart");
        }
    }

    useEffect(() => {
        fetchCart();
    }, []);

    useEffect(() => {
        let total = 0;
        itemsdata.forEach(item => {
            total += item.itemprice * (item.quantity || 1);
        });
        setTotalPrice(total);
    }, [itemsdata]);

    useEffect(() => {
        if (!userLoginState) {
            navigate('/');
        }
    }, [userLoginState]);

    async function handleQuantityChange(id, quantity) {
        if (quantity < 1) return;

        setItemsdata(prev => prev.map(item =>
            item._id === id ? { ...item, quantity } : item
        ));

        try {
            await axios.post('http://localhost:3000/cart/updateQuantity', { id, quantity }, { withCredentials: true });
        }
        catch (err) {
            toast.error("Failed to update quantity");
            fetchCart();
        }
    }

    async function handleRemove(id) {
        try {
            await axios.post('http://localhost:3000/cart/removeItem', { id }, { withCredentials: true });
            setItemsdata(prev => prev.filter(item => item._id !== id));
            toast.success("Item removed from cart");
        }
        catch (err) {
            toast.error("Failed to remove item");
        }
    }

    async function handlePlaceOrder(deliveryAddress) {
        try {
            await axios.post('http://localhost:3000/cart/placeOrder', { deliveryAddress }, { withCredentials: true });
            toast.success("Order placed successfully!");
            setItemsdata([]);
            setTotalPrice(0);
            setShowCheckout(false);
        }
        catch (err) {
            toast.error(err.response?.data?.message || "Failed to place order");
        }
    }

    const shipping = itemsdata.length > 0 ? 1.99 : 0;

    return <>
        <Navbar userLoginState={userLoginState} setUserLoginState={setUserLoginState} />
        <p className="text-center text-4xl md:text-7xl cantora-one-regular ">Cart</p>
        <hr className="w-4/5 m-auto my-10" />
        <div className="flex justify-center align-middle mb-10 flex-wrap">
            {itemsdata.length > 0 ? (
                itemsdata.map(item => (
                    <CartItems
                        key={item._id}
                        id={item._id}
                        name={item.itemname}
                        price={item.itemprice}
                        place={item.prodplace}
                        img={item.img}
                        quantity={item.quantity || 1}
                        onQuantityChange={handleQuantityChange}
                        onRemove={handleRemove}
                    />
                ))
            ) : (
                <p className="fredoka text-xl text-gray-400">Your cart is empty</p>
            )}
        </div>

        <div className="w-5/6 md:w-3/6 lg:w-2/6 p-5 bghc rounded-2xl mx-auto mb-10">
            <p className="fredoka text-2xl mb-2">Order Summary</p>
            <p className="fredoka text-xl">Items ({itemsdata.length}): ${totalprice.toFixed(2)}</p>
            <p className="fredoka text-xl">Shipping Charges: ${shipping.toFixed(2)}</p>
            <hr className="my-5 " />
            <p className="fredoka text-xl text-[#06c167]">Total: ${(totalprice + shipping).toFixed(2)}</p>
            <button
                className="text-xl bg p-2 my-3 w-full fredoka disabled:opacity-50"
                onClick={() => setShowCheckout(true)}
                disabled={itemsdata.length === 0}
            >
                Proceed To Checkout
            </button>
        </div>

        <CheckoutModal
            isOpen={showCheckout}
            onClose={() => setShowCheckout(false)}
            onPlaceOrder={handlePlaceOrder}
            totalPrice={(totalprice + shipping).toFixed(2)}
        />

        <Footer />
    </>
}