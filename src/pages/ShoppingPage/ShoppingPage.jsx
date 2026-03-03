import axios from "axios";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Items from "./Items";
import { useEffect, useState } from "react";
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";

export default function ShoppingPage({ userLoginState, setUserLoginState }) {

    document.title = 'Shop Now From The Widest Range Of Freshly Handpicked Fruits And Veggies All Over From India';
    const navigate = useNavigate();

    const [itemsdata, setItemsdata] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [sort, setSort] = useState('newest');

    async function handleAddToCart(item) {
        if (userLoginState) {
            try {
                let response = await axios.post('http://localhost:3000/cart/addItem', item, { withCredentials: true });
                if (response.status === 200) {
                    toast.success("Item Added to Cart Successfully");
                }
                else {
                    toast.error("Error Occurred");
                }
            }
            catch (err) {
                toast.error("Failed to add item to cart");
            }
        }
        else {
            toast.error("Login First");
            navigate("/login");
        }
    }

    async function fetchItems(pageNum, reset = false) {
        setLoading(true);
        try {
            let limit = 8;
            let query = `?page=${pageNum}&limit=${limit}&search=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}&sort=${sort}`;
            let response = await axios.get(`http://localhost:3000/item/getitem${query}`, { withCredentials: true });

            if (reset || pageNum === 1) {
                setItemsdata(response.data.items);
            } else {
                setItemsdata(prev => [...prev, ...response.data.items]);
            }
            setTotalPages(response.data.totalPages);
            setPage(pageNum);
        }
        catch (err) {
            toast.error("Failed to load items");
        }
        setLoading(false);
    }

    // Refetch items when filters change
    useEffect(() => {
        // debounce search slightly
        const timeoutId = setTimeout(() => {
            fetchItems(1, true);
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [search, category, sort]);

    function loadMore() {
        if (page < totalPages) {
            fetchItems(page + 1);
        }
    }

    return <>
        <Navbar userLoginState={userLoginState} setUserLoginState={setUserLoginState} />

        <div className="bg-black text-white pt-8 pb-4 sticky top-0 z-30 shadow-2xl" style={{ borderBottom: '1px solid rgba(6,193,103,0.2)' }}>
            <p className="text-center text-4xl md:text-5xl cantora-one-regular mb-6 text-[#06c167]">Fresh Market</p>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col xl:flex-row gap-4 items-center justify-between">
                    {/* Search Bar */}
                    <div className="w-full xl:w-2/5 relative">
                        <span className="absolute left-3 top-2.5 text-xl">🔍</span>
                        <input
                            type="text"
                            placeholder="Search fruits, veggies..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl cantora-one-regular text-lg outline-none focus:ring-2 focus:ring-[#06c167] transition-all bg-gray-900 border border-gray-800"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
                        {/* Category Filter */}
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full sm:w-auto px-4 py-3 rounded-xl cantora-one-regular text-sm md:text-base outline-none cursor-pointer bg-gray-900 border border-gray-800 focus:ring-2 focus:ring-[#06c167]"
                        >
                            <option value="All">All Categories</option>
                            <option value="Fruits">Fruits 🍎</option>
                            <option value="Vegetables">Vegetables 🥕</option>
                            <option value="Leafy Greens">Leafy Greens 🥬</option>
                            <option value="Root Vegetables">Root Veggies 🥔</option>
                            <option value="Organic">Organic 🌱</option>
                            <option value="Other">Other 🛒</option>
                        </select>

                        {/* Sort Filter */}
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="w-full sm:w-auto px-4 py-3 rounded-xl cantora-one-regular text-sm md:text-base outline-none cursor-pointer bg-gray-900 border border-gray-800 focus:ring-2 focus:ring-[#06c167]"
                        >
                            <option value="newest">Newest Arrivals 🌟</option>
                            <option value="priceLowToHigh">Price: Low to High 📉</option>
                            <option value="priceHighToLow">Price: High to Low 📈</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 px-4 md:px-10 mt-8">
            {itemsdata.length > 0 ? (
                itemsdata.map(item => (
                    <Items key={item._id} name={item.itemname} price={item.itemprice} place={item.prodplace} img={item.img} userLoginState={userLoginState} handleAddToCart={() => handleAddToCart(item)} />
                ))
            ) : (
                !loading && <p className="text-center text-gray-500 col-span-full py-10 text-xl cantora-one-regular">No items found matching your filters 🥬</p>
            )}
        </div>

        {/* Load More Button */}
        {page < totalPages && (
            <div className="flex justify-center mb-16">
                <button
                    onClick={loadMore}
                    disabled={loading}
                    className="px-8 py-3 rounded-full text-white text-xl fredoka shadow-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                    style={{ background: 'linear-gradient(135deg, #06c167, #04a054)' }}
                >
                    {loading ? 'Crunching...' : 'Load More Produce 🥬'}
                </button>
            </div>
        )}

        <Footer />
    </>
}