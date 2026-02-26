import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import MyItemsPanel from './panels/MyItemsPanel';
import SellerOrdersPanel from './panels/SellerOrdersPanel';
import SellerProfilePanel from './panels/SellerProfilePanel';

const navItems = [
    { id: 'items', label: 'My Items', icon: '🥬' },
    { id: 'orders', label: 'Orders', icon: '📦' },
    { id: 'profile', label: 'Store Profile', icon: '🏪' },
];

export default function SellerDashboard() {
    document.title = 'Seller Dashboard | FreshEats';

    const [activePanel, setActivePanel] = useState('items');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [storeName, setStoreName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/seller/currentseller', { withCredentials: true })
            .then(res => setStoreName(res.data.storename || 'My Store'))
            .catch(() => {
                toast.error('Seller session expired');
                navigate('/seller/login');
            });
    }, []);

    async function handleLogout() {
        try {
            await axios.post('http://localhost:3000/seller/logout', {}, { withCredentials: true });
            toast.success('Logged out');
            navigate('/');
        } catch { navigate('/'); }
    }

    function renderPanel() {
        switch (activePanel) {
            case 'items': return <MyItemsPanel />;
            case 'orders': return <SellerOrdersPanel />;
            case 'profile': return <SellerProfilePanel />;
            default: return <MyItemsPanel />;
        }
    }

    return (
        <div className="min-h-screen flex" style={{ background: '#0a0a0f' }}>
            {/* Mobile Hamburger */}
            <button
                className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.1)' }}
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                <span className="text-2xl">{sidebarOpen ? '✕' : '☰'}</span>
            </button>

            {/* Sidebar */}
            <div
                className={`fixed md:static z-40 w-64 min-h-screen flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
                style={{ background: 'rgba(255,255,255,0.03)', borderRight: '1px solid rgba(255,255,255,0.08)' }}
            >
                <div className="p-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                    <h1 className="fredoka text-xl text-[#06c167]">🥬 FreshEats</h1>
                    <p className="cantora-one-regular text-gray-400 text-sm mt-1">{storeName}</p>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => { setActivePanel(item.id); setSidebarOpen(false); }}
                            className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 fredoka duration-200 ${activePanel === item.id ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}
                            style={activePanel === item.id ? { background: 'rgba(6,193,103,0.15)', borderLeft: '3px solid #06c167' } : {}}
                        >
                            <span className="text-lg">{item.icon}</span>
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="p-4 space-y-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full px-4 py-3 rounded-xl flex items-center gap-3 fredoka text-gray-400 hover:text-white duration-200"
                        style={{ background: 'rgba(255,255,255,0.03)' }}
                    >
                        <span>🏠</span> Back to Store
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full px-4 py-3 rounded-xl flex items-center gap-3 fredoka text-red-400 hover:text-red-300 duration-200"
                        style={{ background: 'rgba(239,68,68,0.08)' }}
                    >
                        <span>🚪</span> Logout
                    </button>
                </div>
            </div>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Main Content */}
            <div className="flex-1 p-4 md:p-8 overflow-y-auto mt-14 md:mt-0">
                {renderPanel()}
            </div>
        </div>
    );
}
