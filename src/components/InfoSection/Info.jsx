import HomeCard from '../HomeCard/HomeCard';
import './info.css';

export default function Info(){
    return <>
        <div className="flex justify-between">
            <div className="ml-40 my-40 cantora-one-regular">
                <div className=' font-bold text-5xl w-1/2'>
                    We Believe In Purity,<br></br><br></br>
                    We Believe in Nature
                </div>
                <br />
                <div className=' w-1/2 text-xl average-sans-regular '>
                Apples. Oranges. Limes. Lemons. Guavas. Carrots. Cucumbers. Jicamas. Cauliflowers. Brussels sprouts. Shallots. Japanese eggplants. Asparagus. Artichokes—Jerusalem artichokes, too. Radishes. Broccoli. Baby broccoli. Broccolini. Bok choy. Scallions. Ginger. Cherries. Raspberries. Cilantro. Parsley. Dill. 
                </div>
            </div>
            <img src="src/assets/Union.png" alt="" className='w-1/3 h-1/3 '/>
        </div>

        <div className=" flex justify-between">
            <img src="src/assets/Strawberry.png" alt="" className='w-1/3 h-1/3 '/>
            <div className="my-40 cantora-one-regular text-right">
                <div className=' font-bold text-5xl mr-40 '>
                    An Apple A Day,<br></br><br></br>
                    Keeps Doctor Away
                </div>
                <br />
                <div className='  text-xl average-sans-regular text-right mr-40 ml-96'>
                Discover the vibrant world of fresh fruits and vegetables, rich in essential vitamins, minerals, and antioxidants. Embrace their disease-fighting properties, fiber-rich goodness, and hydrating benefits for optimal health and vitality. With endless flavors and environmental benefits, make fresh produce a delicious cornerstone of your daily diet.
                </div>
            </div>
        </div>
        <br />

        <div className='flex justify-evenly'>
            <HomeCard img="src/assets/Women.png" heading="Trusted By 4Lac People" content="Welcome to our trusted marketplace for fresh, quality produce! Explore our selection of vibrant fruits and vegetables, handpicked for families seeking wholesome goodness." />
            <HomeCard img="src/assets/bulk.png" heading="Bulk Orders Accepted" content="Bulk orders welcomed! Stock up on fresh produce with ease. Contact us today to inquire about special pricing and arrangements." />
        </div>
        
    </>
}