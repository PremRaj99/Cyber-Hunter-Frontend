import { motion } from "framer-motion";

export default function CTASection({ ctaRef, ctaInView }) {
  return (
    <section
      ref={ctaRef}
      className="relative z-10 px-4 py-24 sm:px-6 lg:px-12"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Create your first event today and see the difference EventFlow can make.
          </p>
        </motion.div>

        <motion.button
          className="px-8 py-3 rounded-lg overflow-hidden font-bold text-black bg-cyan-500 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Create Your Event</span>
        </motion.button>
      </div>
    </section>
  );
}
