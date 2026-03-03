import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

export default function StatsPanel() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        fetchStats();
    }, []);

    async function fetchStats() {
        try {
            let res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/stats`, { withCredentials: true });
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

    // Tooltip for charts
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-gray-800 border border-gray-700 p-3 rounded-lg shadow-xl">
                    <p className="cantora-one-regular text-gray-300">{label || payload[0].name}</p>
                    <p className="fredoka text-[#06c167] text-lg">
                        {payload[0].name === 'revenue' || payload[0].dataKey === 'revenue' ? '$' : ''}
                        {payload[0].value}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div>
            <h2 className="text-2xl fredoka text-white mb-6">Dashboard Overview</h2>

            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
                {statCards.map(card => (
                    <div key={card.label} className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <p className="text-3xl mb-2">{card.icon}</p>
                        <p className="fredoka text-2xl" style={{ color: card.color }}>{card.value}</p>
                        <p className="cantora-one-regular text-gray-400 text-sm">{card.label}</p>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

                {/* Revenue Line Chart - Takes up 2 columns on large screens */}
                <div className="lg:col-span-2 p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <h3 className="text-xl fredoka text-white mb-6">Revenue Overview (Last 30 Days)</h3>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={stats.revenueData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                                <XAxis
                                    dataKey="date"
                                    stroke="#9ca3af"
                                    tick={{ fontFamily: 'Cantora One', fontSize: 12 }}
                                    tickMargin={10}
                                    minTickGap={30}
                                />
                                <YAxis
                                    stroke="#9ca3af"
                                    tick={{ fontFamily: 'Cantora One', fontSize: 12 }}
                                    tickFormatter={(value) => `$${value}`}
                                    width={60}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Line
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#06c167"
                                    strokeWidth={3}
                                    dot={{ fill: '#06c167', strokeWidth: 2, r: 4 }}
                                    activeDot={{ r: 6, fill: '#fff', stroke: '#06c167' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Orders by Status Pie Chart */}
                <div className="p-5 rounded-2xl flex flex-col items-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <h3 className="text-xl fredoka text-white mb-2 self-start">Orders by Status</h3>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={stats.ordersByStatus}
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {stats.ordersByStatus.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                    iconType="circle"
                                    formatter={(value, entry) => <span className="cantora-one-regular text-gray-300 ml-1">{value} ({entry.payload.value})</span>}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
}
