import './info.css';

export default function Info(){
    return <>
        <div className="flex justify-between">
            <div className="ml-10 my-40 cantora-one-regular m-5">
                <div className=' font-bold text-5xl'>
                    We Believe In Purity,<br></br><br></br>
                    We Believe in Nature
                </div>
                <br />
                <div className=' w-1/2 text-xl average-sans-regular '>
                Apples. Oranges. Limes. Lemons. Guavas. Carrots. Cucumbers. Jicamas. Cauliflowers. Brussels sprouts. Shallots. Japanese eggplants. Asparagus. Artichokes—Jerusalem artichokes, too. Radishes. Broccoli. Baby broccoli. Broccolini. Bok choy. Scallions. Ginger. Cherries. Raspberries. Cilantro. Parsley. Dill. 
                </div>
            </div>
            <img src="src/assets/Union.png" alt="" className='w-1/3 '/>
        </div>
        <br />
        
    </>
}