import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function SellersPanel() {
    const [sellers, setSellers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({ fname: '', lname: '', username: '', number: '', email: '', password: '', storename: '', address: '', storenumber: '' });

    useEffect(() => { fetchSellers(); }, []);

    async function fetchSellers() {
        try {
            let res = await axios.get('http://localhost:3000/admin/sellers', { withCredentials: true });
            setSellers(res.data);
        } catch (err) { toast.error('Failed to load sellers'); }
    }

    function resetForm() {
        setForm({ fname: '', lname: '', username: '', number: '', email: '', password: '', storename: '', address: '', storenumber: '' });
        setEditingId(null);
        setShowForm(false);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (editingId) {
                let data = { ...form };
                if (!data.password) delete data.password;
                await axios.put(`http://localhost:3000/admin/sellers/${editingId}`, data, { withCredentials: true });
                toast.success('Seller updated');
            } else {
                await axios.post('http://localhost:3000/admin/sellers', form, { withCredentials: true });
                toast.success('Seller created');
            }
            resetForm();
            fetchSellers();
        } catch (err) { toast.error(err.response?.data?.message || 'Operation failed'); }
    }

    async function handleDelete(id) {
        if (!confirm('Delete this seller?')) return;
        try {
            await axios.delete(`http://localhost:3000/admin/sellers/${id}`, { withCredentials: true });
            toast.success('Seller deleted');
            fetchSellers();
        } catch (err) { toast.error('Failed to delete'); }
    }

    function startEdit(s) {
        setForm({ fname: s.fname, lname: s.lname, username: s.username, number: s.number, email: s.email, password: '', storename: s.storename || '', address: s.address || '', storenumber: s.storenumber || '' });
        setEditingId(s._id);
        setShowForm(true);
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl fredoka text-white">Sellers ({sellers.length})</h2>
                <button onClick={() => { resetForm(); setShowForm(!showForm); }} className="px-4 py-2 rounded-xl fredoka text-sm" style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' }}>
                    {showForm ? 'Cancel' : '+ Add Seller'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="mb-6 p-5 rounded-2xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <input value={form.fname} onChange={e => setForm({ ...form, fname: e.target.value })} placeholder="First Name" required className="p-2 rounded-lg fredoka" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }} />
                    <input value={form.lname} onChange={e => setForm({ ...form, lname: e.target.value })} placeholder="Last Name" required className="p-2 rounded-lg fredoka" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }} />
                    <input value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} placeholder="Username" required className="p-2 rounded-lg fredoka" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }} />
                    <input type="number" value={form.number} onChange={e => setForm({ ...form, number: e.target.value })} placeholder="Phone" required={!editingId} className="p-2 rounded-lg fredoka" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }} />
                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" required className="p-2 rounded-lg fredoka" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }} />
                    <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder={editingId ? "New Password (optional)" : "Password"} required={!editingId} className="p-2 rounded-lg fredoka" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }} />
                    <input value={form.storename} onChange={e => setForm({ ...form, storename: e.target.value })} placeholder="Store Name" className="p-2 rounded-lg fredoka" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }} />
                    <input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="Store Address" className="p-2 rounded-lg fredoka" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }} />
                    <input type="number" value={form.storenumber} onChange={e => setForm({ ...form, storenumber: e.target.value })} placeholder="Store Phone" className="p-2 rounded-lg fredoka" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }} />
                    <div className="lg:col-span-3 md:col-span-2">
                        <button type="submit" className="px-6 py-2 rounded-lg fredoka" style={{ background: '#8b5cf6' }}>{editingId ? 'Update' : 'Create'}</button>
                    </div>
                </form>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-left" style={{ borderCollapse: 'separate', borderSpacing: '0 8px' }}>
                    <thead>
                        <tr className="text-gray-400 cantora-one-regular text-sm">
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Store</th>
                            <th className="px-4 py-2">Address</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sellers.map(s => (
                            <tr key={s._id} style={{ background: 'rgba(255,255,255,0.03)' }}>
                                <td className="px-4 py-3 fredoka">{s.fname} {s.lname}</td>
                                <td className="px-4 py-3 cantora-one-regular text-gray-300">{s.email}</td>
                                <td className="px-4 py-3 fredoka text-purple-400">{s.storename || '—'}</td>
                                <td className="px-4 py-3 cantora-one-regular text-gray-400 text-sm">{s.address || '—'}</td>
                                <td className="px-4 py-3">
                                    <button onClick={() => startEdit(s)} className="text-blue-400 hover:text-blue-300 fredoka text-sm mr-3">Edit</button>
                                    <button onClick={() => handleDelete(s._id)} className="text-red-400 hover:text-red-300 fredoka text-sm">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {sellers.length === 0 && <p className="text-center text-gray-500 fredoka mt-4">No sellers found</p>}
            </div>
        </div>
    );
}
