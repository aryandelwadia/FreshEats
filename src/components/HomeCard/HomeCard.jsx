import './homecard.css'

export default function HomeCard({ img, heading, content }) {
    return <>
        <div className="bghc text-center w-full md:w-[45%] lg:w-1/3 rounded-2xl mb-6 md:mb-20"  >
            <img src={img} alt="" className="w-full rounded-t-2xl" />
            <div className='cantora-one-regular csgreen text-2xl md:text-4xl mt-5'>{heading}</div>
            <div className='px-5 pb-5 text-base md:text-xl'>{content}</div>
        </div>
    </>
}