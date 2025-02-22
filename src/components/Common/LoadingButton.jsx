import React from 'react';
import { motion } from 'framer-motion';

const LoadingButton = ({ loading = false, onClick, disabled }) => {
  const bounceTransition = {
    y: {
      duration: 0.4,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeOut"
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
      className="flex justify-center w-full"
    >
      <button className="w-full rounded-2xl border-2 border-brandPrimary/35 bg-brandPrimary px-4 py-3 font-bold uppercase text-black transition-all duration-300 hover:bg-black hover:text-brandPrimary hover:border-brandPrimary hover:rounded-md active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none opacity-90 " onClick={onClick} disabled={loading || disabled}>
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin hover:border-brandPrimary group-hover:border-brandPrimary"></div>
          </div>
        ) : (
          "Submit"
        )}
      </button>
    </motion.div>
  );
};

export default LoadingButton;