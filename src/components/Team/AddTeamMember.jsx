import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Trash2, Plus, X, Upload, Check, ChevronRight } from 'lucide-react';

const AddTeamMember = () => {
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      role: "Lead Developer",
      image: "/api/placeholder/400/400"
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "UI/UX Designer",
      image: "/api/placeholder/400/400"
    },
    {
      id: 3,
      name: "Miguel Rodríguez",
      role: "Project Manager",
      image: "/api/placeholder/400/400"
    }
  ]);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    image: '/api/placeholder/400/400'
  });
  const [step, setStep] = useState(1);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { ease: 'easeOut' } }
  };

  const drawerVariants = {
    closed: {
      x: '100%',
      boxShadow: '0 0 0 rgba(0, 240, 255, 0)'
    },
    open: {
      x: 0,
      boxShadow: '-8px 0 30px rgba(0, 240, 255, 0.15)',
      transition: {
        type: 'spring',
        damping: 30,
        stiffness: 300
      }
    }
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  const handleAddMember = () => {
    if (newMember.name.trim() && newMember.role.trim()) {
      setTeamMembers([
        ...teamMembers,
        {
          id: Date.now(),
          ...newMember
        }
      ]);
      setNewMember({
        name: '',
        role: '',
        image: '/api/placeholder/400/400'
      });
      setDrawerOpen(false);
      setStep(1);
    }
  };

  const nextStep = () => {
    if (step === 1 && !newMember.name.trim()) return;
    if (step === 2 && !newMember.role.trim()) return;
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => {
      setStep(1);
      setNewMember({
        name: '',
        role: '',
        image: '/api/placeholder/400/400'
      });
    }, 300);
  };

  return (
    <div className="  p-8">
      {/* Header with add button */}
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Our Team</h2>
            <p className="text-gray-400">Meet the talented individuals behind our success</p>
          </div>
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-2 bg-brandPrimary text-black px-4 py-2 rounded-lg hover:bg-cyan-400 transition-colors group"
          >
            <span className="font-medium">Add Member</span>
            <div className="bg-black/20 rounded-full p-1">
              <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300" />
            </div>
          </button>
        </div>

        {/* Team Members Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={itemVariants}
              className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 group transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-brandPrimary/20"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-start p-4">
                  <button className="p-2 bg-brandPrimary rounded-full text-black hover:bg-cyan-400 transition-colors">
                    <Camera size={16} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-cyan-400 mb-4">{member.role}</p>
                <div className="flex justify-end mt-6">
                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Add Member Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            className="fixed inset-y-0 right-0 w-full max-w-md bg-gray-900 border-l border-gray-800 shadow-xl z-50 flex flex-col"
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h3 className="text-2xl font-bold text-white">Add Team Member</h3>
              <button
                onClick={closeDrawer}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Steps progress */}
            <div className="px-6 pt-6">
              <div className="flex items-center mb-8">
                {[1, 2, 3].map((number) => (
                  <React.Fragment key={number}>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= number ? 'bg-brandPrimary text-black' : 'bg-gray-800 text-gray-400'
                        } ${step === number ? 'ring-4 ring-brandPrimary/20' : ''}`}
                    >
                      {step > number ? <Check size={16} /> : number}
                    </div>
                    {number < 3 && (
                      <div
                        className={`flex-1 h-1 mx-2 rounded ${step > number ? 'bg-brandPrimary' : 'bg-gray-800'
                          }`}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Step content */}
            <div className="flex-grow overflow-y-auto px-6">
              <AnimatePresence custom={step > 1 ? 1 : -1}>
                {step === 1 && (
                  <motion.div
                    key="step1"
                    custom={1}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="space-y-6"
                  >
                    <h4 className="text-xl text-white font-medium mb-4">Basic Information</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-400 mb-2 text-sm">Full Name</label>
                        <input
                          type="text"
                          value={newMember.name}
                          onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                          className="w-full bg-gray-800 border-b-2 border-gray-700 focus:border-brandPrimary px-4 py-3 rounded text-white focus:outline-none transition-colors"
                          placeholder="Enter team member name"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 mb-2 text-sm">Role</label>
                        <input
                          type="text"
                          value={newMember.role}
                          onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                          className="w-full bg-gray-800 border-b-2 border-gray-700 focus:border-brandPrimary px-4 py-3 rounded text-white focus:outline-none transition-colors"
                          placeholder="Enter team member role"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    custom={1}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="space-y-6"
                  >
                    <h4 className="text-xl text-white font-medium mb-4">Profile Picture</h4>
                    <div className="flex flex-col items-center space-y-6">
                      <div className="relative group">
                        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-800 group-hover:border-brandPrimary/50 transition-colors">
                          <img
                            src={newMember.image}
                            alt="Profile preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button className="absolute bottom-1 right-1 p-3 bg-brandPrimary rounded-full text-black hover:bg-cyan-400 transition-colors">
                          <Upload size={20} />
                        </button>
                      </div>

                      <p className="text-gray-400 text-center max-w-xs">
                        Upload a profile picture or use our default avatar
                      </p>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    custom={1}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="space-y-6"
                  >
                    <h4 className="text-xl text-white font-medium mb-4">Review & Confirm</h4>

                    <div className="bg-gray-800 rounded-xl p-6 space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden">
                          <img
                            src={newMember.image}
                            alt={newMember.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h5 className="text-white text-lg">{newMember.name}</h5>
                          <p className="text-cyan-400">{newMember.role}</p>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-400">
                      Please review the information above. Once confirmed, the new team member will be added to your team.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom navigation */}
            <div className="p-6 border-t border-gray-800 flex justify-between">
              {step > 1 ? (
                <button
                  onClick={prevStep}
                  className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Back
                </button>
              ) : (
                <button
                  onClick={closeDrawer}
                  className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              )}

              {step < 3 ? (
                <button
                  onClick={nextStep}
                  className="px-6 py-3 bg-brandPrimary text-black rounded-lg hover:bg-cyan-400 transition-colors flex items-center gap-2"
                >
                  <span>Next Step</span>
                  <ChevronRight size={18} />
                </button>
              ) : (
                <button
                  onClick={handleAddMember}
                  className="px-8 py-3 bg-brandPrimary text-black rounded-lg hover:bg-cyan-400 transition-colors font-medium"
                >
                  Add to Team
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddTeamMember;