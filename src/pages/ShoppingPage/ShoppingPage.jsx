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

    async function fetchItems(pageNum) {
        setLoading(true);
        try {
            // Fetch 8 items at a time to perfectly fill 2 rows of the 4-column grid
            let response = await axios.get(`http://localhost:3000/item/getitem?page=${pageNum}&limit=8`, { withCredentials: true });

            if (pageNum === 1) {
                setItemsdata(response.data.items);
            } else {
                setItemsdata(prev => [...prev, ...response.data.items]);
            }
            setTotalPages(response.data.totalPages);
        }
        catch (err) {
            toast.error("Failed to load items");
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchItems(1);
    }, [])

    function loadMore() {
        if (page < totalPages) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchItems(nextPage);
        }
    }

    return <>
        <Navbar userLoginState={userLoginState} setUserLoginState={setUserLoginState} />
        <p className="text-center text-4xl md:text-7xl cantora-one-regular mt-8">Shop Now </p>
        <hr className="w-4/5 m-auto my-10" style={{ borderColor: 'rgba(6,193,103,0.3)' }} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 px-4 md:px-10">
            {itemsdata.length > 0 ? (
                itemsdata.map(item => (
                    <Items key={item._id} name={item.itemname} price={item.itemprice} place={item.prodplace} img={item.img} userLoginState={userLoginState} handleAddToCart={() => handleAddToCart(item)} />
                ))
            ) : (
                !loading && <p className="text-center text-gray-500 col-span-full py-10">No items available at the moment.</p>
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