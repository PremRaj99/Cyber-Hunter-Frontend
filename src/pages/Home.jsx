import { Carousel } from "flowbite-react";
import aboutImg from "../../src/assets/aboutImg.png";
import banner2 from "../assets/bannerCarousel1.png";
// import banner3 from "../assets/bannerCarousel2.gif";
import banner4 from "../assets/bannerCarousel3.gif";
import { TbHeartRateMonitor } from "react-icons/tb";
import { FaCode } from "react-icons/fa6";
import {
  BsDatabaseFillCheck,
  BsCloudsFill,
  BsShieldLockFill,
} from "react-icons/bs";
import { IoLayers } from "react-icons/io5";

const Home = () => {
  return (
    <div className="bg-black m-0 p-0 w-dvw">
      <div className=" lg:px-16 max-w-screen-2xl mx-auto h-[700px] md:h-screen">
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
                src={banner2}
                alt=""
                className="w-full h-3/4 md:h-full object-cover hover:-translate-y-3 transition-all duration-700"
              />
            </div>
          </div>
          {/* -------------------------------Carousel one End  */}

          {/* --------------------------------Carousel COntainer Two  */}
          {/* <div className="w-3/4  flex flex-col-reverse md:flex-row rounded-2xl items-center  md:gap-12 bg-transparent border"> */}
          {/* hero text */}
          {/* <div className="w-full md:w-1/2 mx-2 p-2 relative">
              <h1 className=" text-3xl p-4 md:text-7xl font-semibold md:mx-5 text-white relative z-10 transition-all duration-300">
                Who We <span className="text-brandPrimary">CYBER </span>
                <span className="text-black drop-shadow-[0px_0px_5px_#00D8FF]">
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
                <button className="btn-primary text-black">Register Now</button>
              </div>
            </div> */}
          {/* image */}
          {/* <div className="w-1/2">
              <img
                src={banner3}
                alt=""
                className="w-full h-3/4 md:h-full object-cover hover:-translate-y-3 transition-all duration-700"
              />
            </div>
          </div> */}
          {/* ------------------------------Carousel COntainer Two End  */}

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
      <hr className="mt-11" />

      {/* ---------------------------------About Us */}
      <div>
        <div className="mt-10">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <span className="text-4xl font-extrabold text-brandPrimary text-500 text-center  md:m-4  border-b-2   border-brandPrimary">
              About Us
            </span>
          </div>
        </div>
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12">
          <div className="w-full lg:w-2/5 relative">
            <img
              src={aboutImg}
              alt="Team"
              className="relative z-10 rounded-xl shadow-lg w-full h-auto object-cover"
            />
          </div>
          <div className="w-full lg:w-3/5 space-y-6">
            <div className="border-b-4 border-brandPrimary  pb-3 ">
              <h3 className="text-2xl font-extrabold flex md:justify-center text-slate-300 text-500">
                Who We Are
              </h3>
            </div>
            <p className="text-white leading-relaxed p-4 text-lg">
              We are a dynamic team of innovators and problem-solvers, committed
              to pushing the boundaries of technology and design. Our approach
              combines creative thinking with technical expertise to deliver
              exceptional solutions that drive meaningful change.
            </p>
            <div className="grid md:grid-cols-3 px-10 gap-2">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-blue-500 mb-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <h3 className="font-semibold text-gray-800">Innovation</h3>
                <p className="text-sm text-gray-600">Cutting-edge solutions</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-green-500 mb-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="font-semibold text-gray-800">Quality</h3>
                <p className="text-sm text-gray-600">Exceptional standards</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-purple-500 mb-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <h3 className="font-semibold text-gray-800">Teamwork</h3>
                <p className="text-sm text-gray-600">Collaborative spirit</p>
              </div>
            </div>
            <div className="flex space-x-4  justify-center">
              <button className="px-6 py-2 bg-brandPrimary text-[#000] font-bold mb-4 rounded-full hover:bg-black hover:text-brandPrimary hover:border-brandPrimary hover:border-2 transition duration-300 flex items-center hover:animate-pulse">
                <span>Read More</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* ---------------------------------About Us Section End-------------------------------- */}

      <hr className="mt-11" />

      {/* -----------------------Service Section--------------------- */}
      <div className="service">
        <section className="py-12 px-16 sm:py-16 md:py-20 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <span className="text-4xl font-extrabold text-brandPrimary text-500 text-center  md:m-4  border-b-2   border-brandPrimary">
              Our Services
            </span>
            <div className="mt-8">
              <p className="text-sm sm:text-base text-white max-w-2xl mx-auto">
                Comprehensive digital solutions designed to transform your
                business through cutting-edge technology and innovative
                strategies.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* <!-- Web Design Service --> */}
            <div className="service-card bg-black border-brandPrimary border-4 rounded-xl p-5 sm:p-6 md:p-7 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-200 group">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-50 p-3 rounded-full mb-4 group-hover:animate-pulse">
                  {/* <i data-feather="monitor" className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500"></i> */}
                  <TbHeartRateMonitor className="w-8 h-8 sm:w-10 sm:h-10 text-black-500" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-brandPrimary mb-2">
                  Web Design
                </h3>
                <p className="text-xs sm:text-sm text-white">
                  Create stunning, responsive web designs that captivate and
                  engage your target audience.
                </p>
              </div>
            </div>

            {/* <!-- Web Development Service --> */}
            <div className="service-card bg-black border-4 border-brandPrimary rounded-xl p-5 sm:p-6 md:p-7 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-green-200 group">
              <div className="flex flex-col items-center text-center">
                <div className="bg-green-50 p-3 rounded-full mb-4 group-hover:animate-pulse">
                  {/* <i data-feather="code" className="w-8 h-8 sm:w-10 sm:h-10 text-green-500"></i> */}
                  <FaCode className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-brandPrimary mb-2">
                  Web Development
                </h3>
                <p className="text-xs sm:text-sm text-white">
                  Build robust, scalable web applications using modern
                  technologies and best practices.
                </p>
              </div>
            </div>

            {/* <!-- Database Management Service --> */}
            <div className="service-card bg-black border-4 border-brandPrimary rounded-xl p-5 sm:p-6 md:p-7 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-purple-200 group">
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-50 p-3 rounded-full mb-4 group-hover:animate-pulse">
                  {/* <i data-feather="database" className="w-8 h-8 sm:w-10 sm:h-10 text-purple-500"></i> */}
                  <BsDatabaseFillCheck className="w-8 h-8 sm:w-10 sm:h-10 text-purple-500" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-brandPrimary mb-2">
                  Database Management
                </h3>
                <p className="text-xs sm:text-sm text-white">
                  Optimize and manage database infrastructure for peak
                  performance and reliability.
                </p>
              </div>
            </div>

            {/* <!-- Cloud Solutions Service --> */}
            <div className="service-card bg-black border-4 border-brandPrimary rounded-xl p-5 sm:p-6 md:p-7 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-indigo-200 group">
              <div className="flex flex-col items-center text-center">
                <div className="bg-indigo-50 p-3 rounded-full mb-4 group-hover:animate-pulse">
                  {/* <i data-feather="cloud" className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-500"></i> */}
                  <BsCloudsFill className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-500" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-brandPrimary mb-2">
                  Cloud Solutions
                </h3>
                <p className="text-xs sm:text-sm text-white">
                  Leverage advanced cloud technologies to enhance business
                  scalability and efficiency.
                </p>
              </div>
            </div>

            {/* <!-- UI/UX Design Service --> */}
            <div className="service-card bg-black border-4 border-brandPrimary rounded-xl p-5 sm:p-6 md:p-7 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-pink-200 group">
              <div className="flex flex-col items-center text-center">
                <div className="bg-pink-50 p-3 rounded-full mb-4 group-hover:animate-pulse">
                  {/* <i data-feather="layers" className="w-8 h-8 sm:w-10 sm:h-10 text-pink-500"></i> */}
                  <IoLayers className="w-8 h-8 sm:w-10 sm:h-10 text-pink-500" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-brandPrimary mb-2">
                  UI/UX Design
                </h3>
                <p className="text-xs sm:text-sm text-white">
                  Design intuitive and visually appealing user interfaces that
                  enhance user experience.
                </p>
              </div>
            </div>

            {/* <!-- Cybersecurity Service --> */}
            <div className="service-card bg-black border-4 border-brandPrimary rounded-xl p-5 sm:p-6 md:p-7 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-red-200 group">
              <div className="flex flex-col items-center text-center">
                <div className="bg-red-50 p-3 rounded-full mb-4 group-hover:animate-pulse">
                  {/* <i data-feather="shield" className="w-8 h-8 sm:w-10 sm:h-10 text-red-500"></i> */}
                  <BsShieldLockFill className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-brandPrimary mb-2">
                  Cybersecurity
                </h3>
                <p className="text-xs sm:text-sm text-white">
                  Comprehensive security solutions to protect your digital
                  assets from emerging threats.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* <!---------------- Service Section End -----------------> */}

        {/*----------------- Team Section ---------------------------------*/}
        <section className="w-full max-w-7xl mx-auto"></section>
      </div>

      {/* ----------------- Service Section End ------------------------------- */}

      <hr className="border-t-2 border-brandPrimary mb-10"/>

      {/*-------------------------- Team SEction---------------------------- */}

      <div className="mt-10 mb-9">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <span className="text-4xl font-extrabold text-brandPrimary text-500 text-center  md:m-4  border-b-2   border-brandPrimary">
            Our Team
          </span>
          <div className="mt-8">
            <p className="text-sm sm:text-base text-white max-w-2xl mx-auto">
              Meet With our Team Members who are passionate about their work and dedicated to delivering exceptional results. 
            </p>
          </div>
        </div>
        <Carousel className="flex items-center justify-center ">
          
        </Carousel>
      </div>
    </div>
  );
};

export default Home;
