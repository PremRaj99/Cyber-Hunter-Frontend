import { useContext } from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaCamera, FaPlusCircle } from 'react-icons/fa';
import { ProjectEditContext } from '../../../pages/EditProject';
import { TeamProjectEditContext } from '../../../pages/EditTeamProject';

const MediaSection = () => {
  // Try to get context from either ProjectEditContext or TeamProjectEditContext
  const projectContext = useContext(ProjectEditContext);
  const teamProjectContext = useContext(TeamProjectEditContext);

  // Use whichever context is available
  const context = projectContext || teamProjectContext;

  // If no context is available, show error
  if (!context) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 shadow-lg">
        <p className="text-red-400">Error: Context not available. Make sure this component is used within a ProjectEditContext or TeamProjectEditContext provider.</p>
      </div>
    );
  }

  const {
    project,
    thumbnailPreview,
    handleThumbnailChange,
    newImages,
    handleImageAdd,
    handleRemoveImage
  } = context;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 shadow-lg"
    >
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">Project Media</h2>

      {/* Thumbnail */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-cyan-400 mb-4">Project Thumbnail</h3>
        <div className="relative group">
          <div className="w-full h-72 rounded-xl overflow-hidden shadow-lg bg-gray-700/50">
            {thumbnailPreview ? (
              <img
                src={thumbnailPreview}
                alt="Project Thumbnail"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-400">No thumbnail</span>
              </div>
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <label
                htmlFor="thumbnail-upload"
                className="cursor-pointer bg-brandPrimary hover:bg-cyan-600 text-white p-3 rounded-full transition-all duration-300 transform group-hover:scale-110"
              >
                <FaCamera size={20} />
              </label>
            </div>
          </div>
          <input
            type="file"
            id="thumbnail-upload"
            accept="image/*"
            onChange={handleThumbnailChange}
            className="hidden"
          />
        </div>
      </div>

      {/* Project Images */}
      <div>
        <h3 className="text-xl font-semibold text-cyan-400 mb-4">Project Screenshots</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Existing images */}
          {project.projectImage && project.projectImage.map((image, index) => (
            <div key={`existing-${index}`} className="relative group rounded-xl overflow-hidden bg-gray-700/50 aspect-video">
              <img
                src={image}
                alt={`Project screenshot ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="text-white bg-red-500 hover:bg-red-600 p-2 rounded-full transition-all duration-300"
                >
                  <FaTrash size={16} />
                </button>
              </div>
            </div>
          ))}

          {/* New images */}
          {newImages.map((image, index) => (
            <div key={`new-${index}`} className="relative group rounded-xl overflow-hidden bg-gray-700/50 aspect-video">
              <img
                src={image.preview}
                alt={`New project screenshot ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                <button
                  onClick={() => handleRemoveImage(index, true)}
                  className="text-white bg-red-500 hover:bg-red-600 p-2 rounded-full transition-all duration-300"
                >
                  <FaTrash size={16} />
                </button>
              </div>
            </div>
          ))}

          {/* Add new image button */}
          <label
            htmlFor="image-upload"
            className="cursor-pointer group flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-xl aspect-video hover:bg-gray-700/30 transition-all duration-300"
          >
            <FaPlusCircle size={24} className="text-gray-400 group-hover:text-cyan-400 mb-2 transition-colors duration-300" />
            <span className="text-sm text-gray-400 group-hover:text-cyan-400 transition-colors duration-300">Add Screenshot</span>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageAdd}
              className="hidden"
              multiple
            />
          </label>
        </div>
      </div>
    </motion.div>
  );
};

export default MediaSection;
