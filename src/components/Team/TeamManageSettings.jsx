import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import leaduserdemo from "../../assets/leaduserdemo.png";

export default function TeamSettings() {
  const [teamMembers, setTeamMembers] = useState([
    "Yash Rana",
    "Prem Raj",
    "Naman Kumar",
    "Ashish Kumar",
    "Rishu Kumar",
    "Shubham Kumar",
  ]);
  const [editingMember, setEditingMember] = useState(null);
  const [newMemberName, setNewMemberName] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Team Logo and Name State
  const [teamLogo, setTeamLogo] = useState(leaduserdemo);
  const [teamName, setTeamName] = useState("Code Builder");
  const [isEditingTeamName, setIsEditingTeamName] = useState(false);
  const [teamNameInput, setTeamNameInput] = useState(teamName);

  // Image Upload Refs and State
  const fileInputRef = useRef(null);

  // Image Upload Handler
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTeamLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Team Name Edit Handler
  const handleTeamNameEdit = () => {
    if (teamNameInput.trim()) {
      setTeamName(teamNameInput.trim());
      setIsEditingTeamName(false);
    }
  };

  // Delete member functionality
  const handleDeleteMember = (memberToDelete) => {
    setTeamMembers(teamMembers.filter((member) => member !== memberToDelete));
  };

  // Edit member functionality
  const handleEditMember = (currentMember) => {
    setEditingMember(currentMember);
    setNewMemberName(currentMember);
  };

  // Save edited member
  const saveEditedMember = () => {
    if (newMemberName.trim()) {
      setTeamMembers(
        teamMembers.map((member) =>
          member === editingMember ? newMemberName.trim() : member
        )
      );
      setEditingMember(null);
      setNewMemberName("");
    }
  };

  // Add new member functionality
  const handleAddMember = () => {
    if (newMemberName.trim()) {
      setTeamMembers([...teamMembers, newMemberName.trim()]);
      setNewMemberName("");
      setIsAddModalOpen(false);
    }
  };

  // Variants for animations

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const scrollAnimationVariants = {
    offscreen: {
      y: 50,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className=" bg-gradient-to-b p-4 md:p-8"
    >
      <motion.div
        variants={scrollAnimationVariants}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.1 }}
        className="mx-auto max-w-4xl"
      >
        <h2 className="mb-6 text-2xl font-semibold text-cyan-400">
          Team Settings
        </h2>

        <motion.div
          variants={scrollAnimationVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.1 }}
          className="relative rounded-lg bg-gray-800/50 p-6 backdrop-blur-sm"
        >
          {/* Trophy Badge */}
          <div className="absolute left-6 top-6">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/20"
            >
              <div className="text-xl text-yellow-500">🏆</div>
            </motion.div>
          </div>

          {/* Points Display */}
          <div className="absolute right-6 top-6">
            <span className="text-lg font-medium text-green-500">600 pts</span>
          </div>

          {/* Team Profile */}
          <div className="mt-16 flex flex-col items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="h-32 w-32 rounded-full bg-cyan-400 drop-shadow-[0px_0px_5px_#00D8FF]">
                <img
                  src={teamLogo}
                  alt="Team Logo"
                  className="h-full w-full rounded-full object-cover"
                />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              </div>
              <button
                onClick={triggerFileInput}
                className="absolute -right-4 -top-4 rounded-full bg-cyan-400/20 p-1 text-cyan-400"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
            </motion.div>
            <div className="mt-4 flex items-center gap-2">
              {isEditingTeamName ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={teamNameInput}
                    onChange={(e) => setTeamNameInput(e.target.value)}
                    className="bg-gray-700 text-white px-2 py-1 rounded"
                  />
                  <button
                    onClick={handleTeamNameEdit}
                    className="text-green-400 hover:text-green-300"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsEditingTeamName(false);
                      setTeamNameInput(teamName);
                    }}
                    className="text-red-400 hover:text-red-300"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <span className="text-lg font-medium text-cyan-400">
                    {teamName}
                  </span>
                  <button
                    onClick={() => {
                      setIsEditingTeamName(true);
                      setTeamNameInput(teamName);
                    }}
                    className="rounded-full bg-cyan-400/20 p-1 text-cyan-400"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Add Member  */}

          <AnimatePresence>
            {teamMembers.map((member) => (
              <motion.div
                key={member}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center justify-between rounded-md bg-gray-700/50 px-4 py-3 m-2 transition-colors hover:bg-gray-700/70"
              >
                {editingMember === member ? (
                  <div className="flex items-center w-full">
                    <input
                      type="text"
                      value={newMemberName}
                      onChange={(e) => setNewMemberName(e.target.value)}
                      className="flex-grow bg-transparent text-gray-200 outline-none mr-2"
                    />
                    <button
                      onClick={saveEditedMember}
                      className="text-green-400 hover:text-green-300 mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingMember(null);
                        setNewMemberName("");
                      }}
                      className="text-red-400 hover:text-red-300"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="text-gray-200">{member}</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditMember(member)}
                        className="text-blue-400 hover:text-blue-300 mr-2"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteMember(member)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Add Member Modal */}
          <AnimatePresence>
            {isAddModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="bg-gray-800 p-6 rounded-lg w-96"
                >
                  <h3 className="text-xl mb-4 text-cyan-400">Add New Member</h3>
                  <input
                    type="text"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    placeholder="Enter member name"
                    className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setIsAddModalOpen(false)}
                      className="px-4 py-2 bg-gray-600 text-white rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddMember}
                      className="px-4 py-2 bg-green-500 text-white rounded "
                    >
                      Add Member
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Add Member Button */}
        </motion.div>
      </motion.div>
      <motion.button
        onClick={() => setIsAddModalOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:bg-green-600 z-50"
      >
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </motion.button>
    </motion.div>
  );
}
