import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { motion } from "framer-motion";

export default function ConditionsOfUse({ userLoginState, setUserLoginState }) {

    document.title = "Conditions of Use & Sale | FreshEats";

    return <>
        <Navbar userLoginState={userLoginState} setUserLoginState={setUserLoginState} />
        <div className="px-6 md:px-20 lg:px-40 py-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="text-3xl md:text-5xl cantora-one-regular mb-8 text-[#06c167]">Conditions of Use &amp; Sale</h1>
                <p className="text-sm text-gray-400 mb-8 fredoka">Last Updated: February 26, 2026</p>

                <div className="bghc rounded-xl p-6 md:p-10 mb-8">
                    <h2 className="text-xl md:text-2xl fredoka text-[#06c167] mb-4">1. Welcome to FreshEats</h2>
                    <p className="cantora-one-regular text-gray-300 leading-relaxed">
                        FreshEats provides its services to you subject to the conditions outlined on this page. By visiting or shopping at FreshEats, you accept these conditions. Please read them carefully. We offer a wide range of fresh fruits, vegetables, and grocery products for purchase through our platform.
                    </p>
                </div>

                <div className="bghc rounded-xl p-6 md:p-10 mb-8">
                    <h2 className="text-xl md:text-2xl fredoka text-[#06c167] mb-4">2. Use of the Platform</h2>
                    <p className="cantora-one-regular text-gray-300 leading-relaxed mb-4">
                        You may use our platform for lawful purposes only. You agree not to use our services for any illegal or unauthorized purpose. You must not, in the use of the service, violate any laws in your jurisdiction.
                    </p>
                    <ul className="list-disc list-inside cantora-one-regular text-gray-300 space-y-2">
                        <li>You must be at least 18 years old to make purchases.</li>
                        <li>You are responsible for maintaining the confidentiality of your account.</li>
                        <li>You agree to provide accurate and complete registration information.</li>
                        <li>You may not use another person's account without permission.</li>
                    </ul>
                </div>

                <div className="bghc rounded-xl p-6 md:p-10 mb-8">
                    <h2 className="text-xl md:text-2xl fredoka text-[#06c167] mb-4">3. Product Descriptions &amp; Pricing</h2>
                    <p className="cantora-one-regular text-gray-300 leading-relaxed">
                        We strive to be as accurate as possible in our product descriptions, images, and pricing. However, we do not warrant that product descriptions, images, or other content on the site are accurate, complete, reliable, current, or error-free. Prices for our products are subject to change without notice. We reserve the right to modify or discontinue any product at any time.
                    </p>
                </div>

                <div className="bghc rounded-xl p-6 md:p-10 mb-8">
                    <h2 className="text-xl md:text-2xl fredoka text-[#06c167] mb-4">4. Orders &amp; Payment</h2>
                    <p className="cantora-one-regular text-gray-300 leading-relaxed mb-4">
                        When you place an order, you are offering to purchase a product subject to the following conditions:
                    </p>
                    <ul className="list-disc list-inside cantora-one-regular text-gray-300 space-y-2">
                        <li>All orders are subject to availability and confirmation of the order price.</li>
                        <li>We accept major credit cards, debit cards, and UPI payments.</li>
                        <li>Delivery times are estimates and are not guaranteed.</li>
                        <li>Risk of loss and title for items pass to you upon delivery.</li>
                    </ul>
                </div>

                <div className="bghc rounded-xl p-6 md:p-10 mb-8">
                    <h2 className="text-xl md:text-2xl fredoka text-[#06c167] mb-4">5. Returns &amp; Refund Policy</h2>
                    <p className="cantora-one-regular text-gray-300 leading-relaxed">
                        Due to the perishable nature of our products, we handle returns on a case-by-case basis. If you receive damaged or spoiled items, please contact our support team within 24 hours of delivery with photographic evidence. Refunds, when applicable, will be processed to the original payment method within 5-7 business days.
                    </p>
                </div>

                <div className="bghc rounded-xl p-6 md:p-10 mb-8">
                    <h2 className="text-xl md:text-2xl fredoka text-[#06c167] mb-4">6. Limitation of Liability</h2>
                    <p className="cantora-one-regular text-gray-300 leading-relaxed">
                        FreshEats shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your access to, or use of, our services. Our total liability to you for all claims arising from use of the service shall not exceed the amount paid by you for the product giving rise to such claim.
                    </p>
                </div>

                <div className="bghc rounded-xl p-6 md:p-10 mb-8">
                    <h2 className="text-xl md:text-2xl fredoka text-[#06c167] mb-4">7. Contact Us</h2>
                    <p className="cantora-one-regular text-gray-300 leading-relaxed">
                        If you have any questions about these Conditions of Use &amp; Sale, please contact us at <span className="text-[#06c167]">support@fresheats.com</span> or call our customer service line at <span className="text-[#06c167]">+91 1800-XXX-XXXX</span>.
                    </p>
                </div>
            </motion.div>
        </div>
        <Footer />
    </>
}
