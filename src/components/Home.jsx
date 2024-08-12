import React from 'react'
import { Carousel } from 'flowbite-react'
import banner1 from '../assets/banner1.png'

const Home = () => {
    return (
        <div className='bg-black '>
            <div className='circlePosition w-[100px] h-[100px] md:w-[100px] md:h-[150px] bg-brandPrimary rounded-[100%] absolute z-1 top-[4%]  md:left-[20%] left-[68%] translate-x-[-50%] translate-y-[-50%] blur-[40px] md:blur-[55px] transition-all duration-300'></div>
            <div className='circlePosition w-[250px] h-[250px] md:w-[250px] md:h-[200px] bg-brandPrimary rounded-[100%] absolute z-1 top-[40%] md:top-[52%] left-[20%] md:left-[30%] translate-x-[-50%] translate-y-[-50%] blur-[50px] md:blur-[90px] transition-all duration-300'></div>
            <div className='px-4 lg:px-16 max-w-screen-2xl mx-auto min-h-screen h-screen '>
                <Carousel className='w-full mx-auto ' >

                    <div className="w-3/4 md:my-16  flex flex-col md:flex-row rounded-2xl items-center justify-between gap-12 bg-transparent border">
                        {/* hero text */}
                        <div className="w-full md:w-1/2 mx-2 px-2 ">
                            <h1 className=' text-5xl  md:text-7xl font-semibold md:mx-5 text-white  transition-all duration-300'>Welcome! to <span className='text-brandPrimary'>CYBER</span> <span className='text-black'>HUNTER</span></h1>
                            <p className=' text-whiteText text-base font- mb-2 md:my-2 md:mx-5 transition-all duration-700'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim, facere sint. Quia nostrum repellendus in perferendis ad? Commodi dolorum at, ut aspernatur voluptatum, fuga, nisi totam pariatur excepturi magnam laborum?</p>
                            <button className='btn-primary'>Register Now</button>
                        </div>
                        {/* image */}
                        <div className='w-1/2'>
                            <img src={banner1} alt="" className="w-full h-full object-cover hover:-translate-y-3 transition-all duration-700" />
                        </div>
                    </div>

                </Carousel>
            </div>
        </div>
    )
}

export default Home
