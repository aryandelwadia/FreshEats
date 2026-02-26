import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function UsersPanel() {
    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({ fname: '', lname: '', username: '', number: '', email: '', password: '' });

    useEffect(() => { fetchUsers(); }, []);

    async function fetchUsers() {
        try {
            let res = await axios.get('http://localhost:3000/admin/users', { withCredentials: true });
            setUsers(res.data);
        } catch (err) { toast.error('Failed to load users'); }
    }

    function resetForm() {
        setForm({ fname: '', lname: '', username: '', number: '', email: '', password: '' });
        setEditingId(null);
        setShowForm(false);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (editingId) {
                let data = { ...form };
                if (!data.password) delete data.password;
                await axios.put(`http://localhost:3000/admin/users/${editingId}`, data, { withCredentials: true });
                toast.success('User updated');
            } else {
                await axios.post('http://localhost:3000/admin/users', form, { withCredentials: true });
                toast.success('User created');
            }
            resetForm();
            fetchUsers();
        } catch (err) { toast.error(err.response?.data?.message || 'Operation failed'); }
    }

    async function handleDelete(id) {
        if (!confirm('Delete this user? This will also remove their cart.')) return;
        try {
            await axios.delete(`http://localhost:3000/admin/users/${id}`, { withCredentials: true });
            toast.success('User deleted');
            fetchUsers();
        } catch (err) { toast.error('Failed to delete'); }
    }

    function startEdit(user) {
        setForm({ fname: user.fname, lname: user.lname, username: user.username, number: user.number, email: user.email, password: '' });
        setEditingId(user._id);
        setShowForm(true);
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl fredoka text-white">Users ({users.length})</h2>
                <button onClick={() => { resetForm(); setShowForm(!showForm); }} className="px-4 py-2 rounded-xl fredoka text-sm" style={{ background: 'linear-gradient(135deg, #06c167, #04a054)' }}>
                    {showForm ? 'Cancel' : '+ Add User'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="mb-6 p-5 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-3" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <input value={form.fname} onChange={e => setForm({ ...form, fname: e.target.value })} placeholder="First Name" required className="p-2 rounded-lg fredoka" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }} />
                    <input value={form.lname} onChange={e => setForm({ ...form, lname: e.target.value })} placeholder="Last Name" required className="p-2 rounded-lg fredoka" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }} />
                    <input value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} placeholder="Username" required className="p-2 rounded-lg fredoka" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }} />
                    <input type="number" value={form.number} onChange={e => setForm({ ...form, number: e.target.value })} placeholder="Phone Number" required={!editingId} className="p-2 rounded-lg fredoka" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }} />
                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" required className="p-2 rounded-lg fredoka" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }} />
                    <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder={editingId ? "New Password (leave blank to keep)" : "Password"} required={!editingId} className="p-2 rounded-lg fredoka" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }} />
                    <div className="md:col-span-2">
                        <button type="submit" className="px-6 py-2 rounded-lg fredoka" style={{ background: '#06c167' }}>{editingId ? 'Update' : 'Create'}</button>
                    </div>
                </form>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-left" style={{ borderCollapse: 'separate', borderSpacing: '0 8px' }}>
                    <thead>
                        <tr className="text-gray-400 cantora-one-regular text-sm">
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Username</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Phone</th>
                            <th className="px-4 py-2">Points</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} className="rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                                <td className="px-4 py-3 fredoka">{user.fname} {user.lname}</td>
                                <td className="px-4 py-3 cantora-one-regular text-gray-300">{user.username}</td>
                                <td className="px-4 py-3 cantora-one-regular text-gray-300">{user.email}</td>
                                <td className="px-4 py-3 cantora-one-regular text-gray-400">{user.number}</td>
                                <td className="px-4 py-3 fredoka text-[#06c167]">{user.freshpoints || 0}</td>
                                <td className="px-4 py-3">
                                    <button onClick={() => startEdit(user)} className="text-blue-400 hover:text-blue-300 fredoka text-sm mr-3">Edit</button>
                                    <button onClick={() => handleDelete(user._id)} className="text-red-400 hover:text-red-300 fredoka text-sm">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {users.length === 0 && <p className="text-center text-gray-500 fredoka mt-4">No users found</p>}
            </div>
        </div>
    );
}
