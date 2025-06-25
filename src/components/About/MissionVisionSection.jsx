import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const MissionVisionSection = () => {
  return (
    <section className="py-20 px-6 bg-gray-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-16">
            Mission & Vision
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <AnimatedSection>
            <motion.div
              className="bg-gray-800/80 p-8 rounded-2xl border border-cyan-400/20 h-full"
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(59, 130, 246, 0.2)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-6">
                <div className="bg-black p-4 rounded-lg mr-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-blue-300">Our Mission</h3>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                To create a student-driven platform that nurtures skills in cybersecurity, blockchain, and emerging technologies through real-world projects, collaborative learning, and industry-relevant exposure.
              </p>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection>
            <motion.div
              className="bg-gray-800/80 p-8 rounded-2xl border border-cyan-500/20 h-full"
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(34, 211, 238, 0.2)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-6">
                <div className="bg-cyan-600 p-4 rounded-lg mr-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-cyan-300">Our Vision</h3>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                To become a nationally recognized student club that produces elite developers, ethical hackers, and tech leaders ready to take on real-world challenges in the digital domain.
              </p>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
