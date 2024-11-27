import { useState } from "react";
import { motion } from "framer-motion";
import { MdEdit } from "react-icons/md";

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
  });

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
          {/* Points Display */}
          <div className="absolute right-6 top-6 text-lg font-semibold text-green-400">
            {profileData.points} pts
          </div>

          {/* Profile Image and Role */}
          <div className="mb-8 flex flex-col items-center">
            <div className="relative mb-4">
              <div className="h-32 w-32 rounded-full bg-cyan-400 flex items-center justify-center">
                <svg
                  className="h-20 w-20 text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <button
                className="absolute bottom-0 right-0 rounded-full bg-gray-700 p-2 text-cyan-400 hover:bg-gray-600"
                onClick={() => console.log("Edit avatar")}
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

          {/* Profile Details */}
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

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <div className="flex gap-2 md:gap-6">
              {[
                { name: "GitHub", color: "text-white" },
                { name: "Instagram", color: "text-pink-500" },
                { name: "LinkedIn", color: "text-blue-500" },
                { name: "Twitter", color: "text-cyan-400" },
              ].map((social) => (
                <button
                  key={social.name}
                  className={`rounded-full bg-gray-700 p-3 ${social.color} hover:bg-gray-600`}
                  onClick={() => console.log(`Open ${social.name}`)}
                >
                  <span className="sr-only">{social.name}</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
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
