import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function AdminLogin() {
    document.title = 'Admin Login | FreshEats';

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:3000/admin/login', { username, password }, { withCredentials: true });
            toast.success('Welcome, Admin!');
            navigate('/admin/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed');
        }
        setLoading(false);
    }

    return (
        <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)' }}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 md:p-12 rounded-3xl w-11/12 max-w-md"
                style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl fredoka text-[#06c167] mb-2">🛡️ Admin Panel</h1>
                    <p className="cantora-one-regular text-gray-400">FreshEats Management Console</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="cantora-one-regular text-gray-400 text-sm block mb-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 rounded-xl fredoka"
                            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }}
                            placeholder="Enter admin username"
                            required
                        />
                    </div>
                    <div>
                        <label className="cantora-one-regular text-gray-400 text-sm block mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 rounded-xl fredoka"
                            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }}
                            placeholder="Enter admin password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full p-3 rounded-xl fredoka text-lg text-white disabled:opacity-50 hover:opacity-90 duration-200"
                        style={{ background: 'linear-gradient(135deg, #06c167, #04a054)' }}
                    >
                        {loading ? 'Authenticating...' : 'Login to Dashboard'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
