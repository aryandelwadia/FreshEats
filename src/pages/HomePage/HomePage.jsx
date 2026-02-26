import Footer from "../../components/Footer/Footer"
import Info from "../../components/InfoSection/Info"
import Navbar from "../../components/Navbar/Navbar"

export default function HomePage({ userLoginState, setUserLoginState }) {

    document.title = "Welcome To Fresh Eats, India's Biggest Freshly Handpicked Fruits And Veggies Provider.";

    return <>
        <Navbar userLoginState={userLoginState} setUserLoginState={setUserLoginState} />
        <Info />
        <Footer />
    </>
};