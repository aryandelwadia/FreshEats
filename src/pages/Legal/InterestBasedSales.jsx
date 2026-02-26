import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { motion } from "framer-motion";

export default function InterestBasedSales({ userLoginState, setUserLoginState }) {

    document.title = "Interest-Based Sales | FreshEats";

    return <>
        <Navbar userLoginState={userLoginState} setUserLoginState={setUserLoginState} />
        <div className="px-6 md:px-20 lg:px-40 py-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="text-3xl md:text-5xl cantora-one-regular mb-8 text-[#06c167]">Interest-Based Sales</h1>
                <p className="text-sm text-gray-400 mb-8 fredoka">Last Updated: February 26, 2026</p>

                <div className="bghc rounded-xl p-6 md:p-10 mb-8">
                    <h2 className="text-xl md:text-2xl fredoka text-[#06c167] mb-4">What Are Interest-Based Ads?</h2>
                    <p className="cantora-one-regular text-gray-300 leading-relaxed">
                        Interest-based advertising, also known as personalized or targeted advertising, uses information collected about your browsing activity, purchase history, and preferences to display advertisements and product recommendations that are more relevant to you. This helps us show you fresh produce, seasonal items, and deals that match your interests.
                    </p>
                </div>

                <div className="bghc rounded-xl p-6 md:p-10 mb-8">
                    <h2 className="text-xl md:text-2xl fredoka text-[#06c167] mb-4">How Does FreshEats Use Interest-Based Information?</h2>
                    <p className="cantora-one-regular text-gray-300 leading-relaxed mb-4">
                        We use interest-based information to enhance your shopping experience in several ways:
                    </p>
                    <ul className="list-disc list-inside cantora-one-regular text-gray-300 space-y-2">
                        <li><strong>Personalized Recommendations:</strong> Suggesting fruits, vegetables, and products based on your browsing and purchase history.</li>
                        <li><strong>Seasonal Promotions:</strong> Highlighting deals on seasonal items you're likely to enjoy.</li>
                        <li><strong>Relevant Notifications:</strong> Sending you alerts about restocks, price drops, and new arrivals for products you've shown interest in.</li>
                        <li><strong>Seller Promotions:</strong> Displaying offers from sellers whose products align with your preferences.</li>
                    </ul>
                </div>

                <div className="bghc rounded-xl p-6 md:p-10 mb-8">
                    <h2 className="text-xl md:text-2xl fredoka text-[#06c167] mb-4">Information We Collect for This Purpose</h2>
                    <ul className="list-disc list-inside cantora-one-regular text-gray-300 space-y-2">
                        <li>Products you browse, search for, or add to cart.</li>
                        <li>Your purchase history and frequently ordered items.</li>
                        <li>Categories and sellers you interact with most.</li>
                        <li>Your location to show locally available produce.</li>
                        <li>Time and frequency of your visits and purchases.</li>
                    </ul>
                </div>

                <div className="bghc rounded-xl p-6 md:p-10 mb-8">
                    <h2 className="text-xl md:text-2xl fredoka text-[#06c167] mb-4">Your Choices</h2>
                    <p className="cantora-one-regular text-gray-300 leading-relaxed mb-4">
                        You have control over interest-based advertising and personalized recommendations:
                    </p>
                    <ul className="list-disc list-inside cantora-one-regular text-gray-300 space-y-2">
                        <li><strong>Opt-Out:</strong> You can opt out of personalized recommendations in your account settings under "Privacy Preferences".</li>
                        <li><strong>Browser Controls:</strong> Use your browser's cookie settings to limit tracking. Note that this may affect your overall experience.</li>
                        <li><strong>Email Preferences:</strong> Manage which promotional emails you receive through the unsubscribe link or your account settings.</li>
                    </ul>
                </div>

                <div className="bghc rounded-xl p-6 md:p-10 mb-8">
                    <h2 className="text-xl md:text-2xl fredoka text-[#06c167] mb-4">Third-Party Advertising Partners</h2>
                    <p className="cantora-one-regular text-gray-300 leading-relaxed">
                        We may work with third-party advertising companies to display ads on other websites that may be relevant to your interests. These partners may use cookies and similar technologies to collect information. We do not share personally identifiable information with these partners. You can learn more about opting out of third-party advertising at <span className="text-[#06c167]">www.aboutads.info/choices</span>.
                    </p>
                </div>

                <div className="bghc rounded-xl p-6 md:p-10 mb-8">
                    <h2 className="text-xl md:text-2xl fredoka text-[#06c167] mb-4">Contact Us</h2>
                    <p className="cantora-one-regular text-gray-300 leading-relaxed">
                        If you have questions about interest-based advertising or wish to update your preferences, contact us at <span className="text-[#06c167]">ads@fresheats.com</span> or through the privacy settings in your FreshEats account.
                    </p>
                </div>
            </motion.div>
        </div>
        <Footer />
    </>
}
