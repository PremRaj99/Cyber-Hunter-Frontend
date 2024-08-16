import React from "react";
import { Carousel } from "flowbite-react";
import banner1 from "../assets/banner1.png";

const Home = () => {
  return (
    <div className="bg-black h-[calc(100vh-64px)]">
      <div className="px-4 lg:px-16 max-w-screen-2xl mx-auto h-full">
        <Carousel className="w-full mx-auto ">
          <div className="w-3/4  flex flex-col-reverse md:flex-row rounded-2xl items-center justify-between gap-12 bg-transparent border">
            {/* hero text */}
            <div className="w-full md:w-1/2 mx-2 p-2 py-10 relative">
              <h1 className=" text-5xl  md:text-7xl font-semibold md:mx-5 text-white relative z-10 transition-all duration-300">
                Welcome! to <span className="text-brandPrimary">CYBER</span>{" "}
                <span className="text-black drop-shadow-[0_0px_5px_rgba(255,255,255,0.25)]">HUNTER</span>
              </h1>
                <div className="bg-brandPrimary w-72 h-72 rounded-full blur-3xl opacity-45 absolute bottom-1/2 left-20"></div>
              <p className=" text-gray-400 text-sm font- mb-2 md:my-2 md:mx-5 transition-all duration-700">
                Unleash your team's potential with Cyber Hunter! Manage
                projects, collaborate seamlessly, and rise through the ranks.
                With our unique points system and dual leaderboards, college
                teams and individuals compete, grow, and lead the way to
                success.
              </p>
              <button className="btn-primary">Register Now</button>
            </div>
            {/* image */}
            <div className="w-1/2">
              <img
                src={banner1}
                alt=""
                className="w-full h-full object-cover hover:-translate-y-3 transition-all duration-700"
              />
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Home;
