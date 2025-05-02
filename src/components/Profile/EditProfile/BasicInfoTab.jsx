/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BasicInfoTab = ({
  activeTab,
  formData,
  handleInputChange,
  handleDateChange,
  containerVariants,
  itemVariants
}) => {
  return (
    <motion.div
      className={`space-y-6 ${activeTab !== "basic" && "hidden"}`}
      variants={containerVariants}
      initial="hidden"
      animate={activeTab === "basic" ? "visible" : "hidden"}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div className="group" variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-400 mb-1 group-hover:text-cyan-400 transition-colors duration-300">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300"
          />
        </motion.div>
        <motion.div className="group" variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-400 mb-1 group-hover:text-cyan-400 transition-colors duration-300">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            readOnly
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent opacity-70 cursor-not-allowed"
          />
        </motion.div>
        <motion.div className="group" variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-400 mb-1 group-hover:text-cyan-400 transition-colors duration-300">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300"
          />
        </motion.div>
        <motion.div className="group" variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-400 mb-1 group-hover:text-cyan-400 transition-colors duration-300">
            Date of Birth
          </label>
          <DatePicker
            selected={formData.DOB ? new Date(formData.DOB) : null}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            showYearDropdown
            yearDropdownItemNumber={100}
            scrollableYearDropdown
            showMonthDropdown
            placeholderText="Select your date of birth"
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300"
            calendarClassName="bg-gray-800 border border-gray-700 text-white"
            wrapperClassName="w-full"
            maxDate={new Date()}
            minDate={new Date('1900-01-01')}
          />
        </motion.div>
        <motion.div className="group" variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-400 mb-1 group-hover:text-cyan-400 transition-colors duration-300">
            Gender
          </label>
          <div className="relative">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer hover:bg-gray-700/70"
            >
              <option value="" className="bg-gray-800 text-gray-400">Select Gender</option>
              <option value="male" className="bg-gray-800 text-white hover:bg-gray-700">Male</option>
              <option value="female" className="bg-gray-800 text-white hover:bg-gray-700">Female</option>
              <option value="others" className="bg-gray-800 text-white hover:bg-gray-700">Other</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <motion.svg
                className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ rotate: 0 }}
                animate={{ rotate: formData.gender ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </div>
          </div>
        </motion.div>
        <motion.div className="col-span-1 md:col-span-2 group " variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-400 mb-1 group-hover:text-cyan-400 transition-colors duration-300">
            About Me
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300 resize-none no-scrollbar"
            placeholder="Tell us about yourself..."
          ></textarea>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BasicInfoTab;
