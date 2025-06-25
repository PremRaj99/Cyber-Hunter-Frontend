import { motion } from "framer-motion";

export default function ProgressBar({ scrollProgress }) {
  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-black">
      <motion.div
        className="h-full bg-cyan-500"
        style={{ width: `${scrollProgress * 100}%` }}
      />
    </div>
  );
}
