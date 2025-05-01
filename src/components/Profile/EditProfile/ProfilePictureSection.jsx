import { motion } from "framer-motion";
import { FaCamera } from "react-icons/fa";

const ProfilePictureSection = ({ previewImage, formData, handleImageChange }) => {
  return (
    <div className="w-full md:w-1/3 flex flex-col items-center gap-4">
      <div className="relative group">
        <motion.div
          className="w-48 h-48 rounded-full bg-gray-700/70 flex items-center justify-center overflow-hidden border-4 border-cyan-400/30 group-hover:border-cyan-400/70 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
        >
          {previewImage ? (
            <img
              src={previewImage}
              alt="Profile Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <FaCamera size={40} className="text-gray-400" />
              <p className="text-sm text-gray-400 mt-2">Upload Image</p>
            </div>
          )}
        </motion.div>
        <input
          type="file"
          id="profilePicture"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <label
          htmlFor="profilePicture"
          className="absolute bottom-2 right-2 p-3 bg-brandPrimary hover:bg-cyan-600 rounded-full cursor-pointer shadow-lg transition-all duration-300 transform group-hover:scale-110"
        >
          <FaCamera size={18} className="text-white" />
        </label>
      </div>
      <p className="text-cyan-400 font-medium">
        {formData.name || "Your Name"}
      </p>
      <p className="text-gray-400 text-sm text-center max-w-xs">
        {formData.description || "Add a brief description about yourself"}
      </p>
    </div>
  );
};

export default ProfilePictureSection;
