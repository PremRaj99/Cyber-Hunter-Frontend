import { motion } from "framer-motion";

const FormInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  variants,
  required = false
}) => {
  return (
    <motion.div className="group" variants={variants}>
      <label className="block text-sm font-medium text-gray-400 mb-1 group-hover:text-cyan-400 transition-colors duration-300">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300"
      />
    </motion.div>
  );
};

export default FormInput;
