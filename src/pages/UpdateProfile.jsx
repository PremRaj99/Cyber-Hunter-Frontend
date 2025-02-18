import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import axios from "axios"
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"

export default function UpdateProfile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        setUser(res.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching user:", error)
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/user`, user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      alert("Profile updated successfully!")
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Failed to update profile. Please try again.")
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      const formData = new FormData()
      formData.append("profilePicture", file)
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/v1/user/profilePicture`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          },
        )
        setUser((prev) => ({ ...prev, profilePicture: res.data.profilePicture }))
      } catch (error) {
        console.error("Error uploading profile picture:", error)
        alert("Failed to upload profile picture. Please try again.")
      }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  if (loading) {
    return <div className="text-center text-cyan-500">Loading...</div>
  }

  if (!user) {
    return <div className="text-center text-cyan-500">User not found</div>
  }

  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-white p-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1 className="text-4xl font-bold text-cyan-500 mb-8" variants={itemVariants}>
        Update Profile
      </motion.h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
        <motion.div variants={itemVariants} className="flex items-center space-x-4">
          <img
            src={user.profilePicture || "/placeholder.svg"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <input type="file" onChange={handleFileChange} accept="image/*" className="hidden" id="profilePicture" />
          <label
            htmlFor="profilePicture"
            className="bg-cyan-500 text-black font-bold py-2 px-4 rounded-md hover:bg-cyan-600 transition-colors duration-300 cursor-pointer"
          >
            Change Picture
          </label>
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="name" className="block text-sm font-medium text-cyan-500 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-800 border border-cyan-500 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="description" className="block text-sm font-medium text-cyan-500 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={user.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 bg-gray-800 border border-cyan-500 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          ></textarea>
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="course" className="block text-sm font-medium text-cyan-500 mb-1">
            Course
          </label>
          <input
            type="text"
            id="course"
            name="course"
            value={user.course}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-800 border border-cyan-500 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="branch" className="block text-sm font-medium text-cyan-500 mb-1">
            Branch
          </label>
          <input
            type="text"
            id="branch"
            name="branch"
            value={user.branch}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-800 border border-cyan-500 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="session" className="block text-sm font-medium text-cyan-500 mb-1">
            Session
          </label>
          <input
            type="text"
            id="session"
            name="session"
            value={user.session}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-800 border border-cyan-500 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="interests" className="block text-sm font-medium text-cyan-500 mb-1">
            Interests (comma-separated)
          </label>
          <input
            type="text"
            id="interests"
            name="interests"
            value={user.interest?.join(", ")}
            onChange={(e) => {
              const interestsArray = e.target.value.split(",").map((interest) => interest.trim())
              setUser((prev) => ({ ...prev, interest: interestsArray }))
            }}
            className="w-full px-3 py-2 bg-gray-800 border border-cyan-500 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <h3 className="text-lg font-semibold text-cyan-500 mb-2">Social Links</h3>
          <div className="space-y-4">
            {["github", "instagram", "linkedin", "twitter"].map((platform) => (
              <div key={platform} className="flex items-center space-x-2">
                {platform === "github" && <FaGithub className="text-xl" />}
                {platform === "instagram" && <FaInstagram className="text-xl" />}
                {platform === "linkedin" && <FaLinkedin className="text-xl" />}
                {platform === "twitter" && <FaTwitter className="text-xl" />}
                <input
                  type="url"
                  id={platform}
                  name={platform}
                  value={user[platform] || ""}
                  onChange={handleChange}
                  placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`}
                  className="flex-1 px-3 py-2 bg-gray-800 border border-cyan-500 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            ))}
          </div>
        </motion.div>

        <motion.button
          type="submit"
          className="w-full bg-cyan-500 text-black font-bold py-2 px-4 rounded-md hover:bg-cyan-600 transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Update Profile
        </motion.button>
      </form>
    </motion.div>
  )
}

