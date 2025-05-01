/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';
import SearchUserForm from './SearchUserForm';
import RoleSelectionForm from './RoleSelectionForm';
import ReviewForm from './ReviewForm';
import StepIndicator from './StepIndicator';

const AddMemberDrawer = ({
  isOpen,
  onClose,
  step,
  setStep,
  newMember,
  setNewMember,
  searchTerm,
  setSearchTerm,
  searchResults,
  isSearching,
  handleSearch,
  onSelectUser,
  onAddMember
}) => {
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

  const nextStep = () => {
    if (step === 1 && !newMember.userId) return;
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
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
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Steps progress */}
            <div className="px-6 pt-6">
              <StepIndicator currentStep={step} />
            </div>

            {/* Step content */}
            <div className="flex-grow overflow-y-auto px-6">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <SearchUserForm
                    key="step1"
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    handleSearch={handleSearch}
                    searchResults={searchResults}
                    isSearching={isSearching}
                    onSelectUser={onSelectUser}
                  />
                )}

                {step === 2 && (
                  <RoleSelectionForm
                    key="step2"
                    newMember={newMember}
                    setNewMember={setNewMember}
                  />
                )}

                {step === 3 && (
                  <ReviewForm
                    key="step3"
                    newMember={newMember}
                  />
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
                  onClick={onClose}
                  className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              )}

              {step < 3 ? (
                <button
                  onClick={nextStep}
                  className="px-6 py-3 bg-cyan-400 text-black rounded-lg hover:bg-cyan-300 transition-colors flex items-center gap-2"
                  disabled={step === 1 && !newMember.userId}
                >
                  <span>Next Step</span>
                  <ChevronRight size={18} />
                </button>
              ) : (
                <button
                  onClick={onAddMember}
                  className="px-8 py-3 bg-cyan-400 text-black rounded-lg hover:bg-cyan-300 transition-colors font-medium"
                >
                  Add to Team
                </button>
              )}
            </div>
          </motion.div>

          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default AddMemberDrawer;
