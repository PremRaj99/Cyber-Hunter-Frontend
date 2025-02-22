// import React from 'react';
import { useEffect } from "react";
import {
  FaLocationDot,
  FaPhone,
  FaEnvelope,
  FaArrowRight,
} from "react-icons/fa6";

export default function Contact() {

  useEffect(() => {
    document.title = "Cyber Hunter | Contact";
  }, []);

  return (
    <div className="overflow-hidden">
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          {/* <!-- Header --> */}
          <div className="text-center mb-16" data-aos="fade-down">
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <span className="text-3xl font-semibold text-brandPrimary text-500 text-center  md:m-4  border-b-2   border-brandPrimary">
                Contact Us
              </span>
              <p className="text-white text-lg mt-10">
                We&apos;d love to hear from you. Drop us a line!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* <!-- Contact Information --> */}
            <div className="space-y-8" data-aos="fade-right">
              <div className="border border-white  p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FaLocationDot className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-brandPrimary">
                      Our Location
                    </h3>
                    <p className="text-gray-600">
                      Quantum University, Roorkee, Uttarakhand
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <FaPhone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-brandPrimary">
                      Phone Number
                    </h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>

              <div className="border border-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <FaEnvelope className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-brandPrimary">
                      Email
                    </h3>
                    <p className="text-gray-600">contact@example.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Contact Form --> */}
            <div
              className="bg-black border-2 text-white border-white p-8 rounded-lg shadow-lg"
              data-aos="fade-left"
            >
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <input
                      type="text"
                      className="w-full px-4 py-3  border bg-transparent border-brandPrimary rounded-lg focus:outline-none focus:border-brandPrimary transition-colors duration-300 placeholder:text-white"
                      placeholder="First Name"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-transparent border border-brandPrimary rounded-lg focus:outline-none focus:border-brandPrimary transition-colors duration-300 placeholder:text-white"
                      placeholder="Last Name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-transparent border border-brandPrimary rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-300 placeholder:text-white"
                    placeholder="Email Address"
                    required
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 bg-transparent border border-brandPrimary rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-300 placeholder:text-white"
                    placeholder="Phone Number"
                  />
                </div>

                <div>
                  <textarea
                    rows="4"
                    className="w-full px-4 py-3 bg-transparent border border-brandPrimary rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-300 placeholder:text-white"
                    placeholder="Your Message "
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center bg-brandPrimary text-black font-bold py-3 px-6 rounded-lg hover:bg-black hover:text-brandPrimary hover:border hover:border-brandPrimary transform hover:scale-105 transition-all duration-300"
                >
                  Send Message
                  <span className="ml-2">
                    <FaArrowRight />
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
