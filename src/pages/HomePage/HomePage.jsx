import Footer from "../../components/Footer/Footer"
import Info from "../../components/InfoSection/Info"
import Navbar from "../../components/Navbar/Navbar"
import { motion } from "framer-motion"

export default function HomePage({ loginState, setLoginState, checkUserLogin}){
    return <>
        <Navbar loginState={loginState} setLoginState={setLoginState} checkUserLogin={checkUserLogin} />
        <Info />
        <Footer />
    </>
};