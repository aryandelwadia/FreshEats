import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function MyItemsPanel() {
    const [items, setItems] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({ itemname: '', itemprice: '', prodplace: '', img: '' });

    useEffect(() => { fetchItems(); }, []);

    async function fetchItems() {
        try {
            let res = await axios.get('http://localhost:3000/item/myitems', { withCredentials: true });
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
                await axios.put(`http://localhost:3000/item/update/${editingId}`, data, { withCredentials: true });
                toast.success('Item updated!');
            } else {
                await axios.post('http://localhost:3000/item/additem', data, { withCredentials: true });
                toast.success('Item added to shop!');
            }
            resetForm();
            fetchItems();
        } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
    }

    async function handleDelete(id) {
        if (!confirm('Delete this item from your shop?')) return;
        try {
            await axios.delete(`http://localhost:3000/item/delete/${id}`, { withCredentials: true });
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
                <h2 className="text-2xl fredoka text-white">My Items ({items.length})</h2>
                <button onClick={() => { resetForm(); setShowForm(!showForm); }} className="px-4 py-2 rounded-xl fredoka text-sm text-white" style={{ background: 'linear-gradient(135deg, #06c167, #04a054)' }}>
                    {showForm ? 'Cancel' : '+ Add Item'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="mb-6 p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        <div>
                            <label className="cantora-one-regular text-gray-400 text-sm block mb-1">Item Name</label>
                            <input value={form.itemname} onChange={e => setForm({ ...form, itemname: e.target.value })} placeholder="e.g. Fresh Mangoes" required className="w-full p-2 rounded-lg fredoka" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }} />
                        </div>
                        <div>
                            <label className="cantora-one-regular text-gray-400 text-sm block mb-1">Price ($/kg)</label>
                            <input type="number" step="0.01" min="1" value={form.itemprice} onChange={e => setForm({ ...form, itemprice: e.target.value })} placeholder="5.99" required className="w-full p-2 rounded-lg fredoka" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }} />
                        </div>
                        <div>
                            <label className="cantora-one-regular text-gray-400 text-sm block mb-1">Production Place</label>
                            <input value={form.prodplace} onChange={e => setForm({ ...form, prodplace: e.target.value })} placeholder="Ratnagiri, Maharashtra" required className="w-full p-2 rounded-lg fredoka" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }} />
                        </div>
                        <div>
                            <label className="cantora-one-regular text-gray-400 text-sm block mb-1">Image URL</label>
                            <input value={form.img} onChange={e => setForm({ ...form, img: e.target.value })} placeholder="https://images.unsplash.com/..." required className="w-full p-2 rounded-lg fredoka" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }} />
                        </div>
                    </div>
                    {form.img && (
                        <div className="mb-4">
                            <p className="cantora-one-regular text-gray-400 text-xs mb-1">Preview:</p>
                            <img src={form.img} alt="preview" className="h-32 rounded-xl object-cover" onError={(e) => e.target.style.display = 'none'} />
                        </div>
                    )}
                    <button type="submit" className="px-6 py-2 rounded-lg fredoka text-white" style={{ background: '#06c167' }}>{editingId ? 'Update Item' : 'Add to Shop'}</button>
                </form>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map(item => (
                    <div key={item._id} className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div className="h-44 bg-gray-800 flex items-center justify-center overflow-hidden">
                            {item.img ? <img src={item.img} alt={item.itemname} className="w-full h-full object-cover" /> : <span className="text-5xl">🥬</span>}
                        </div>
                        <div className="p-4">
                            <p className="fredoka text-lg text-white">{item.itemname}</p>
                            <p className="fredoka text-xl text-[#06c167]">${item.itemprice}/kg</p>
                            <p className="cantora-one-regular text-gray-400 text-sm mt-1">{item.prodplace}</p>
                            <div className="flex gap-3 mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                                <button onClick={() => startEdit(item)} className="text-blue-400 hover:text-blue-300 fredoka text-sm">✏️ Edit</button>
                                <button onClick={() => handleDelete(item._id)} className="text-red-400 hover:text-red-300 fredoka text-sm">🗑️ Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {items.length === 0 && !showForm && (
                <div className="text-center py-16">
                    <p className="text-5xl mb-4">🏬</p>
                    <p className="fredoka text-gray-400 text-xl">Your shop is empty</p>
                    <p className="cantora-one-regular text-gray-500">Click "+ Add Item" to start selling</p>
                </div>
            )}
        </div>
    );
}
