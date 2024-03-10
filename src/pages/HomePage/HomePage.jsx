import Footer from "../../components/Footer/Footer"
import Info from "../../components/InfoSection/Info"
import Navbar from "../../components/Navbar/Navbar"

export default function HomePage({ loginState, setLoginState }){
    return <>
        <Navbar loginState={loginState} setLoginState={setLoginState} />
        <Info />
        <Footer />
    </>
}