import { motion, useTransform, useScroll } from "framer-motion";

export default function AnimatedBackground({ moveX, moveY }) {
  const { scrollYProgress } = useScroll();
  const parallaxY1 = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
  const rotateProgress = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute -top-20 left-1/4 w-96 h-96 rounded-full bg-cyan-500/30 blur-[150px]"
        style={{ y: moveY, x: moveX }}
      />
      <motion.div
        className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-cyan-500/20 blur-[120px]"
        style={{ y: parallaxY1 }}
      />
      <motion.div
        className="absolute -bottom-40 left-1/3 w-[700px] h-[700px] rounded-full bg-cyan-500/20 blur-[180px]"
        style={{ y: parallaxY2 }}
      />

      {/* Rotating elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-[400px] h-[400px] border border-cyan-500/10 rounded-full opacity-20"
        style={{ rotate: rotateProgress }}
      />
      <motion.div
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] border border-cyan-500/5 rounded-full opacity-10"
        style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, -180]) }}
      />
    </div>
  );
}
