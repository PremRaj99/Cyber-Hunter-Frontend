import { motion } from "framer-motion";

const NebulaEffect = () => {
  return (
    <motion.div
      className="absolute inset-0"
      animate={{
        backgroundPosition: ["0% 0%", "100% 100%"],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      style={{
        background:
          "radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.1) 25%, transparent 50%)",
      }}
    />
  );
};

export default NebulaEffect;
