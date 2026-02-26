import { useRef } from 'react';
import HomeCard from '../HomeCard/HomeCard';
import './info.css';
import { motion, useScroll, useTransform } from 'framer-motion';
import UnionImg from '../../assets/Union.png';
import StrawberryImg from '../../assets/Strawberry.png';
import WomenImg from '../../assets/Women.png';
import BulkImg from '../../assets/bulk.png';
import Img1 from '../../assets/homePage/1.jpg';
import Img2 from '../../assets/homePage/2.jpg';
import Img3 from '../../assets/homePage/3.jpg';
import Img4 from '../../assets/homePage/4.jpg';
import Img5 from '../../assets/homePage/5.jpg';
import Img6 from '../../assets/homePage/6.jpg';

export default function Info() {

    const targetref = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetref, });
    const x = useTransform(scrollYProgress, [0, 1], ["10%", "-95%"]);

    return <>
        <motion.div className="flex justify-between" initial={{ opacity: 0, translateX: -100, scale: 0.9 }} whileInView={{ opacity: 1, translateX: 0, scale: 1 }} transition={{ duration: 0.5 }} >
            <div className="ml-40 my-40 cantora-one-regular">
                <div className=' font-bold text-5xl w-1/2 ' >
                    We Believe In Purity,<br></br><br></br>
                    We Believe in Nature
                </div>
                <br />
                <div className=' w-1/2 text-xl average-sans-regular  ' >
                    Apples. Oranges. Limes. Lemons. Guavas. Carrots. Cucumbers. Jicamas. Cauliflowers. Brussels sprouts. Shallots. Japanese eggplants. Asparagus. Artichokes—Jerusalem artichokes, too. Radishes. Broccoli. Baby broccoli. Broccolini. Bok choy. Scallions. Ginger. Cherries. Raspberries. Cilantro. Parsley. Dill.
                </div>
            </div>
            <img src={UnionImg} alt="" className='w-1/3 h-3/5 ' />
        </motion.div>
        <br></br>
        <br></br>
        <motion.div initial={{ opacity: 0, translateX: -100, scale: 0.9 }} whileInView={{ opacity: 1, translateX: 0, scale: 1 }} transition={{ duration: 0.5 }} className=" flex justify-between" >
            <img src={StrawberryImg} alt="" className='w-1/3 h-1/3 ' />
            <div className="my-40 cantora-one-regular text-right" >
                <div className=' font-bold text-5xl mr-40 '>
                    An Apple A Day,<br></br><br></br>
                    Keeps Doctor Away
                </div>
                <br />
                <div className='  text-xl average-sans-regular text-right mr-40 ml-96 ' >
                    Discover the vibrant world of fresh fruits and vegetables, rich in essential vitamins, minerals, and antioxidants. Embrace their disease-fighting properties, fiber-rich goodness, and hydrating benefits for optimal health and vitality. With endless flavors and environmental benefits, make fresh produce a delicious cornerstone of your daily diet.
                </div>
            </div>
        </motion.div>
        <br />
        <br />
        <br />
        <br />

        <motion.div initial={{ opacity: 0, translateX: -100, scale: 0.9 }} whileInView={{ opacity: 1, translateX: 0, scale: 1 }} transition={{ duration: 0.5 }} className='flex justify-evenly  homecards mb-10'>
            <HomeCard img={WomenImg} heading="Trusted By 4Lac People" content="Welcome to our trusted marketplace for fresh, quality produce! Explore our selection of vibrant fruits and vegetables, handpicked for families seeking wholesome goodness." />
            <HomeCard img={BulkImg} heading="Bulk Orders Accepted" content="Bulk orders welcomed! Stock up on fresh produce with ease. Contact us today to inquire about special pricing and arrangements." />
        </motion.div>

        <motion.div style={{ x }} initial={{ opacity: 0, translateX: -100, scale: 0.9 }} whileInView={{ opacity: 1, translateX: 0, scale: 1 }} transition={{ duration: 0.5 }} className=' relative h-[300vh] bg-black ' ref={targetref}>
            <div className=' h-screen sticky top-0 flex items-center overflow-hidden'>
                <div className='flex' >

                    <motion.img whileHover={{ scale: 0.9 }} src={Img1} alt="" className='w-[300px] h-[500px] relative top-5 right-5 rounded-lg' />
                    <motion.img whileHover={{ scale: 0.9 }} src={Img2} alt="" className='w-[300px] h-[500px] relative bottom-20 left-5 rounded-lg' />
                    <motion.img whileHover={{ scale: 0.9 }} src={Img3} alt="" className='w-[300px] h-[500px] relative top-40 left-10 rounded-lg' />
                    <motion.img whileHover={{ scale: 0.9 }} src={Img4} alt="" className='w-[300px] h-[500px] relative left-20 bottom-44 rounded-lg' />
                    <motion.img whileHover={{ scale: 0.9 }} src={Img5} alt="" className='w-[300px] h-[500px] relative top-48 left-28 rounded-lg' />
                    <motion.img whileHover={{ scale: 0.9 }} src={Img6} alt="" className='w-[300px] h-[500px] relative left-32 rounded-lg' />
                </div>
            </div>
        </motion.div>
    </>
}