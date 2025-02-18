import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function AnimatedSuccess ({ show }) {
  return (
    <motion.div
      initial="hidden"
      animate={show ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, scale: 0.8, y: 10 },
        visible: { opacity: 1, scale: 1, y: 0 }
      }}
      className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
      style={{ display: show ? 'flex' : 'none' }}
    >
      <div className="bg-black/80 backdrop-blur-sm border border-cyan-400/30 p-4 rounded-xl flex items-center gap-2 shadow-lg shadow-cyan-500/20">
        <Sparkles className="text-cyan-400 w-5 h-5" />
        <span className="text-cyan-400 font-medium">Message sent successfully!</span>
      </div>
    </motion.div>
  );
};