import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CgProfile } from 'react-icons/cg';
import { MdMail } from 'react-icons/md';
import { RxCross1 } from 'react-icons/rx';

const VerifyEmail = () => {
    const [isVisible, setIsVisible] = useState(false);
    const showPopUp = () => {
        setIsVisible(true);
    };
    const hidePopUp = () => {
        setIsVisible(false);
    };

    return (
        <div>
            {/* Profile button to open the popup */}
            <div className="flex justify-center mt-4">
                <button
                    className="border-2 border-black bg-black text-white rounded-lg p-2 hover:bg-white hover:text-black transition-all"
                    onClick={showPopUp}
                >
                    <CgProfile className="h-8 w-8" />
                </button>
            </div>

            {/* Popup with Framer Motion */}
            <AnimatePresence>
                {isVisible && (
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            className="w-full max-w-sm sm:max-w-md lg:max-w-2xl mx-auto bg-black text-white border-2 border-white p-6 sm:p-8 md:p-10 rounded-lg shadow-lg relative"
                        >
                            {/* Close button */}
                            <RxCross1
                                className="h-6 w-6 sm:h-8 sm:w-8 absolute top-3 right-3 border-2 rounded-full p-1 cursor-pointer bg-white text-black hover:bg-black hover:text-white transition-all"
                                onClick={hidePopUp}
                            />

                            {/* Content */}
                            <div className="space-y-6 flex flex-col justify-center items-center text-center">
                                <MdMail className="h-16 w-16 sm:h-20 sm:w-20" />
                                <h3 className="font-bold text-lg sm:text-2xl border-b-2 border-white pb-2">
                                    Verify Your Email Address
                                </h3>
                                <p className="text-sm sm:text-lg font-semibold mx-4 sm:mx-8">
                                    Your{' '}
                                    <span className="text-blue-700">example@gmail.com</span>{' '}
                                    is this. Click below to verify.
                                </p>
                                <button className="border-2 font-bold border-black hover:border-white rounded-xl px-6 sm:px-8 py-2 sm:py-3 bg-white text-black hover:bg-black hover:text-white transition-all">
                                    Verify
                                </button>
                            </div>
                        </motion.div>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
};

export default VerifyEmail;
