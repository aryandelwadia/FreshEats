import Footer from "../../components/Footer/Footer"
import Info from "../../components/InfoSection/Info"
import Navbar from "../../components/Navbar/Navbar"

export default function HomePage({ loginState, setLoginState, setLoginCookie, cookies }){
    return <>
        <Navbar loginState={loginState} setLoginState={setLoginState} setLoginCookie={setLoginCookie} cookies={cookies} />
        <Info />
        <Footer />
    </>
}