/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useContext } from "react";
import { PasswordContext } from "../../pages/ChangePassword";

const PasswordStrengthIndicator = ({ password }) => {
  const { validatePassword } = useContext(PasswordContext);
  const { strength } = validatePassword(password);

  const getStrengthText = () => {
    if (strength < 40) return "Weak";
    if (strength < 70) return "Medium";
    return "Strong";
  };

  const getStrengthColor = () => {
    if (strength < 40) return "bg-red-500";
    if (strength < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getTextColor = () => {
    if (strength < 40) return "text-red-400";
    if (strength < 70) return "text-yellow-400";
    return "text-green-400";
  };

  return (
    <div className="mt-2">
      <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${getStrengthColor()}`}
          initial={{ width: 0 }}
          animate={{ width: `${strength}%` }}
        />
      </div>
      <p className="text-xs mt-1 text-gray-400">
        Password strength:
        <span className={getTextColor()}>
          {" "}
          {getStrengthText()}
        </span>
      </p>
    </div>
  );
};

export default PasswordStrengthIndicator;
