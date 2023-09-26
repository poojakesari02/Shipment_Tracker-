


export default function Home() {
    return (
        
               <section
    className="bg-slate-950">

    <div className="w-10/12 max-w-[1080px] flex flex-row justify-between items-center mx-auto ">
        
        <div className="space-y-8">
            <h1 className="font-mullish font-bold text-[40px] text-white">Track your
orders easily..</h1>
            <div className="w-6 h-1 bg-white"></div>
            <p className="font-mullish text-[18px] leading-7 text-white opacity-70">
            Optimize your order
tracking experience ..
            </p>
           

            <button className="py-[14px] px-[18px] font-mullish rounded-md text-md font-bold bg-white  border transition-all duration-200 bg-cyan-500 hover:bg-cyan-600 flex">
            Sign Up Now
            <svg
              viewBox="0 0 24 24"
              focusable="false"
              className="w-[14px] h-[14px] ml-5"
            >
              <path
                fill="currentColor"
                d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
              ></path>
            </svg>
          </button>
        </div>
        
          <img src="/shipment1.png" alt="" 
        className="w-full max-w-[680px] float-right"/> 
    </div>

    
     <div className="w-[100%] absolute left-0 right-0">
        <img src="/hero-shape.svg" alt=""
        className="w-full object-fill"/>
    </div>

    </section>
    )
}