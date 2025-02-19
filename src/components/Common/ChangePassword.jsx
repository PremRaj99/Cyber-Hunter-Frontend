import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle, Wifi, Lock, Send } from 'lucide-react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Cyber Grid */}
        <div className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(0,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        {/* Glowing Orb */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
          className="absolute top-1/4 -right-20 w-80 h-80 bg-cyan-500 rounded-full blur-[100px] opacity-30"
        />

        {/* Digital Rain Effect */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -100 }}
              animate={{ y: '100vh' }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              className="absolute text-cyan-500 text-xs"
              style={{ left: `${Math.random() * 100}%` }}
            >
              {Array.from({ length: 10 }).map((_, j) => (
                <div key={j}>{'01'[Math.floor(Math.random() * 2)]}</div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {!isSubmitted ? (
            <div className="backdrop-blur-lg bg-gray-900/50 p-8 rounded-3xl border border-cyan-500/20 shadow-2xl">
              {/* Floating Icons */}
              <div className="relative h-32 mb-6">
                <motion.div
                  animate={{ y: [-10, 10, -10], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="relative">
                    <Mail className="w-16 h-16 text-cyan-400" />
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="absolute inset-0 bg-cyan-500 rounded-full blur-xl opacity-30"
                    />
                  </div>
                </motion.div>

                {/* Orbiting Elements */}
                {[Wifi, Lock, Send].map((Icon, index) => (
                  <motion.div
                    key={index}
                    animate={{
                      rotate: 360,
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      rotate: {
                        duration: 10,
                        repeat: Infinity,
                        delay: index * 2,
                      },
                      scale: {
                        duration: 2,
                        repeat: Infinity,
                        delay: index,
                      },
                    }}
                    className="absolute left-1/2 top-1/2"
                    style={{
                      transformOrigin: '50% 50%',
                    }}
                  >
                    <div
                      className="text-cyan-400"
                      style={{
                        transform: `translate(-50%, -50%) rotate(${index * 120}deg) translateY(-40px)`,
                      }}
                    >
                      <Icon size={20} />
                    </div>
                  </motion.div>
                ))}
              </div>

              <h2 className="text-2xl font-bold text-center mb-2">Reset Password</h2>
              <p className="text-gray-400 text-center mb-8">Enter your email to receive a reset link</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative group">
                  <motion.div
                    animate={{
                      opacity: [0.2, 0.3, 0.2],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="absolute inset-0 bg-cyan-500 rounded-xl opacity-20 group-hover:opacity-30 blur transition-opacity"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-4 bg-gray-800/50 text-white border border-gray-700 rounded-xl focus:outline-none focus:border-cyan-500 transition-all relative"
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-cyan-500 text-gray-900 rounded-xl font-semibold relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <>
                        Update Password
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={isLoading ? { x: '100%' } : { x: '-100%' }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute inset-0 bg-cyan-400"
                  />
                </motion.button>
              </form>
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center backdrop-blur-lg bg-gray-900/50 p-8 rounded-3xl border border-green-500/20"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="mb-6 relative"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-30"
                />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4">Password UPdated</h3>
              <p className="text-gray-400">
                Use Your New Password For login <br />
                <span className="text-cyan-400 font-medium">{email}</span>
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;