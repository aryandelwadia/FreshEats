import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function CheckoutModal({ isOpen, onClose, onPlaceOrder, totalPrice }) {

    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState('');
    const [showNewForm, setShowNewForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [newAddress, setNewAddress] = useState({
        label: 'Home',
        street: '',
        city: '',
        state: '',
        pincode: '',
        phone: ''
    });

    useEffect(() => {
        if (isOpen) {
            fetchAddresses();
        }
    }, [isOpen]);

    async function fetchAddresses() {
        try {
            let res = await axios.get('http://localhost:3000/user/address', { withCredentials: true });
            setAddresses(res.data.addresses || []);
            if (res.data.addresses && res.data.addresses.length > 0) {
                setSelectedAddressId(res.data.addresses[0]._id);
            }
        } catch (err) {
            toast.error("Failed to load addresses");
        }
    }

    async function handleAddAddress(e) {
        e.preventDefault();
        if (!newAddress.street || !newAddress.city || !newAddress.state || !newAddress.pincode || !newAddress.phone) {
            toast.error("Please fill all address fields");
            return;
        }
        try {
            let res = await axios.post('http://localhost:3000/user/address', newAddress, { withCredentials: true });
            setAddresses(res.data.addresses);
            let added = res.data.addresses[res.data.addresses.length - 1];
            setSelectedAddressId(added._id);
            setShowNewForm(false);
            setNewAddress({ label: 'Home', street: '', city: '', state: '', pincode: '', phone: '' });
            toast.success("Address added!");
        } catch (err) {
            toast.error("Failed to add address");
        }
    }

    async function handleDeleteAddress(addressId) {
        try {
            let res = await axios.post('http://localhost:3000/user/address/delete', { addressId }, { withCredentials: true });
            setAddresses(res.data.addresses);
            if (selectedAddressId === addressId) {
                setSelectedAddressId(res.data.addresses.length > 0 ? res.data.addresses[0]._id : '');
            }
            toast.success("Address removed");
        } catch (err) {
            toast.error("Failed to delete address");
        }
    }

    function handleCheckout() {
        let selected = addresses.find(a => a._id === selectedAddressId);
        if (!selected) {
            toast.error("Please select a delivery address");
            return;
        }
        setLoading(true);
        onPlaceOrder(selected).finally(() => setLoading(false));
    }

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bghc rounded-2xl p-6 md:p-8 w-11/12 md:w-2/3 lg:w-1/2 max-h-[85vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl md:text-3xl fredoka text-[#06c167]">Checkout</h2>
                        <button onClick={onClose} className="text-2xl hover:text-red-500 duration-200 fredoka">✕</button>
                    </div>

                    {/* Address Selection */}
                    <div className="mb-6">
                        <p className="fredoka text-xl mb-3">Select Delivery Address</p>

                        {addresses.length > 0 ? (
                            <div className="space-y-3">
                                {addresses.map(addr => (
                                    <div
                                        key={addr._id}
                                        className={`p-4 rounded-xl border-2 cursor-pointer duration-200 ${selectedAddressId === addr._id ? 'border-[#06c167] bg-[#06c16710]' : 'border-[#333] hover:border-[#555]'}`}
                                        onClick={() => setSelectedAddressId(addr._id)}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <span className="fredoka text-[#06c167] text-sm">{addr.label}</span>
                                                <p className="cantora-one-regular text-gray-300">{addr.street}</p>
                                                <p className="cantora-one-regular text-gray-400 text-sm">{addr.city}, {addr.state} - {addr.pincode}</p>
                                                <p className="cantora-one-regular text-gray-400 text-sm">📞 {addr.phone}</p>
                                            </div>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleDeleteAddress(addr._id); }}
                                                className="text-red-500 hover:text-red-400 text-sm fredoka"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="cantora-one-regular text-gray-400">No saved addresses. Add one below.</p>
                        )}
                    </div>

                    {/* Add New Address */}
                    {!showNewForm ? (
                        <button
                            onClick={() => setShowNewForm(true)}
                            className="fredoka text-[#06c167] hover:underline mb-6 block"
                        >
                            + Add New Address
                        </button>
                    ) : (
                        <motion.form
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mb-6 p-4 rounded-xl border border-[#333]"
                            onSubmit={handleAddAddress}
                        >
                            <p className="fredoka text-lg mb-3">New Address</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                    <label className="cantora-one-regular text-sm text-gray-400">Label</label>
                                    <select
                                        value={newAddress.label}
                                        onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                                        className="w-full rounded-lg back p-2 fredoka"
                                    >
                                        <option value="Home">Home</option>
                                        <option value="Work">Work</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="cantora-one-regular text-sm text-gray-400">Phone</label>
                                    <input
                                        type="tel"
                                        value={newAddress.phone}
                                        onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                                        className="w-full rounded-lg back p-2 fredoka"
                                        placeholder="10-digit phone"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="cantora-one-regular text-sm text-gray-400">Street Address</label>
                                    <input
                                        type="text"
                                        value={newAddress.street}
                                        onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                                        className="w-full rounded-lg back p-2 fredoka"
                                        placeholder="House no, Street, Landmark"
                                    />
                                </div>
                                <div>
                                    <label className="cantora-one-regular text-sm text-gray-400">City</label>
                                    <input
                                        type="text"
                                        value={newAddress.city}
                                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                        className="w-full rounded-lg back p-2 fredoka"
                                        placeholder="City"
                                    />
                                </div>
                                <div>
                                    <label className="cantora-one-regular text-sm text-gray-400">State</label>
                                    <input
                                        type="text"
                                        value={newAddress.state}
                                        onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                                        className="w-full rounded-lg back p-2 fredoka"
                                        placeholder="State"
                                    />
                                </div>
                                <div>
                                    <label className="cantora-one-regular text-sm text-gray-400">Pincode</label>
                                    <input
                                        type="text"
                                        value={newAddress.pincode}
                                        onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                                        className="w-full rounded-lg back p-2 fredoka"
                                        placeholder="6-digit pincode"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3 mt-4">
                                <button type="submit" className="bg p-2 px-6 fredoka">Save Address</button>
                                <button type="button" onClick={() => setShowNewForm(false)} className="fredoka text-gray-400 hover:text-white">Cancel</button>
                            </div>
                        </motion.form>
                    )}

                    {/* Order Summary */}
                    <div className="border-t border-[#333] pt-4 mb-4">
                        <p className="fredoka text-xl text-[#06c167]">Total: ${totalPrice}</p>
                    </div>

                    {/* Place Order Button */}
                    <button
                        onClick={handleCheckout}
                        disabled={loading || addresses.length === 0}
                        className="w-full bg p-3 fredoka text-xl disabled:opacity-50 rounded-lg"
                    >
                        {loading ? "Placing Order..." : "Place Order"}
                    </button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
