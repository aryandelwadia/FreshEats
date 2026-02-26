import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { motion } from "framer-motion";

export default function PrivacyTerms({ userLoginState, setUserLoginState }) {

    document.title = "Privacy Policy | FreshEats";

    return <>
        <Navbar userLoginState={userLoginState} setUserLoginState={setUserLoginState} />
        <div className="px-6 md:px-20 lg:px-40 py-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="text-3xl md:text-5xl cantora-one-regular mb-8 text-[#06c167]">Privacy Policy</h1>
                <p className="text-sm text-gray-400 mb-8 fredoka">Last Updated: February 26, 2026</p>

                <div className="bghc rounded-xl p-6 md:p-10 mb-8">
                    <h2 className="text-xl md:text-2xl fredoka text-[#06c167] mb-4">1. Information We Collect</h2>
                    <p className="cantora-one-regular text-gray-300 leading-relaxed mb-4">
                        We collect information you provide directly to us when you create an account, place an order, or contact our customer service. This includes:
                    </p>
                    <ul className="list-disc list-inside cantora-one-regular text-gray-300 space-y-2">
                        <li><strong>Personal Information:</strong> Name, email address, phone number, and delivery address.</li>
                        <li><strong>Payment Information:</strong> Credit/debit card details and billing address (processed securely by our payment partners).</li>
                        <li><strong>Account Data:</strong> Username, password, order history, and preferences.</li>
                        <li><strong>Device Information:</strong> IP address, browser type, operating system, and device identifiers.</li>
                    </ul>
                </div>

                <div className="bghc rounded-xl p-6 md:p-10 mb-8">
                    <h2 className="text-xl md:text-2xl fredoka text-[#06c167] mb-4">2. How We Use Your Information</h2>
                    <ul className="list-disc list-inside cantora-one-regular text-gray-300 space-y-2">
                        <li>To process and deliver your orders efficiently.</li>
                        <li>To communicate with you about your orders, account, and promotional offers.</li>
                        <li>To personalize your shopping experience and recommend products.</li>
                        <li>To improve our platform, services, and customer support.</li>
                        <li>To detect, prevent, and address fraud or technical issues.</li>
                        <li>To comply with legal obligations and enforce our terms.</li>
                    </ul>
                </div>

                <div className="bghc rounded-xl p-6 md:p-10 mb-8">
                    <h2 className="text-xl md:text-2xl fredoka text-[#06c167] mb-4">3. Information Sharing</h2>
                    <p className="cantora-one-regular text-gray-300 leading-relaxed mb-4">
                        We do not sell your personal information to third parties. We may share your information with:
                    </p>
                    <ul className="list-disc list-inside cantora-one-regular text-gray-300 space-y-2">
                        <li><strong>Service Providers:</strong> Delivery partners, payment processors, and cloud hosting providers who assist in our operations.</li>
                        <li><strong>Sellers:</strong> When you purchase from a third-party seller on our platform, we share necessary order details.</li>
                        <li><strong>Legal Authorities:</strong> When required by law, court order, or government regulation.</li>
                    </ul>
                </div>

                <div className="bghc rounded-xl p-6 md:p-10 mb-8">
                    <h2 className="text-xl md:text-2xl fredoka text-[#06c167] mb-4">4. Cookies &amp; Tracking</h2>
                    <p className="cantora-one-regular text-gray-300 leading-relaxed">
                        We use cookies and similar technologies to enhance your experience, remember your preferences, and analyze site traffic. You can manage cookie preferences through your browser settings. Essential cookies required for account login and cart functionality cannot be disabled while using our services.
                    </p>
                </div>

                <div className="bghc rounded-xl p-6 md:p-10 mb-8">
                    <h2 className="text-xl md:text-2xl fredoka text-[#06c167] mb-4">5. Data Security</h2>
                    <p className="cantora-one-regular text-gray-300 leading-relaxed">
                        We implement industry-standard security measures including SSL encryption, secure payment processing, and regular security audits to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                    </p>
                </div>

                <div className="bghc rounded-xl p-6 md:p-10 mb-8">
                    <h2 className="text-xl md:text-2xl fredoka text-[#06c167] mb-4">6. Your Rights</h2>
                    <ul className="list-disc list-inside cantora-one-regular text-gray-300 space-y-2">
                        <li>Access, update, or delete your personal information at any time through your account settings.</li>
                        <li>Opt out of promotional emails by clicking the unsubscribe link.</li>
                        <li>Request a copy of all data we hold about you.</li>
                        <li>Lodge a complaint with the relevant data protection authority.</li>
                    </ul>
                </div>

                <div className="bghc rounded-xl p-6 md:p-10 mb-8">
                    <h2 className="text-xl md:text-2xl fredoka text-[#06c167] mb-4">7. Contact Us</h2>
                    <p className="cantora-one-regular text-gray-300 leading-relaxed">
                        For any privacy-related questions or concerns, reach out to our Data Protection Officer at <span className="text-[#06c167]">privacy@fresheats.com</span> or write to us at FreshEats Privacy Team, Mumbai, India.
                    </p>
                </div>
            </motion.div>
        </div>
        <Footer />
    </>
}
