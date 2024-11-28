// import React from 'react';
import { IoLayers } from "react-icons/io5";
import {
  BsDatabaseFillCheck,
  BsCloudsFill,
  BsShieldLockFill,
} from "react-icons/bs";
import { TbHeartRateMonitor } from "react-icons/tb";
import { FaCode } from "react-icons/fa6";
export default function service() {
  return (
    <div>
      <div className="service">
        <section className="py-12 px-16 sm:py-16 md:py-20 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <span className="text-3xl font-semibold text-brandPrimary text-500 text-center  md:m-4  border-b-2   border-brandPrimary">
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
    </div>
  );
}
