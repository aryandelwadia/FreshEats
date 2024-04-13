import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Items from "./Items";

export default function ShoppingPage({ loginState, setLoginState }){
    
    document.title='Shop Now From The Widest Range Of Freshly Handpicked Fruits And Veggies All Over From India';

    return <>
        <Navbar loginState={loginState} setLoginState={setLoginState}/>
        <p className="text-center text-7xl cantora-one-regular ">Shop Now </p>
        <hr className="w-4/5 m-auto my-10"/>
        <div className="flex justify-center align-middle mb-10 flex-wrap">
            <Items />
            <Items />
            <Items />
            <Items />
            <Items />
            <Items />
            <Items />
            <Items />
        </div>
        <Footer />
    </>
}