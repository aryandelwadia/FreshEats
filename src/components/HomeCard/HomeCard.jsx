import './homecard.css'

export default function HomeCard({ img, heading, content }){
    return <>
    <div className="bghc text-center w-1/3 rounded-2xl mb-20"  >
        <img src={img} alt="" className=""/>
        <div className='cantora-one-regular csgreen text-4xl mt-5'>{heading}</div>
        <div className='px-5 pb-5 text-xl'>{content}</div>
    </div>
    </>
}