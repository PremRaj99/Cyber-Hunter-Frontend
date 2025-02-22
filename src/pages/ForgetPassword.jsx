import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, Lock, CheckCircle } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [step, setStep] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setStep(2), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-64 h-64 bg-brandPrimary/10 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 15,
                delay: i * 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: 'blur(80px)',
              }}
            />
          ))}
        </div>
      </div>

      <motion.div
        className="w-full max-w-md relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gray-800/40 backdrop-blur-xl rounded-2xl overflow-hidden"
            >
              {/* Header Wave */}
              <div className="relative h-32 bg-brandPrimary/20 flex items-center justify-center overflow-hidden">
                <svg className="absolute bottom-0" viewBox="0 0 1440 320">
                  <path
                    fill="#111827"
                    fillOpacity="1"
                    d="M0,32L48,53.3C96,75,192,117,288,122.7C384,128,480,96,576,85.3C672,75,768,85,864,106.7C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                  ></path>
                </svg>
                <Lock className="text-brandPrimary w-16 h-16 relative z-10" />
              </div>

              <div className="p-8">
                <h2 className="text-2xl font-bold text-cyan-400 mb-2 text-center">
                  Forgot Password?
                </h2>
                <p className="text-gray-400 text-center mb-8">
                  No worries! Enter your email and we'll send you recovery instructions.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-transparent rounded-lg opacity-25 duration-300" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-900/50 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-brandPrimary transition-all duration-300 relative z-10"
                      placeholder="Enter your email"
                      required
                    />
                    <Mail className="absolute top-3.5 right-4 h-5 w-5 text-brandPrimary" />
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full bg-brandPrimary text-gray-900 font-semibold py-3 px-6 rounded-lg hover:bg-cyan-400 transition-colors duration-300 flex items-center justify-center gap-2 relative overflow-hidden group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">Reset Password</span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </motion.button>
                </form>

                <motion.a
                  href="/auth/login"
                  className="block text-center mt-6 text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                >
                  ← Back to Login
                </motion.a>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-800/40 backdrop-blur-xl p-8 rounded-2xl text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <CheckCircle className="w-16 h-16 text-brandPrimary mx-auto mb-4" />
              </motion.div>
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">Check Your Email</h2>
              <p className="text-gray-400 mb-6">
                We've sent recovery instructions to<br />
                <span className="text-cyan-400 font-medium">{email}</span>
              </p>
              <motion.button
                onClick={() => window.location.href = '/auth/login'}
                className="bg-brandPrimary text-gray-900 font-semibold py-3 px-6 rounded-lg hover:bg-cyan-400 transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Back to Login
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress indicator */}
        {isSubmitted && step === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 flex justify-center"
          >
            <div className="w-8 h-8 border-4 border-brandPrimary border-t-transparent rounded-full animate-spin" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPassword;