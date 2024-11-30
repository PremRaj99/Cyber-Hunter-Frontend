// import React from 'react';
import aboutImg from '../../assets/aboutImg.png';

export default function About() {
  return (
    <div>
      <div className="overflow-hidden">
        <div className="mt-10">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <span className="text-3xl font-semibold text-brandPrimary text-500 text-center  md:m-4  border-b-2   border-brandPrimary">
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
              <h3 className="text-2xl p-4 font-extrabold flex md:justify-center text-slate-300 text-500">
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
    </div>
  );
}
