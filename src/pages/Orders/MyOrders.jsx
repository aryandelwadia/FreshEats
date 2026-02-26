import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";

export default function MyOrders({ userLoginState, setUserLoginState }) {

    document.title = "My Orders | FreshEats";

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userLoginState) {
            navigate('/');
            return;
        }
        fetchOrders();
    }, [userLoginState]);

    async function fetchOrders() {
        try {
            let res = await axios.get('http://localhost:3000/cart/orders', { withCredentials: true });
            setOrders(res.data);
        } catch (err) {
            toast.error("Failed to load orders");
        }
        setLoading(false);
    }

    function getStatusColor(status) {
        switch (status) {
            case 'pending': return 'text-yellow-400';
            case 'confirmed': return 'text-blue-400';
            case 'shipped': return 'text-purple-400';
            case 'delivered': return 'text-[#06c167]';
            case 'cancelled': return 'text-red-400';
            default: return 'text-gray-400';
        }
    }

    function formatDate(dateStr) {
        return new Date(dateStr).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    return <>
        <Navbar userLoginState={userLoginState} setUserLoginState={setUserLoginState} />
        <p className="text-center text-4xl md:text-7xl cantora-one-regular ">My Orders</p>
        <hr className="w-4/5 m-auto my-10" />

        <div className="px-4 md:px-10 lg:px-20 mb-10">
            {loading ? (
                <p className="text-center fredoka text-xl text-gray-400">Loading orders...</p>
            ) : orders.length === 0 ? (
                <p className="text-center fredoka text-xl text-gray-400">You haven't placed any orders yet.</p>
            ) : (
                orders.map((order, index) => (
                    <motion.div
                        key={order._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bghc rounded-2xl p-5 md:p-8 mb-6"
                    >
                        {/* Order Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                            <div>
                                <p className="fredoka text-lg text-gray-400">Order #{order._id.slice(-8).toUpperCase()}</p>
                                <p className="cantora-one-regular text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                            </div>
                            <div className="mt-2 md:mt-0">
                                <span className={`fredoka text-lg capitalize ${getStatusColor(order.status)}`}>
                                    ● {order.status}
                                </span>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="border-t border-[#333] pt-4 mb-4">
                            {order.items.map((item, i) => (
                                <div key={i} className="flex justify-between items-center py-2">
                                    <div className="flex items-center gap-3">
                                        <span className="cantora-one-regular">{item.itemname}</span>
                                        <span className="text-gray-500 text-sm fredoka">x{item.quantity}</span>
                                    </div>
                                    <span className="fredoka text-[#06c167]">${(item.itemprice * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        {/* Delivery Address */}
                        {order.deliveryAddress && (
                            <div className="border-t border-[#333] pt-4 mb-4">
                                <p className="fredoka text-sm text-gray-400 mb-1">Delivering to:</p>
                                <p className="cantora-one-regular text-gray-300">
                                    <span className="text-[#06c167] fredoka text-sm">{order.deliveryAddress.label || 'Address'}</span> — {order.deliveryAddress.street}, {order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.pincode}
                                </p>
                                <p className="cantora-one-regular text-gray-400 text-sm">📞 {order.deliveryAddress.phone}</p>
                            </div>
                        )}

                        {/* Order Total */}
                        <div className="border-t border-[#333] pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                            <div className="flex gap-6">
                                <div>
                                    <p className="text-sm text-gray-500 cantora-one-regular">Subtotal</p>
                                    <p className="fredoka">${order.subtotal.toFixed(2)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 cantora-one-regular">Shipping</p>
                                    <p className="fredoka">${order.shipping.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="mt-3 sm:mt-0">
                                <p className="text-sm text-gray-500 cantora-one-regular">Total</p>
                                <p className="fredoka text-2xl text-[#06c167]">${order.total.toFixed(2)}</p>
                            </div>
                        </div>
                    </motion.div>
                ))
            )}
        </div>

        <Footer />
    </>
}
