/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { FaRocket } from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useContext } from "react";
import { PasswordContext } from "../../pages/ChangePassword";
import PasswordField from "./PasswordField";
import VerifyButton from "./VerifyButton";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";

const PasswordForm = ({ errors }) => {
  const { handleSubmit, isLoading, isCurrentPasswordVerified, formData } = useContext(PasswordContext);

  return (
    <>
      <div className="text-center mb-8">
        <motion.div
          className="relative w-24 h-24 mx-auto mb-4"
          animate={{
            y: [-5, 5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <div className="absolute inset-0 bg-brandPrimary rounded-full blur-2xl opacity-20" />
          <div className="relative h-full flex items-center justify-center">
            <FaRocket className="w-12 h-12 text-cyan-400" />
          </div>
        </motion.div>
        <h2 className="text-2xl font-bold mb-2">Change Password</h2>
        <p className="text-gray-400">
          Enter the details to Change Your Password
        </p>
      </div>

      {errors.general && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/20 text-red-300 p-3 rounded-xl mb-4 text-sm"
        >
          {errors.general}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Current Password Field */}
        <div className="relative group">
          <PasswordField
            name="currentPassword"
            placeholder="Current password"
            disabled={isCurrentPasswordVerified}
          />

          {!isCurrentPasswordVerified && !errors.currentPassword && (
            <VerifyButton />
          )}
        </div>

        {/* New Password Field */}
        <div className="relative group">
          <PasswordField
            name="newPassword"
            placeholder="New password"
          />

          {/* Password strength indicator */}
          {formData.newPassword && (
            <PasswordStrengthIndicator password={formData.newPassword} />
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="relative group">
          <PasswordField
            name="confirmPassword"
            placeholder="Confirm Password"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-gradient-to-r from-brandPrimary to-black rounded-2xl font-semibold relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-black/50 translate-y-full group-hover:translate-y-0 transition-transform" />
          <span className="relative flex items-center justify-center gap-2">
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <AiOutlineLoading3Quarters className="w-5 h-5" />
              </motion.div>
            ) : (
              <>
                Update Password
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </span>
        </motion.button>
      </form>
    </>
  );
};

export default PasswordForm;
