import React from 'react';
import { motion } from 'framer-motion';

const LoadingButton = ({ loading = false, onClick,disabled }) => {
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
      <button className="w-full rounded-2xl border-2 border-cyan-500/35 bg-cyan-500 px-4 py-3 font-bold uppercase text-black transition-all duration-300 hover:bg-black hover:text-cyan-500 hover:border-cyan-500 hover:rounded-md active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none opacity-90 " onClick={onClick} disabled={loading || disabled}>
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin hover:border-cyan-500 group-hover:border-cyan-500"></div>
          </div>
        ) : (
          "Submit"
        )}
      </button>
    </motion.div>
  );
};

export default LoadingButton;