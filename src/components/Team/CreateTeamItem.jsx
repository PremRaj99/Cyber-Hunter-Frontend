"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import React from "react" // Added import for React
import leadUserDemo from "../../assets/leaduserdemo.png" // Added import for leadUserDemo
import CreateTeamPopUp from "./CreateTeamPopUp"

export default function CreateTeamItem() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [newTeamName, setNewTeamName] = useState("")

  const teams = [
    {
      id: 1,
      name: "Code Hunter",
      score: 90,
      icon: leadUserDemo,
    },
    {
      id: 2,
      name: "CodeSec",
      score: 85,
      icon: leadUserDemo,
    },
    {
      id: 3,
      name: "Hunters",
      score: 80,
      icon: leadUserDemo,
    },
    {
      id: 4,
      name: "Noob coders",
      score: 75,
      icon: leadUserDemo,
    },
  ]

  // Filtered teams based on search query
  const filteredTeams = useMemo(() => {
    return teams.filter((team) => team.name.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery])

  const handleCreateTeam = (e) => {
    e.preventDefault()
    // Here you would typically handle the team creation logic
    console.log("Creating team:", newTeamName)
    setNewTeamName("")
    setIsFormVisible(false)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header Section */}
        <div className="mb-8 flex flex-col sm:flex-row items-center mt-4 justify-between">
          <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-0">
            <span className="text-cyan-400">Team</span>
            <span className="text-white"> Selection</span>
          </h1>
          <button className="flex items-center text-white hover:text-cyan-400">
            Skip
            <span className="ml-2">→</span>
          </button>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative mb-6"
        >
          <input
            type="text"
            placeholder="Search For Team by Entering Team name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-cyan-400/30 bg-transparent px-12 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-0"
          />
          <svg
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </motion.div>

        {/* Create Team Button */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mb-8 flex justify-center"
        >
          <button
            onClick={() => setIsFormVisible(true)}
            className="flex items-center gap-2 rounded-full bg-white px-6 py-2 text-black transition-transform hover:scale-105"
          >
            <span className="text-2xl">+</span>
            Create your team
          </button>
        </motion.div>

        {/* Team List */}
        <AnimatePresence>
          {filteredTeams.length > 0 ? (
            <div className="space-y-4">
              {filteredTeams.map((team) => (
                <motion.div
                  key={team.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                  className="flex flex-col sm:flex-row items-center justify-between rounded-lg bg-gray-800 p-4"
                  whileHover={{
                    scale: 1.05,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      mass: 0.5,
                    },
                  }}
                >
                  <div className="flex items-center gap-4 mb-2 sm:mb-0">
                    <span className="text-lg text-gray-400">{team.id}</span>
                    <div className="h-10 w-10 overflow-hidden rounded-full">
                      <img
                        src={team.icon || "/placeholder.svg"}
                        alt={`${team.name} icon`}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="text-lg text-white">{team.name}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-8">
                    <span className="text-lg text-white">Score : {team.score}</span>
                    <button className="rounded bg-cyan-400 px-6 py-2 text-sm font-medium text-black transition-colors hover:bg-black hover:border hover:border-cyan-400 hover:text-cyan-400">
                      JOIN
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-gray-400 py-4">
              No teams found matching your search
            </motion.div>
          )}
        </AnimatePresence>

        {/* Create Team Form Pop-up */}
        <AnimatePresence>
          {isFormVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-800 rounded-lg p-6 w-full max-w-md"
              >
                <h2 className="text-2xl font-bold text-white text-center mb-4">Create Your Team</h2>
                <form onSubmit={handleCreateTeam}>
                  <div className="space-y-4">
                    <CreateTeamPopUp
                      newTeamName={newTeamName}
                      setNewTeamName={setNewTeamName}
                      setIsFormVisible={setIsFormVisible}
                      handleCreateTeam={handleCreateTeam}
                    />
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

