import React, { useState } from 'react'
import { CgProfile } from 'react-icons/cg';
import { MdMail } from 'react-icons/md'
import { RxCross1 } from 'react-icons/rx'

const PopUp = () => {
    const [isVisible, setIsVisible] = useState(false);
    const showPopUp = () => {
        setIsVisible(true);
    }
    const hidePopUp = () => {
        setIsVisible(false);
    }
    return (
        <div>
            {/* profile button on which click to open the popup */}
            <div className="flex justify-center">

                <button
                    className=" border-2 border-black bg-black text-white rounded-lg hover:bg-white hover:text-black transition-all"
                    onClick={showPopUp}
                >
                    <CgProfile className='h-8 w-8' />
                </button>
            </div>


            {isVisible && (
                <section className="py-16 px-4 md:px-8 lg:px-16 fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="max-w-2xl mx-auto">
                        <div className="grid gap-12 bg-[#000000] border-2 text-white border-white p-8 rounded-lg shadow-lg relative">

                            <div className="flex justify-end">
                                <RxCross1
                                    className="h-8 w-8 absolute top-3 right-3 border-2 rounded-full px-1 cursor-pointer bg-white text-black hover:bg-black hover:text-white transition-all"
                                    onClick={hidePopUp}
                                />
                            </div>


                            <div
                                className="space-y-8 flex flex-col justify-center items-center"
                                data-aos="fade-right"
                            >
                                <MdMail className="h-20 w-20" />
                                <h3 className="font-bold text-2xl border-b-2 border-white space-y-6">
                                    Verify Your Email Address
                                </h3>
                                <p className="text-center font-semibold text-2xl mx-16">
                                    Your <span className="text-blue-700">example@gmail.com</span> is this click below to verify
                                </p>
                                <button className="border-black font-bold hover:border-white border-2 rounded-xl px-8 py-3 bg-white text-black hover:bg-black hover:text-white">
                                    Verify
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    )
}

export default PopUp
