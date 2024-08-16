import React, { useState } from 'react';
import banner1 from '../assets/banner1.png';
import googleIcon from '../assets/google_icon.png';
import githubIcon from '../assets/github_icon.png';
import xIcon from '../assets/x_icon.png';
import emailLogo from '../assets/email.png';
import lockLogo from '../assets/lock.png';
import openLockPic from '../assets/open_lock.png';
import eyeIcon from '../assets/eye_icon.png';


function Login() {
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // add state to show/hide password
    return (
        <div className='bg-transparent'>
            <div className='bg-black'>
                <div className='circlePosition w-[100px] h-[100px] md:w-[100px] md:h-[150px] bg-brandPrimary rounded-[100%] absolute z-1 top-[4%]  md:left-[18%] left-[68%] translate-x-[-50%] translate-y-[-50%] blur-[40px] md:blur-[55px] transition-all duration-300'></div>
                <div className='circlePosition w-[150px] h-[150px] md:w-[250px] md:h-[200px] bg-brandPrimary rounded-[100%] absolute z-1 top-[15%] md:top-[55%] left-[50%] md:left-[25%] translate-x-[-50%] translate-y-[-50%] blur-[80px] md:blur-[90px] transition-all duration-300'></div>
                <div className='px-4 lg:px-16 max-w-screen-2xl mx-auto min-h-screen h-screen '>
                    <div className='w-full h-full pt-20 flex justify-center items-center'>
                        <div className="md:w-4/5 w-72 md:my-28 my-10 flex flex-col md:flex-row rounded-2xl items-center justify-between gap-12 bg-white bg-opacity-40 backdrop-blur-lg border">
                            <div className='w-1/2'>
                                <img src={banner1} alt="banner-img" className="w-fit md:h-full  object-cover hover:-translate-y-3 transition-all duration-700" />
                            </div>
                            {/* login page */}
                            <div className="md:w-1/2 w-11/12 md:my-8 my-2 md:mx-8 flex flex-col md:flex-row rounded-2xl items-center justify-between gap-12 bg-white bg-opacity-50 backdrop-blur-lg border">

                                <div className="min-h-96 flex  items-center justify-center bg-white-blur-[10px]">
                                    <div className="flex justify-center items-center  bg-gradient-to-r from-white-800 via-white-300 to-white-100">
                                        <div className=" px-24 py-6  rounded-3xl">

                                            <div className="relative w-full mb-4">
                                                <div className="flex justify-between items-center border-2 border-white rounded-full relative overflow-hidden">
                                                    <label
                                                        onClick={() => setIsSignup(false)}
                                                        className={`w-1/2  text-center text-lg cursor-pointer transition-all duration-700 z-10 ${!isSignup ? 'text-white' : 'text-black'}`}
                                                    >
                                                        Login
                                                    </label>
                                                    <label
                                                        onClick={() => setIsSignup(true)}
                                                        className={`w-1/2 py-2 text-center text-lg cursor-pointer transition-all duration-700 z-10 ${isSignup ? 'text-white' : 'text-black'}`}
                                                    >
                                                        Signup
                                                    </label>
                                                    <div
                                                        className={`absolute  top-0 h-full w-1/2 bg-brandPrimary  rounded-full transition-all duration-700 ${isSignup ? 'transform translate-x-full' : ''}`}
                                                    ></div>
                                                </div>
                                            </div>

                                            <div className="flex transition-transform duration-700" style={{ transform: isSignup ? 'translateX(0)' : 'translateX(0)' }}>
                                                <form className="w-full">
                                                    <div className="mb-2">
                                                        <label htmlFor="email" className="flex  text-md  font-medium text-gray-700">
                                                            <img src={emailLogo} alt="" className='h-6 mx-2' />Email Address
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="example@gmail.com"
                                                            required
                                                            className="w-full px-4 py-2 border rounded-lg"
                                                        />
                                                    </div>
                                                    <div className="mb-4 relative">
                                                        <label htmlFor="password" className="flex text-md font-medium text-gray-700">
                                                            <img src={lockLogo} alt="" className='h-6 mx-2' />Password
                                                        </label>
                                                        <input
                                                            type={showPassword ? 'text' : 'password'}
                                                            placeholder="✯✯✯✯✯✯"
                                                            required
                                                            className="w-full px-4 py-2 border rounded-lg"
                                                        />
                                                        <span className="absolute right-3 top-[65%] transform -translate-y-[50%]">
                                                            <img
                                                                src={eyeIcon}
                                                                alt="eye icon"
                                                                className="h-6 cursor-pointer"
                                                                onClick={() => setShowPassword(!showPassword)}
                                                            />
                                                        </span>
                                                    </div>
                                                    {!isSignup && (

                                                        <div className="mb-2 text-right">
                                                            <a href="#" className="text-blue-500 hover:underline">
                                                                Forgot password?
                                                            </a>
                                                        </div>
                                                    )}

                                                    {isSignup && (
                                                        <div className="mb-6 relative">
                                                            <label htmlFor="confirmPassword" className="flex text-md font-medium text-gray-700">
                                                                <img src={openLockPic} alt="" className='h-6 mx-2' />Confirm Password
                                                            </label>
                                                            <input
                                                                type={showPassword ? 'text' : 'password'}
                                                                placeholder="✯✯✯✯✯✯"
                                                                required
                                                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            />
                                                            <span className="absolute right-3 top-[65%] transform -translate-y-[50%]">
                                                                <img
                                                                    src={eyeIcon}
                                                                    alt="eye icon"
                                                                    className="h-6 cursor-pointer"
                                                                    onClick={() => setShowPassword(!showPassword)}
                                                                />
                                                            </span>
                                                        </div>
                                                    )}

                                                    <div className="mb-4 ">
                                                        <button
                                                            type="submit"
                                                            className="w-full py-2 text-white bg-brandPrimary rounded-lg hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        >
                                                            {isSignup ? 'Signup' : 'Login'}
                                                        </button>
                                                        <p className='flex justify-center text-white py-1'>or</p>
                                                    </div>
                                                    <div className="social-container flex m-2 space-x-5 justify-center">
                                                        <a href="#" className="social transparent p-2 bg-white hover:bg-brandPrimary border-2 h-12 w-12 rounded-full">
                                                            <img src={googleIcon} alt="" />
                                                        </a>
                                                        <a href="#" className="social transparent p-2 bg-white  hover:bg-brandPrimary border-2 h-12 w-12 rounded-full">
                                                            <img src={githubIcon} alt="" />
                                                        </a>
                                                        <a href="#" className="social transparent p-2 bg-white  hover:bg-brandPrimary border-2 h-12 w-12 rounded-full">
                                                            <img src={xIcon} alt="" />
                                                        </a>

                                                    </div>
                                                </form>
                                            </div>
                                            {!isSignup && (
                                                <div className="text-center text-white">
                                                    <span>Not a member? </span>
                                                    <a
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setIsSignup(true);
                                                        }}
                                                        className="text-brandPrimary hover:underline"
                                                    >
                                                        Signup now
                                                    </a>

                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login
