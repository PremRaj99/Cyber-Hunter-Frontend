/* eslint-disable react/prop-types */
const TermsAndSubmit = ({
  termsAccepted,
  setTermsAccepted,
  loading,
  totalAmount
}) => {
  return (
    <>
      <div className="flex items-center space-x-2 mt-6">
        <input
          type="checkbox"
          id="terms"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          className="w-4 h-4 text-cyan-400 bg-gray-700 border-gray-600 rounded focus:ring-cyan-400"
        />
        <label htmlFor="terms" className="text-sm">
          I accept the{" "}
          <span className="text-cyan-400 cursor-pointer">
            terms and conditions
          </span>
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-brandPrimary hover:text-brandPrimary hover:bg-black hover:border-brandPrimary hover:border text-black font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
        disabled={loading}
      >
        {loading ? `Loading...` : `Submit and Pay | ₹${totalAmount}`}
      </button>
    </>
  );
};

export default TermsAndSubmit;
