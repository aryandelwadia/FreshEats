import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function SellerOrdersPanel() {
    const [orders, setOrders] = useState([]);
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => { fetchOrders(); }, []);

    async function fetchOrders() {
        try {
            let res = await axios.get('http://localhost:3000/seller/orders', { withCredentials: true });
            setOrders(res.data);
        } catch (err) { toast.error('Failed to load orders'); }
    }

    function getStatusColor(status) {
        switch (status) {
            case 'pending': return '#eab308';
            case 'confirmed': return '#3b82f6';
            case 'shipped': return '#8b5cf6';
            case 'delivered': return '#06c167';
            case 'cancelled': return '#ef4444';
            default: return '#6b7280';
        }
    }

    function formatDate(d) {
        return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    }

    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
                <h2 className="text-2xl fredoka text-white">Orders ({orders.length})</h2>
                <div className="px-4 py-2 rounded-xl" style={{ background: 'rgba(6,193,103,0.15)', border: '1px solid rgba(6,193,103,0.3)' }}>
                    <span className="cantora-one-regular text-gray-400 text-sm">Revenue: </span>
                    <span className="fredoka text-[#06c167] text-lg">${totalRevenue.toFixed(2)}</span>
                </div>
            </div>

            {orders.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-5xl mb-4">📦</p>
                    <p className="fredoka text-gray-400 text-xl">No orders yet</p>
                    <p className="cantora-one-regular text-gray-500">Orders containing your items will appear here</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map(order => (
                        <div key={order._id} className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                                <div className="flex items-center gap-3">
                                    <div>
                                        <p className="fredoka text-gray-300">#{order._id.slice(-8).toUpperCase()}</p>
                                        <p className="cantora-one-regular text-gray-500 text-sm">{formatDate(order.createdAt)}</p>
                                    </div>
                                    <span className="fredoka text-sm px-3 py-1 rounded-full capitalize" style={{ background: getStatusColor(order.status) + '20', color: getStatusColor(order.status) }}>
                                        {order.status}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 mt-2 sm:mt-0">
                                    <span className="fredoka text-[#06c167] text-lg">${order.total?.toFixed(2)}</span>
                                    <button onClick={() => setExpandedId(expandedId === order._id ? null : order._id)} className="text-gray-400 hover:text-white fredoka text-sm">
                                        {expandedId === order._id ? '▲ Less' : '▼ More'}
                                    </button>
                                </div>
                            </div>

                            <p className="cantora-one-regular text-gray-400 text-sm">📧 Customer: {order.email}</p>

                            {expandedId === order._id && (
                                <div className="border-t mt-3 pt-3" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                                    <p className="fredoka text-gray-300 mb-2">Items:</p>
                                    {order.items?.map((item, i) => (
                                        <div key={i} className="flex justify-between py-1 cantora-one-regular text-sm">
                                            <span className="text-gray-300">{item.itemname} × {item.quantity}</span>
                                            <span className="text-[#06c167]">${(item.itemprice * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}

                                    {order.deliveryAddress && (
                                        <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                                            <p className="fredoka text-gray-300 text-sm mb-1">Deliver to:</p>
                                            <p className="cantora-one-regular text-gray-400 text-sm">
                                                <span className="text-[#06c167]">{order.deliveryAddress.label}</span> — {order.deliveryAddress.street}, {order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.pincode}
                                            </p>
                                            <p className="cantora-one-regular text-gray-500 text-sm">📞 {order.deliveryAddress.phone}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
