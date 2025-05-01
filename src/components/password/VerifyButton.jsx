import { motion } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useContext } from "react";
import { PasswordContext } from "../../pages/ChangePassword";

const VerifyButton = () => {
  const { isVerifying, formData, verifyCurrentPassword } = useContext(PasswordContext);

  return (
    <div className="mt-2 flex justify-end">
      <button
        type="button"
        onClick={verifyCurrentPassword}
        disabled={isVerifying || !formData.currentPassword}
        className="px-3 py-1 text-xs bg-brandPrimary text-black rounded hover:opacity-90 disabled:opacity-50 flex items-center gap-1"
      >
        {isVerifying ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <AiOutlineLoading3Quarters className="w-3 h-3" />
            </motion.div>
            <span>Verifying...</span>
          </>
        ) : (
          <span>Verify Password</span>
        )}
      </button>
    </div>
  );
};

export default VerifyButton;
