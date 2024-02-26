import './homecard.css'

export default function HomeCard({ img, heading, content}){
    return <>
    <div className="bghc text-center rounded-none w-1/3 rounded-2xl">
        <img src={img} alt="" className=""/>
        <div className='cantora-one-regular csgreen text-2xl mt-5'>{heading}</div>
        <div className='px-5 pb-5'>{content}</div>
    </div>
    </>
}