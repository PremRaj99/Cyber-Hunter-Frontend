import React from 'react';
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdEdit } from "react-icons/md";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";


const SocialLinksPopup = ({ isOpen, onClose, initialLinks, onSave }) => {
  const [socialLinks, setSocialLinks] = useState(initialLinks);

  const handleInputChange = (platform, value) => {
    setSocialLinks((prev) => ({
      ...prev,
      [platform]: value,
    }));
  };

  const handleSave = () => {
    onSave(socialLinks);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-gray-800 rounded-lg p-6 w-96"
          >
            <motion.h2
              className="text-xl font-bold text-cyan-400 mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              Edit Social Links
            </motion.h2>
            {Object.entries({
              github: FaGithub,
              instagram: FaInstagram,
              linkedin: FaLinkedin,
              twitter: FaTwitter,
            }).map(([platform, Icon], index) => (
              <motion.div
                key={platform}
                className="mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.3 + index * 0.1,
                  duration: 0.3,
                }}
              >
                <label className="block text-gray-400 mb-2 capitalize">
                  {platform} Profile URL
                </label>
                <div className="flex items-center">
                  <Icon className="mr-2 text-gray-400" />
                  <input
                    type="text"
                    value={socialLinks[platform]}
                    onChange={(e) =>
                      handleInputChange(platform, e.target.value)
                    }
                    className="w-full rounded bg-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    placeholder={`Enter ${platform} profile URL`}
                  />
                </div>
              </motion.div>
            ))}
            <div className="flex justify-end space-x-2 mt-4">
              <motion.button
                onClick={onClose}
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.3 }}
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={handleSave}
                className="px-4 py-2 bg-cyan-400 text-black rounded hover:bg-cyan-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.3 }}
              >
                Save
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SocialLinksPopup;