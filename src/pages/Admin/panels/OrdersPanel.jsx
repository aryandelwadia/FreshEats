import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function OrdersPanel() {
    const [orders, setOrders] = useState([]);
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => { fetchOrders(); }, []);

    async function fetchOrders() {
        try {
            let res = await axios.get('http://localhost:3000/admin/orders', { withCredentials: true });
            setOrders(res.data);
        } catch (err) { toast.error('Failed to load orders'); }
    }

    async function handleStatusChange(id, status) {
        try {
            await axios.put(`http://localhost:3000/admin/orders/${id}/status`, { status }, { withCredentials: true });
            toast.success(`Status updated to ${status}`);
            fetchOrders();
        } catch (err) { toast.error(err.response?.data?.message || 'Failed to update'); }
    }

    async function handleDelete(id) {
        if (!confirm('Delete this order?')) return;
        try {
            await axios.delete(`http://localhost:3000/admin/orders/${id}`, { withCredentials: true });
            toast.success('Order deleted');
            fetchOrders();
        } catch (err) { toast.error('Failed to delete'); }
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

    return (
        <div>
            <h2 className="text-2xl fredoka text-white mb-6">Orders ({orders.length})</h2>

            {orders.length === 0 ? (
                <p className="text-center text-gray-500 fredoka mt-4">No orders found</p>
            ) : (
                <div className="space-y-4">
                    {orders.map(order => (
                        <div key={order._id} className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            {/* Header */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3">
                                <div className="flex items-center gap-4">
                                    <div>
                                        <p className="fredoka text-gray-300">#{order._id.slice(-8).toUpperCase()}</p>
                                        <p className="cantora-one-regular text-gray-500 text-sm">{formatDate(order.createdAt)}</p>
                                    </div>
                                    <span className="fredoka text-sm px-3 py-1 rounded-full capitalize" style={{ background: getStatusColor(order.status) + '20', color: getStatusColor(order.status) }}>
                                        {order.status}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 mt-2 md:mt-0">
                                    <p className="fredoka text-[#06c167] text-lg">${order.total?.toFixed(2)}</p>
                                    <button onClick={() => setExpandedId(expandedId === order._id ? null : order._id)} className="text-gray-400 hover:text-white fredoka text-sm ml-2">
                                        {expandedId === order._id ? '▲ Less' : '▼ More'}
                                    </button>
                                </div>
                            </div>

                            {/* User Info */}
                            <p className="cantora-one-regular text-gray-400 text-sm mb-2">📧 {order.email}</p>

                            {/* Status Controls */}
                            <div className="flex flex-wrap gap-2 mb-3">
                                {['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map(status => (
                                    <button
                                        key={status}
                                        onClick={() => handleStatusChange(order._id, status)}
                                        disabled={order.status === status}
                                        className="px-3 py-1 rounded-lg cantora-one-regular text-xs capitalize disabled:opacity-30 hover:opacity-80 duration-200"
                                        style={{ background: getStatusColor(status) + '30', color: getStatusColor(status), border: `1px solid ${getStatusColor(status)}50` }}
                                    >
                                        {status}
                                    </button>
                                ))}
                                <button onClick={() => handleDelete(order._id)} className="px-3 py-1 rounded-lg text-xs fredoka text-red-400 hover:text-red-300 ml-auto" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>
                                    Delete
                                </button>
                            </div>

                            {/* Expanded Details */}
                            {expandedId === order._id && (
                                <div className="border-t border-gray-700 pt-3 mt-3">
                                    <p className="fredoka text-gray-300 mb-2">Items:</p>
                                    {order.items?.map((item, i) => (
                                        <div key={i} className="flex justify-between py-1 cantora-one-regular text-sm">
                                            <span className="text-gray-300">{item.itemname} × {item.quantity}</span>
                                            <span className="text-[#06c167]">${(item.itemprice * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                    <div className="flex justify-between py-1 mt-2 border-t border-gray-700 pt-2">
                                        <span className="cantora-one-regular text-gray-400 text-sm">Subtotal</span>
                                        <span className="fredoka">${order.subtotal?.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between py-1">
                                        <span className="cantora-one-regular text-gray-400 text-sm">Shipping</span>
                                        <span className="fredoka">${order.shipping?.toFixed(2)}</span>
                                    </div>

                                    {order.deliveryAddress && (
                                        <div className="mt-3 pt-3 border-t border-gray-700">
                                            <p className="fredoka text-gray-300 text-sm mb-1">Delivery Address:</p>
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
