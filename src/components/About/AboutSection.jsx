import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const AboutSection = () => {
  return (
    <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
      <AnimatedSection className="flex flex-col md:flex-row items-center gap-10">
        {/* Animated graphic */}
        <motion.div
          className="w-full md:w-1/2 mb-10 md:mb-0"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            <motion.div
              className="w-full h-64 md:h-96 bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
              initial={{ rotate: -2 }}
              whileHover={{ rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 p-4 flex items-start justify-start">
                <div className="font-mono text-xs text-gray-300 opacity-70">
                  <div>{'> '} cyberhunter init</div>
                  <div>{'> '} loading security modules...</div>
                  <div>{'> '} blockchain integration: complete</div>
                  <div>{'> '} hack the planet</div>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-24 h-24 bg-white bg-opacity-10 rounded-full flex items-center justify-center"
                  animate={{
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(59, 130, 246, 0.5)",
                      "0 0 0 20px rgba(59, 130, 246, 0)",
                      "0 0 0 0 rgba(59, 130, 246, 0)"
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  <div className="text-4xl">🛡️</div>
                </motion.div>
              </div>

              {/* Binary pattern background */}
              <div className="absolute inset-0 opacity-10 overflow-hidden">
                {[...Array(40)].map((_, i) => (
                  <div key={i} className="text-xs md:text-sm font-mono text-white absolute"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      transform: `rotate(${Math.random() * 90 - 45}deg)`
                    }}>
                    {Math.random() > 0.5 ? '0' : '2'}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              className="absolute -top-5 -left-5 w-16 h-16 bg-cyan-500 rounded-xl shadow-lg"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -bottom-3 -right-3 w-12 h-12 bg-cyan-400 rounded-lg shadow-lg"
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>

        {/* Text content */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-6">
            The Origin Story
          </h2>
          <motion.p
            className="text-gray-300 text-lg leading-relaxed mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Cyberhunter was born from a simple idea: &quot;What if students could lead each other into the world of ethical hacking, security research, and decentralized technology without waiting for formal instruction?&quot;
          </motion.p>
          <motion.p
            className="text-gray-300 text-lg leading-relaxed mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            With the rise of malware attacks, data breaches, and global cyber threats, a group of students including Yash Rana decided to create a club where skills could be learned, tested, and shared. They believed in learning by doing, and that ethos has since driven every initiative of Cyberhunter.
          </motion.p>
          <motion.p
            className="text-gray-300 text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            What began in a classroom as a casual coding discussion quickly evolved into regular meetups, structured sessions, real-world projects, and now a full-fledged digital presence.
          </motion.p>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default AboutSection;
