import { useState, useRef } from "react";
import {  X } from "lucide-react";
import { motion } from "framer-motion";
import {
  MdDriveFileRenameOutline,
  MdOutlineDescription,
  MdCurrencyRupee,
  MdCalendarMonth,
  MdUploadFile,
  MdCloudUpload,
} from "react-icons/md";

export default function PostProject() {
  const [attachments, setAttachments] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files));
    }
  };

  const addFiles = (files) => {
    const newFiles = files.filter(
      (file) =>
        !attachments.some((existingFile) => existingFile.name === file.name)
    );
    setAttachments((prev) => [...prev, ...newFiles]);
  };

  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

 

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-semibold text-cyan-400 text-center"
        >
          <span className="border-b-2 border-cyan-400">Post Project</span>
        </motion.h2>
        <form className="shadow-md rounded-lg p-8">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="flex text-l item-center font-medium text-white gap-2 "
              >
                <MdDriveFileRenameOutline className="h-6 w-6 inline-block -mt-1 text-brandPrimary" />
                Project Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="mt-1 block w-full border border-brandPrimary placeholder:text-stone-400 text-white bg-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brandPrimary"
                placeholder="Enter project title"
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="flex text-l item-center font-medium text-white gap-2 "
              >
                <MdOutlineDescription className="h-6 w-6 inline-block -mt-1 text-brandPrimary" />
                Project Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className="mt-1 block w-full border border-brandPrimary placeholder:text-stone-400 text-white bg-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brandPrimary "
                placeholder="Describe your project"
                required
              ></textarea>
            </div>

            <div>
              <label
                htmlFor="budget"
                className="flex gap-2 text-l item-center font-medium text-white"
              >
                <MdCurrencyRupee className="h-6 w-6 inline-block -mt-1 text-brandPrimary" />
                Budget (INR)
              </label>
              <input
                type="number"
                id="budget"
                name="budget"
                className="mt-1 block w-full border border-brandPrimary placeholder:text-stone-400 text-white bg-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brandPrimary "
                placeholder="Enter your budget"
                required
              />
            </div>

            <div>
              <label
                htmlFor="deadline"
                className="flex gap-2 text-l items-center font-medium text-white"
              >
                <MdCalendarMonth className="h-6 w-6 inline-block -mt-1 text-brandPrimary" />
                Deadline
              </label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                className="mt-1 block w-full border border-brandPrimary placeholder:text-stone-400 text-white bg-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brandPrimary "
                required
              />
            </div>

            <div>
              <label className="Flex gap-2 text-l items-center font-medium text-white">
                <MdUploadFile className="h-6 w-6 inline-block -mt-1 text-brandPrimary" />
                Attachments
              </label>
              <motion.div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                animate={{
                  borderColor: isDragOver ? "#0891B2" : "#6B7280",
                  backgroundColor: isDragOver
                    ? "rgba(8, 145, 178, 0.1)"
                    : "transparent",
                }}
                transition={{ duration: 0.2 }}
                className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-brandPrimary border-dashed rounded-md"
              >
                <div className="space-y-1 text-center">
                  <MdCloudUpload className="mx-auto h-12 w-12 text-brandPrimary" />
                  <div className="flex text-sm text-stone-400">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-medium text-brandPrimary hover:text-indigo-500 focus-within:outline-none"
                    >
                      <span>Upload files</span>
                      <input
                        ref={fileInputRef}
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        multiple
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-stone-300">
                    PNG, JPG, PDF up to 10MB
                  </p>
                </div>
              </motion.div>
            </div>

            {attachments.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Attached Files:
                </h4>
                <ul className="space-y-2">
                  {attachments.map((file, index) => (
                    <motion.li
                      key={file.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center justify-between bg-gray-100 rounded-md p-2"
                    >
                      <span className="text-sm text-gray-700">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeAttachment(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-brandPrimary hover:bg-black hover:text-brandPrimary hover:border-brandPrimary  focus:outline-none focus:ring-0 "
              >
                Post Project
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
