/* eslint-disable react/prop-types */
import { LockKeyhole, Eye, EyeOff } from "lucide-react";
import { useContext } from "react";
import { PasswordContext } from "../../pages/ChangePassword";

const PasswordField = ({
  name,
  placeholder,
  showError = true,
  disabled = false
}) => {
  const {
    formData,
    handleInputChange,
    showPasswords,
    togglePasswordVisibility,
    errors,
    isCurrentPasswordVerified
  } = useContext(PasswordContext);

  const isCurrentPassword = name === "currentPassword";
  const showVerifiedIcon = isCurrentPassword && isCurrentPasswordVerified;
  const showEyeIcon = !isCurrentPassword || !isCurrentPasswordVerified;

  const getBorderClass = () => {
    if (errors[name]) return "border-red-500";
    if (isCurrentPassword && isCurrentPasswordVerified) return "border-green-500";
    return "border-white/10";
  };

  return (
    <div className="relative flex items-center">
      <input
        type={showPasswords[name.replace("Password", "")] ? "text" : "password"}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={`w-full px-4 py-4 bg-white/5 text-white border ${getBorderClass()} rounded-2xl focus:outline-none focus:border-brandPrimary transition-all pl-12`}
        disabled={disabled}
        required
      />
      <LockKeyhole className="absolute left-4 w-5 h-5 text-gray-400" />

      {showEyeIcon && (
        <button
          type="button"
          onClick={() => togglePasswordVisibility(name.replace("Password", ""))}
          className="absolute right-4 text-gray-400 hover:text-white transition-colors"
        >
          {showPasswords[name.replace("Password", "")] ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      )}

      {showVerifiedIcon && (
        <span className="absolute right-4 text-green-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </span>
      )}

      {showError && errors[name] && (
        <p className="mt-1 text-sm text-red-400 absolute -bottom-6 left-0">{errors[name]}</p>
      )}
    </div>
  );
};

export default PasswordField;
