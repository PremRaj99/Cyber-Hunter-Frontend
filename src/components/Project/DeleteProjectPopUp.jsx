import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XCircle } from 'lucide-react';
import { GoAlertFill } from "react-icons/go";

const DeleteProjectPopUp = ({ isOpen, onClose, deleteProject }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) setIsAnimating(true);
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed z-50 inset-0 overflow-y-auto flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-75 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md p-6 mx-4 bg-gray-900 border border-cyan-500/30 rounded-lg shadow-xl shadow-cyan-500/10 overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 300,
              duration: 0.3
            }}
          >
            {/* Cyan accent border */}
            <motion.div
              className="absolute inset-x-0 top-0 h-1 bg-cyan-500"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.4 }}
            />

            <div className="flex flex-col items-center sm:items-start">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500/20 mr-3">
                  <GoAlertFill className="text-red-500" size={24} />
                </div>
                <h3
                  className="text-xl font-semibold text-white"
                  id="modal-headline"
                >
                  Delete Project
                </h3>
              </div>

              <div className="w-full mb-6">
                <p className="text-gray-300 text-sm">
                  Are you sure you want to delete this project? All of your data will be
                  permanently removed. 
                </p>
              </div>
              <div className="w-full text-center sm:flex-row sm:justify-end mb-6">
                <p className="text-cyan-300 text-sm">
                  This action cannot be undone.
                </p>
              </div>

              <div className="w-full flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                <motion.button
                  type="button"
                  className="w-full sm:w-auto px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 font-medium hover:bg-gray-700 focus:outline-none focus:ring-cyan-500 transition-colors duration-200"
                  onClick={onClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="button"
                  className="w-full sm:w-auto px-4 py-2 bg-red-600 rounded-md text-white font-medium hover:bg-red-700 focus:outline-none focus:ring-red-500 transition-colors duration-200"
                  onClick={deleteProject}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Delete
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteProjectPopUp;