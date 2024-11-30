import React, { useState } from 'react'
import createImg from '../assets/login-signup-imgs/create-pass-img.png'
import { FaArrowRight, FaLock } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";

const CreatePassword = () => {
    const [email, setEmail] = useState('');

    const [showPassword, setShowPassword] = useState('false');
    return (
        <div>
            <section className="py-16 px-4 md:px-8 lg:px-16">
                <div className="max-w-6xl mx-auto">
                    {/* <!-- Header --> */}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12  border-2 text-white border-white p-8 rounded-lg shadow-lg">
                        {/* <!-- image --> */}
                        <div className="space-y-8" data-aos="fade-right">
                            <img src={createImg} alt="banner-img" className="w-fit h-fit md:h-fit  object-cover hover:-translate-y-3 transition-all duration-700" />
                        </div>

                        {/* <!-- forgot password --> */}
                        <div
                            className=" border-2 text-white border-white p-8 rounded-lg shadow-lg"
                            data-aos="fade-left"
                        >

                            <div className="text-center mb-16" data-aos="fade-down">
                                <div className="text-center mb-10 sm:mb-12 md:mb-16">
                                    <span className="text-4xl font-extrabold text-brandPrimary text-500 text-center  md:m-4  border-b-2   border-brandPrimary">
                                        Create Password
                                    </span>
                                </div>
                            </div>
                            <form className="w-full">
                                <div className="mb-4">
                                    <span className="flex justify-between">
                                    <label htmlFor="password" className="flex text-md font-medium text-white">
                                            {/* lock images */}
                                            <FaLock className='h-6 w-6 mx-2 my-2' />New Password
                                        </label>

                                        <FaEye
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="h-6 w-6 flex cursor-pointer mx-4" />
                                    </span>

                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        // value={password}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 bg-transparent border border-brandPrimary rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-300 placeholder:text-stone-400"
                                        placeholder="new password"
                                        required
                                    />
                                </div>


                                {/* confirm pass */}
                                <div className="mb-4">
                                    <span className="flex justify-between">
                                        <label htmlFor="confirmPassword" className="flex text-md font-medium text-white">
                                            {/* lock images */}
                                            <FaLock className='h-6 w-6 mx-2 my-2' />Confirm Password
                                        </label>
                                        {/* eye images */}
                                        <FaEye
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="h-6 w-6 cursor-pointer mx-4" />
                                    </span>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        // value={confirmPassword}
                                        // onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 bg-transparent border border-brandPrimary rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-300 placeholder:text-stone-400"
                                        placeholder="confirm password"
                                        required
                                    />

                                </div>
                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="lg:w-1/2 md:w-full flex items-center justify-center bg-brandPrimary text-black font-bold py-3 px-6 rounded-lg hover:bg-black hover:text-brandPrimary hover:border hover:border-brandPrimary transform hover:scale-105 transition-all duration-300"
                                        onClick={() => console.log(email)}
                                    >
                                        Send OTP
                                        <span className="ml-2">
                                            <FaArrowRight />
                                        </span>
                                    </button>
                                </div>
                            </form>

                        </div>

                    </div>
                </div >
            </section >
        </div >
    )
}

export default CreatePassword
