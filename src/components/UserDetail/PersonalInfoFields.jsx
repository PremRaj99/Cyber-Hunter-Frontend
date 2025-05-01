/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { IoIosArrowForward } from "react-icons/io";
import { FaAsterisk } from "react-icons/fa6";
import MultiSelectInput from "../Input/MultiSelectInput";

const PersonalInfoFields = ({ userDetails, setUserDetails, interest, setInterest }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
      {/* Name Field */}
      <div className="space-y-1 md:space-y-2">
        <label htmlFor="name" className="flex gap-1 text-sm font-medium">
          Name{" "}
          <span className="text-red-700 text-xs">
            <FaAsterisk />
          </span>
        </label>
        <div className="relative">
          <IoIosArrowForward className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 text-cyan-400" />
          <input
            id="name"
            type="text"
            value={userDetails.name}
            onChange={(e) =>
              setUserDetails({ ...userDetails, name: e.target.value })
            }
            placeholder="Enter Your Name"
            className="w-full pl-8 md:pl-10 pr-2 md:pr-3 py-2 text-sm md:text-base bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
        </div>
      </div>

      {/* Section Field */}
      <div className="space-y-1 md:space-y-2">
        <label
          htmlFor="section"
          className="flex gap-1 text-sm font-medium"
        >
          Section{" "}
          <span className="text-red-700 text-xs">
            <FaAsterisk />
          </span>
        </label>
        <select
          id="section"
          value={userDetails.section}
          onChange={(e) =>
            setUserDetails({ ...userDetails, section: e.target.value })
          }
          className="w-full px-2 md:px-3 py-2 text-sm md:text-base bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
          required
        >
          <option value="">Select Section</option>
          {[
            "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "Other",
          ].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* QId Field */}
      <div className="space-y-1 md:space-y-2">
        <label htmlFor="qid" className="flex gap-1 text-sm font-medium">
          Q-Id{" "}
          <span className="text-red-700 text-xs">
            <FaAsterisk />
          </span>
        </label>
        <div className="relative">
          <IoIosArrowForward className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 text-cyan-400" />
          <input
            id="qid"
            type="text"
            value={userDetails.qId}
            onChange={(e) =>
              setUserDetails({ ...userDetails, qId: e.target.value })
            }
            placeholder="Q-Id"
            className="w-full pl-8 md:pl-10 pr-2 md:pr-3 py-2 text-sm md:text-base bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
        </div>
      </div>

      {/* Program Field */}
      <div className="space-y-1 md:space-y-2">
        <label
          htmlFor="program"
          className="flex gap-1 text-sm font-medium"
        >
          Program{" "}
          <span className="text-red-700 text-xs">
            <FaAsterisk />
          </span>
        </label>
        <select
          id="program"
          value={userDetails.program}
          onChange={(e) =>
            setUserDetails({ ...userDetails, program: e.target.value })
          }
          className="w-full px-2 md:px-3 py-2 text-sm md:text-base bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
          required
        >
          <option value="">Select Program</option>
          {["Btech", "BCA", "MCA", "Other"].map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* Branch Field */}
      <div className="space-y-1 md:space-y-2">
        <label
          htmlFor="branch"
          className="flex gap-1 text-sm font-medium"
        >
          Branch{" "}
          <span className="text-red-700 text-xs">
            <FaAsterisk />
          </span>
        </label>
        <select
          id="branch"
          value={userDetails.branch}
          onChange={(e) =>
            setUserDetails({ ...userDetails, branch: e.target.value })
          }
          className="w-full px-2 md:px-3 py-2 text-sm md:text-base bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
          required
        >
          <option value="">Select Branch</option>
          {[
            "CSE", "CSCQ", "AIML", "FSD", "DS", "MAWT", "CA", "Other",
          ].map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* Session Field */}
      <div className="space-y-1 md:space-y-2">
        <label
          htmlFor="session"
          className="flex gap-1 text-sm font-medium"
        >
          Session{" "}
          <span className="text-red-700 text-xs">
            <FaAsterisk />
          </span>
        </label>
        <select
          id="session"
          value={userDetails.session}
          onChange={(e) =>
            setUserDetails({ ...userDetails, session: e.target.value })
          }
          className="w-full px-2 md:px-3 py-2 text-sm md:text-base bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
          required
        >
          <option value="">Select Session</option>
          {[
            "2022-25", "2022-26", "2023-26", "2023-27", "2024-28",
            "2024-27", "2025-29", "2025-28", "2026-29", "2026-30",
          ].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Gender Field */}
      <div className="space-y-1 md:space-y-2">
        <label
          htmlFor="gender"
          className="flex gap-1 text-sm font-medium"
        >
          Gender{" "}
          <span className="text-red-700 text-xs">
            <FaAsterisk />
          </span>
        </label>
        <select
          id="gender"
          value={userDetails.gender}
          onChange={(e) =>
            setUserDetails({ ...userDetails, gender: e.target.value })
          }
          className="w-full px-2 md:px-3 py-2 text-sm md:text-base bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
          required
        >
          <option value="">Select Gender</option>
          {["Male", "Female", "Other"].map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* Phone Field */}
      <div className="space-y-1 md:space-y-2">
        <label htmlFor="phone" className="flex gap-1 text-sm font-medium">
          Phone Number{" "}
          <span className="text-red-700 text-xs">
            <FaAsterisk />
          </span>
        </label>
        <div className="relative">
          <IoIosArrowForward className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 text-cyan-400" />
          <input
            id="phone"
            type="tel"
            value={userDetails.phone}
            onChange={(e) =>
              setUserDetails({ ...userDetails, phone: e.target.value })
            }
            placeholder="Phone Number"
            className="w-full pl-8 md:pl-10 pr-2 md:pr-3 py-2 text-sm md:text-base bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
        </div>
      </div>

      {/* Date of Birth Field */}
      <div className="space-y-1 md:space-y-2">
        <label htmlFor="dob" className="flex gap-1 text-sm font-medium">
          Date of Birth{" "}
          <span className="text-red-700 text-xs">
            <FaAsterisk />
          </span>
        </label>
        <div className="relative">
          <IoIosArrowForward className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 text-cyan-400" />
          <input
            id="dob"
            type="date"
            value={userDetails.dob}
            onChange={(e) =>
              setUserDetails({ ...userDetails, dob: e.target.value })
            }
            className="w-full pl-8 md:pl-10 pr-2 md:pr-3 py-2 text-sm md:text-base bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
        </div>
      </div>

      {/* Interest Field */}
      <div className="space-y-1 md:space-y-2">
        <label
          htmlFor="interest"
          className="flex gap-1 text-sm font-medium"
        >
          Interest{" "}
          <span className="text-red-700 text-xs">
            <FaAsterisk />
          </span>
        </label>
        <MultiSelectInput
          fieldName="Interest"
          apiEndpoint={`${import.meta.env.VITE_API_URL}/api/v1/interest`}
          onTagsChange={setInterest}
          className="w-full text-black px-2 md:px-3 py-2 text-sm md:text-base bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>

      {/* Bio Field */}
      <div className="space-y-1 md:space-y-2 col-span-1 md:col-span-2">
        <label htmlFor="bio" className="flex gap-1 text-sm font-medium">
          About Yourself{" "}
          <span className="text-red-700 text-xs">
            <FaAsterisk />
          </span>
        </label>
        <div className="relative">
          <IoIosArrowForward className="absolute left-2 md:left-3 top-4 text-cyan-400" />
          <textarea
            id="bio"
            value={userDetails.bio}
            onChange={(e) =>
              setUserDetails({ ...userDetails, bio: e.target.value })
            }
            placeholder="Tell us about yourself, your interests, and what you hope to achieve..."
            className="w-full pl-8 md:pl-10 pr-2 md:pr-3 py-2 text-sm md:text-base bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 min-h-[100px] md:min-h-[120px] resize-y no-scrollbar"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoFields;
