import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AnimatedSection from './AnimatedSection';

const CommunitySection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-6 bg-gray-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-6">
            Community & Culture
          </h2>
        </AnimatedSection>

        <div className="flex flex-col md:flex-row gap-10 items-center">
          <AnimatedSection className="w-full md:w-1/2">
            <div className="relative">
              <motion.div
                className="bg-gray-800 p-6 rounded-2xl border border-gray-700"
                initial={{ rotate: -2 }}
                whileHover={{ rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    className="bg-blue-900/30 p-4 rounded-lg border border-blue-800/30"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <h4 className="text-blue-300 font-semibold text-center">Peer Mentorship</h4>
                  </motion.div>

                  <motion.div
                    className="bg-cyan-900/30 p-4 rounded-lg border border-cyan-800/30"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    </div>
                    <h4 className="text-cyan-300 font-semibold text-center">Accountability</h4>
                  </motion.div>

                  <motion.div
                    className="bg-purple-900/30 p-4 rounded-lg border border-purple-800/30"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                      </svg>
                    </div>
                    <h4 className="text-purple-300 font-semibold text-center">Problem Solving</h4>
                  </motion.div>

                  <motion.div
                    className="bg-green-900/30 p-4 rounded-lg border border-green-800/30"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-green-300 font-semibold text-center">Celebrating Wins</h4>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>
          <AnimatedSection className="w-full md:w-1/2">
            <motion.div
              className="bg-gray-800 p-6 rounded-2xl border border-gray-700"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold text-blue-300 mb-4">Join the Cyberhunter Community</h3>
              <p className="text-gray-300 mb-4">
                Our community thrives on collaboration, innovation, and a shared passion for technology. We believe in learning together, growing together, and making a difference in the tech world.
              </p>
              <motion.button
                className="bg-black border border-cyan-400 hover:bg-cyan-400 text-white font-bold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105 hover:text-gray-900"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                onClick={() => navigate('/auth/login')}
              >
                Join Us Now
              </motion.button>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
