// import React from "react";
// import banner2 from "../assets/bannerCarousel1.png";
import banner3 from "../../assets/bannerCarousel2.gif";
import banner4 from "../../assets/bannerCarousel3.gif";
import { Carousel } from "flowbite-react";

export default function Hero() {
  return (
    <div>
      <div className=" lg:px-16 max-w-screen-2xl mx-auto h-[700px] md:h-screen overflow-hidden">
        <Carousel className="w-full my-auto mb-[80px]">
          {/* -------------------------------Carousel one */}
          <div className="w-3/4  flex flex-col-reverse md:flex-row rounded-2xl md:mb-4 items-center  md:gap-12 bg-transparent border">
            {/* hero text */}
            <div className="w-full md:w-1/2 mx-2 p-2 relative">
              <h1 className=" text-3xl p-4 md:text-7xl font-semibold md:mx-5 text-white relative z-10 transition-all duration-300">
                Welcome! to <span className="text-brandPrimary">CYBER</span>{" "}
                <span className="text-black drop-shadow-[0px_0px_5px_#00D8FF]  ">
                  HUNTER
                </span>
              </h1>
              <div className="bg-brandPrimary w-72 h-72 rounded-full blur-3xl opacity-45 absolute bottom-1/2 left-20"></div>
              <p className=" text-gray-400 text-sm p-4 font- mb-2 md:my-2 md:mx-5 transition-all duration-700">
                Unleash your team&#39;s potential with Cyber Hunter! Manage
                projects, collaborate seamlessly, and rise through the ranks.
                With our unique points system and dual leaderboards, college
                teams and individuals compete, grow, and lead the way to
                success.
              </p>
              <div className="w-full flex justify-center md:w-1/2">
                <button className="btn-primary font-bold hover:bg-black hover:text-brandPrimary hover:border-2 hover:border-brandPrimary text-black transition-all duration-300">
                  Register Now
                </button>
              </div>
            </div>
            {/* image */}
            <div className="w-1/2 z-10 overflow-hidden">
              <img
                src={banner3}
                alt=""
                className="w-full h-3/4 md:h-full object-cover hover:-translate-y-3 transition-all duration-700"
              />
            </div>
          </div>
          {/* -------------------------------Carousel one End  */}

          {/* --------------------------------Carousel COntainer Three  */}
          <div className="w-3/4  flex flex-col-reverse md:flex-row rounded-2xl items-center  md:gap-12 bg-transparent border">
            {/* hero text */}
            <div className="w-full md:w-1/2 mx-2 p-2 relative">
              <h1 className=" text-3xl p-4 md:text-7xl font-semibold md:mx-5 text-white relative z-10 transition-all duration-300">
                Learn with <span className="text-brandPrimary">CYBER</span>{" "}
                <span className="text-black drop-shadow-[0px_0px_5px_#00D8FF]">
                  HUNTER
                </span>
              </h1>
              <div className="bg-brandPrimary w-72 h-72 rounded-full blur-3xl opacity-45 absolute bottom-1/2 left-20"></div>
              <p className=" text-gray-400 text-sm p-4 font- mb-2 md:my-2 md:mx-5 transition-all duration-700">
                Cyberhunter is a platform by the Cyberhunter Club to empower
                tech enthusiasts with hands-on learning in cybersecurity,
                blockchain, Web3, and the MERN stack through workshops,
                tutorials, and real-world projects.
              </p>
              <div className="w-full flex justify-center md:w-1/2">
                <button className="btn-primary font-bold hover:bg-black hover:text-brandPrimary hover:border-2 hover:border-brandPrimary text-black transition-all duration-300">
                  Register Now
                </button>
              </div>
            </div>
            {/* image */}
            <div className="w-1/2 z-10 overflow-hidden">
              <img
                src={banner4}
                alt=""
                className="w-[450px] h-3/4 md:h-full z-10 object-cover hover:-translate-y-3 transition-all duration-700"
              />
            </div>
          </div>
          {/* ------------------------------Carousel COntainer Three End  */}
        </Carousel>
      </div>
    </div>
  );
}
