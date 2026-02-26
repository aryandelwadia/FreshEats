import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ItemsPanel() {
    const [items, setItems] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({ itemname: '', itemprice: '', prodplace: '', img: '' });

    useEffect(() => { fetchItems(); }, []);

    async function fetchItems() {
        try {
            let res = await axios.get('http://localhost:3000/admin/items', { withCredentials: true });
            setItems(res.data);
        } catch (err) { toast.error('Failed to load items'); }
    }

    function resetForm() {
        setForm({ itemname: '', itemprice: '', prodplace: '', img: '' });
        setEditingId(null);
        setShowForm(false);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            let data = { ...form, itemprice: parseFloat(form.itemprice) };
            if (editingId) {
                await axios.put(`http://localhost:3000/admin/items/${editingId}`, data, { withCredentials: true });
                toast.success('Item updated');
            } else {
                await axios.post('http://localhost:3000/admin/items', data, { withCredentials: true });
                toast.success('Item created');
            }
            resetForm();
            fetchItems();
        } catch (err) { toast.error(err.response?.data?.message || 'Operation failed'); }
    }

    async function handleDelete(id) {
        if (!confirm('Delete this item?')) return;
        try {
            await axios.delete(`http://localhost:3000/admin/items/${id}`, { withCredentials: true });
            toast.success('Item deleted');
            fetchItems();
        } catch (err) { toast.error('Failed to delete'); }
    }

    function startEdit(item) {
        setForm({ itemname: item.itemname, itemprice: item.itemprice, prodplace: item.prodplace, img: item.img || '' });
        setEditingId(item._id);
        setShowForm(true);
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl fredoka text-white">Items ({items.length})</h2>
                <button onClick={() => { resetForm(); setShowForm(!showForm); }} className="px-4 py-2 rounded-xl fredoka text-sm" style={{ background: 'linear-gradient(135deg, #06c167, #04a054)' }}>
                    {showForm ? 'Cancel' : '+ Add Item'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="mb-6 p-5 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-3" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <input value={form.itemname} onChange={e => setForm({ ...form, itemname: e.target.value })} placeholder="Item Name" required className="p-2 rounded-lg fredoka" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }} />
                    <input type="number" step="0.01" min="1" value={form.itemprice} onChange={e => setForm({ ...form, itemprice: e.target.value })} placeholder="Price ($)" required className="p-2 rounded-lg fredoka" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }} />
                    <input value={form.prodplace} onChange={e => setForm({ ...form, prodplace: e.target.value })} placeholder="Production Place" required className="p-2 rounded-lg fredoka" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }} />
                    <input value={form.img} onChange={e => setForm({ ...form, img: e.target.value })} placeholder="Image URL" required className="p-2 rounded-lg fredoka" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }} />
                    <div className="md:col-span-2">
                        <button type="submit" className="px-6 py-2 rounded-lg fredoka" style={{ background: '#06c167' }}>{editingId ? 'Update' : 'Create'}</button>
                    </div>
                </form>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {items.map(item => (
                    <div key={item._id} className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div className="h-40 bg-gray-800 flex items-center justify-center overflow-hidden">
                            {item.img ? <img src={item.img.startsWith('http') ? item.img : `http://localhost:3000/uploads/${item.img}`} alt={item.itemname} className="w-full h-full object-cover" /> : <span className="text-4xl">🥬</span>}
                        </div>
                        <div className="p-4">
                            <p className="fredoka text-lg">{item.itemname}</p>
                            <p className="fredoka text-[#06c167] text-lg">${item.itemprice}</p>
                            <p className="cantora-one-regular text-gray-400 text-sm">{item.prodplace}</p>
                            <div className="flex gap-3 mt-3">
                                <button onClick={() => startEdit(item)} className="text-blue-400 hover:text-blue-300 fredoka text-sm">Edit</button>
                                <button onClick={() => handleDelete(item._id)} className="text-red-400 hover:text-red-300 fredoka text-sm">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {items.length === 0 && <p className="text-center text-gray-500 fredoka mt-4">No items found</p>}
        </div>
    );
}
