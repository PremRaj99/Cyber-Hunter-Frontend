import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { MdEdit } from "react-icons/md";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function ProfileSettingsItem() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [profileData, setProfileData] = useState({
    userName: "Prem_2004",
    course: "Btech",
    branch: "CSE",
    session: "2022-205",
    qId: "22030179",
    gender: "Male",
    points: 600,
    role: "Code Builder",
    profileImage: null,
  });

  const fileInputRef = useRef(null);

  const handleEdit = (field) => {
    setIsEditing(true);
    setEditingField(field);
  };

  const handleSave = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setIsEditing(false);
    setEditingField(null);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prev) => ({
          ...prev,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const renderProfileField = (label, field) => {
    const value = profileData[field];
    const isCurrentlyEditing = isEditing && editingField === field;

    return (
      <div
        key={label}
        className="flex flex-col sm:flex-row items-center justify-between mb-4 space-y-2 sm:space-y-0"
      >
        <span className="text-gray-400 w-full sm:w-auto text-left sm:mr-4">
          {label}
        </span>
        <div className="flex items-center w-full sm:w-auto justify-between sm:justify-end space-x-2">
          {isCurrentlyEditing ? (
            <input
              type="text"
              value={value}
              onChange={(e) => handleSave(field, e.target.value)}
              onBlur={() => setIsEditing(false)}
              className="w-full sm:w-auto flex-grow rounded bg-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              autoFocus
            />
          ) : (
            <span className="flex-grow text-right sm:text-left">{value}</span>
          )}
          <button
            onClick={() => handleEdit(field)}
            className="rounded-full bg-gray-700 p-2 hover:bg-gray-600"
          >
            <svg
              className="h-4 w-4 text-cyan-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-8"
    >
      <div className="mx-auto max-w-4xl mt-4 md:mt-4">
        <h1 className="mb-8 text-2xl font-bold text-cyan-400 text-center sm:text-left">
          Profile Settings
        </h1>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative rounded-lg bg-gray-800/50 p-6 sm:p-8 shadow-xl backdrop-blur-sm"
        >
          <div className="absolute right-6 top-6 text-lg font-semibold text-green-400">
            {profileData.points} pts
          </div>

          <div className="mb-8 flex flex-col items-center">
            <div className="relative mb-4">
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleImageUpload}
              />
              <div className="h-32 w-32 rounded-full bg-cyan-400 flex items-center justify-center overflow-hidden"
                onClick={() => fileInputRef.current.click()}>
                {profileData.profileImage ? (
                  <img
                    src={profileData.profileImage}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <svg
                    className="h-20 w-20 text-gray-900"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                )}
              </div>
              <button
                className="absolute bottom-0 right-0 rounded-full bg-gray-700 p-2 text-cyan-400 hover:bg-gray-600"
                onClick={() => fileInputRef.current.click()}
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-2 text-cyan-400">
              <span>{profileData.role}</span>
              <button
                className="rounded-full bg-gray-700 p-1 hover:bg-gray-600"
                onClick={() => console.log("Edit role")}
              >
                <svg
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mb-8 text-white sm:mx-12 lg:mx-48"
          >
            {Object.entries({
              "User Name": "userName",
              Course: "course",
              Branch: "branch",
              Session: "session",
              "Q-Id": "qId",
              Gender: "gender",
            }).map(([label, field]) => renderProfileField(label, field))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <div className="flex gap-2 md:gap-6">
              {[
                { name: "GitHub", color: "text-white", icon: FaGithub },
                {
                  name: "Instagram",
                  color: "text-pink-500",
                  icon: FaInstagram,
                },
                { name: "LinkedIn", color: "text-blue-500", icon: FaLinkedin },
                { name: "Twitter", color: "text-cyan-400", icon: FaTwitter },
              ].map((social) => (
                <button
                  key={social.name}
                  className={`rounded-full bg-gray-700 p-3 ${social.color} hover:bg-gray-600`}
                  onClick={() => console.log(`Open ${social.name}`)}
                >
                  <span className="sr-only">{social.name}</span>
                  <social.icon className="h-5 w-5" />
                </button>
              ))}
              <div className="items-center ">
                <button
                  className="border rounded-full p-1 text-cyan-400"
                  onClick={() => console.log("Edit social links")}
                >
                  <MdEdit />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
