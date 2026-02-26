import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function SellerProfilePanel() {
    const [seller, setSeller] = useState(null);
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({});

    useEffect(() => { fetchProfile(); }, []);

    async function fetchProfile() {
        try {
            let res = await axios.get('http://localhost:3000/seller/currentseller', { withCredentials: true });
            setSeller(res.data);
            setForm({
                fname: res.data.fname, lname: res.data.lname, username: res.data.username,
                storename: res.data.storename, address: res.data.address,
                number: res.data.number, storenumber: res.data.storenumber, password: ''
            });
        } catch (err) { toast.error('Failed to load profile'); }
    }

    async function handleUpdate(e) {
        e.preventDefault();
        try {
            let data = { ...form };
            if (!data.password) delete data.password;
            await axios.put('http://localhost:3000/seller/updateprofile', data, { withCredentials: true });
            toast.success('Profile updated!');
            setEditing(false);
            fetchProfile();
        } catch (err) { toast.error(err.response?.data?.message || 'Update failed'); }
    }

    if (!seller) return <p className="text-gray-400 fredoka text-center mt-20">Loading profile...</p>;

    return (
        <div>
            <h2 className="text-2xl fredoka text-white mb-6">Store Profile</h2>

            <div className="rounded-2xl p-6 md:p-8 mb-6" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl" style={{ background: 'linear-gradient(135deg, #06c167, #04a054)' }}>
                        🏪
                    </div>
                    <div>
                        <p className="fredoka text-xl text-white">{seller.storename}</p>
                        <p className="cantora-one-regular text-gray-400">{seller.fname} {seller.lname}</p>
                        <p className="cantora-one-regular text-gray-500 text-sm">{seller.email}</p>
                    </div>
                </div>

                {!editing ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                            <p className="cantora-one-regular text-gray-500 text-sm">Username</p>
                            <p className="fredoka text-white">{seller.username}</p>
                        </div>
                        <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                            <p className="cantora-one-regular text-gray-500 text-sm">Phone</p>
                            <p className="fredoka text-white">{seller.number}</p>
                        </div>
                        <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                            <p className="cantora-one-regular text-gray-500 text-sm">Store Address</p>
                            <p className="fredoka text-white">{seller.address}</p>
                        </div>
                        <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                            <p className="cantora-one-regular text-gray-500 text-sm">Store Phone</p>
                            <p className="fredoka text-white">{seller.storenumber}</p>
                        </div>
                        <div className="md:col-span-2 mt-2">
                            <button onClick={() => setEditing(true)} className="px-6 py-2 rounded-xl fredoka text-white" style={{ background: 'linear-gradient(135deg, #06c167, #04a054)' }}>
                                ✏️ Edit Profile
                            </button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label className="cantora-one-regular text-gray-400 text-sm">First Name</label>
                            <input value={form.fname} onChange={e => setForm({ ...form, fname: e.target.value })} className="w-full p-2 rounded-lg fredoka" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }} />
                        </div>
                        <div>
                            <label className="cantora-one-regular text-gray-400 text-sm">Last Name</label>
                            <input value={form.lname} onChange={e => setForm({ ...form, lname: e.target.value })} className="w-full p-2 rounded-lg fredoka" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }} />
                        </div>
                        <div>
                            <label className="cantora-one-regular text-gray-400 text-sm">Store Name</label>
                            <input value={form.storename} onChange={e => setForm({ ...form, storename: e.target.value })} className="w-full p-2 rounded-lg fredoka" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }} />
                        </div>
                        <div>
                            <label className="cantora-one-regular text-gray-400 text-sm">Store Address</label>
                            <input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} className="w-full p-2 rounded-lg fredoka" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }} />
                        </div>
                        <div>
                            <label className="cantora-one-regular text-gray-400 text-sm">Phone</label>
                            <input type="number" value={form.number} onChange={e => setForm({ ...form, number: e.target.value })} className="w-full p-2 rounded-lg fredoka" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }} />
                        </div>
                        <div>
                            <label className="cantora-one-regular text-gray-400 text-sm">Store Phone</label>
                            <input type="number" value={form.storenumber} onChange={e => setForm({ ...form, storenumber: e.target.value })} className="w-full p-2 rounded-lg fredoka" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }} />
                        </div>
                        <div className="md:col-span-2">
                            <label className="cantora-one-regular text-gray-400 text-sm">New Password (leave blank to keep)</label>
                            <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="••••••" className="w-full p-2 rounded-lg fredoka" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }} />
                        </div>
                        <div className="md:col-span-2 flex gap-3 mt-2">
                            <button type="submit" className="px-6 py-2 rounded-lg fredoka text-white" style={{ background: '#06c167' }}>Save Changes</button>
                            <button type="button" onClick={() => setEditing(false)} className="px-6 py-2 rounded-lg fredoka text-gray-400 hover:text-white">Cancel</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
