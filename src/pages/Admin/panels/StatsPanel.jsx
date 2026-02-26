import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function StatsPanel() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        fetchStats();
    }, []);

    async function fetchStats() {
        try {
            let res = await axios.get('http://localhost:3000/admin/stats', { withCredentials: true });
            setStats(res.data);
        } catch (err) {
            toast.error('Failed to load stats');
        }
    }

    if (!stats) return <p className="text-gray-400 fredoka text-center mt-20">Loading stats...</p>;

    const statCards = [
        { label: 'Total Users', value: stats.totalUsers, icon: '👥', color: '#3b82f6' },
        { label: 'Total Sellers', value: stats.totalSellers, icon: '🏪', color: '#8b5cf6' },
        { label: 'Total Items', value: stats.totalItems, icon: '🥬', color: '#06c167' },
        { label: 'Total Orders', value: stats.totalOrders, icon: '📦', color: '#f59e0b' },
        { label: 'Total Revenue', value: `$${stats.totalRevenue}`, icon: '💰', color: '#10b981' },
    ];

    const statusCards = [
        { label: 'Pending', value: stats.ordersByStatus.pending, color: '#eab308' },
        { label: 'Confirmed', value: stats.ordersByStatus.confirmed, color: '#3b82f6' },
        { label: 'Shipped', value: stats.ordersByStatus.shipped, color: '#8b5cf6' },
        { label: 'Delivered', value: stats.ordersByStatus.delivered, color: '#06c167' },
        { label: 'Cancelled', value: stats.ordersByStatus.cancelled, color: '#ef4444' },
    ];

    return (
        <div>
            <h2 className="text-2xl fredoka text-white mb-6">Dashboard Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
                {statCards.map(card => (
                    <div key={card.label} className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <p className="text-3xl mb-2">{card.icon}</p>
                        <p className="fredoka text-2xl" style={{ color: card.color }}>{card.value}</p>
                        <p className="cantora-one-regular text-gray-400 text-sm">{card.label}</p>
                    </div>
                ))}
            </div>
            <h3 className="text-xl fredoka text-white mb-4">Orders by Status</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {statusCards.map(card => (
                    <div key={card.label} className="p-4 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${card.color}30` }}>
                        <p className="fredoka text-2xl" style={{ color: card.color }}>{card.value}</p>
                        <p className="cantora-one-regular text-gray-400 text-sm">{card.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
