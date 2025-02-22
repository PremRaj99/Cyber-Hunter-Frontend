import { useState } from "react";
import { CheckCircle, XCircle, Award, Search, Download, Eye, X } from "lucide-react";
import { toast } from "react-toastify";

export default function VerifyAchievement() {
  const [achievementId, setAchievementId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [achievementDetails, setAchievementDetails] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setVerificationResult(null);

    // Simulate verification process
    setTimeout(() => {
      if (achievementId === "12345") {
        setVerificationResult("success");
        // Mock achievement details
        setAchievementDetails({
          id: achievementId,
          title: "Web Development Excellence",
          issueDate: "2024-03-20",
          issuer: "Cyber Hunter",
          recipient: "John Doe",
          description: "Successfully completed advanced web development course",
          skills: ["React", "JavaScript", "Responsive Design"],
          certificateUrl: "https://google.com/" // In a real app, this would be a URL to the certificate file
        });
      } else {
        setVerificationResult("failure");
        setAchievementDetails(null);
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleDownload = () => {
    toast.success(`Downloading certificate for: ${achievementDetails.title}`);
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div className=" bg-gradient-to-b p-4 sm:p-8 text-white flex flex-col items-center justify-start min-h-[calc(100vh-8rem)]">
      <div className="w-full max-w-2xl mx-auto bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-gray-700">
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-center mb-6">
            <Award className="w-8 h-8 text-brandPrimary mr-3" />
            <h1 className="text-2xl sm:text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
              Verify Your Achievement
            </h1>
          </div>

          <form onSubmit={handleVerify} className="space-y-6">
            <div>
              <label htmlFor="achievementId" className="block text-sm font-medium text-white mb-2">
                Achievement ID
              </label>
              <div className="relative">
                <input
                  id="achievementId"
                  type="text"
                  value={achievementId}
                  onChange={(e) => setAchievementId(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-600 bg-transparent text-white rounded-lg shadow-sm focus:outline-none  focus:border-none placeholder:text-gray-400"
                  placeholder="Enter your achievement ID"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm   font-bold  text-black hover:text-brandPrimary
                ${isLoading ? 'bg-gray-600' : 'bg-gradient-to-r from-brandPrimary to-brandPrimary hover:from-black hover:to-black hover:border hover:border-brandPrimary duration-800'}
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </>
              ) : (
                'Verify Achievement'
              )}
            </button>
          </form>

          {/* Results section */}
          {verificationResult && (
            <div className={`mt-8 rounded-lg p-5 ${verificationResult === "success" ? "bg-green-900 bg-opacity-20" : "bg-red-900 bg-opacity-20"}`}>
              <div className="flex items-center mb-4">
                {verificationResult === "success" ? (
                  <CheckCircle className="w-6 h-6 text-green-400 mr-2" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-400 mr-2" />
                )}
                <h2 className="text-xl font-semibold">
                  {verificationResult === "success" ? "Verification Successful" : "Verification Failed"}
                </h2>
              </div>

              {verificationResult === "success" && achievementDetails && (
                <>
                  <div className="bg-gray-800 bg-opacity-50 rounded-lg p-5 border border-gray-700 mt-4">
                    <h3 className="text-lg font-medium mb-4 text-center text-indigo-300">Achievement Details</h3>

                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <span className="text-gray-400 sm:col-span-1">ID:</span>
                        <span className="font-medium sm:col-span-2">{achievementDetails.id}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <span className="text-gray-400 sm:col-span-1">Title:</span>
                        <span className="font-medium sm:col-span-2">{achievementDetails.title}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <span className="text-gray-400 sm:col-span-1">Issue Date:</span>
                        <span className="font-medium sm:col-span-2">{achievementDetails.issueDate}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <span className="text-gray-400 sm:col-span-1">Issuer:</span>
                        <span className="font-medium sm:col-span-2">{achievementDetails.issuer}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <span className="text-gray-400 sm:col-span-1">Recipient:</span>
                        <span className="font-medium sm:col-span-2">{achievementDetails.recipient}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <span className="text-gray-400 sm:col-span-1">Description:</span>
                        <span className="font-medium sm:col-span-2">{achievementDetails.description}</span>
                      </div>

                      {achievementDetails.skills && (
                        <div className="pt-2">
                          <span className="text-gray-400 block mb-2">Skills:</span>
                          <div className="flex flex-wrap gap-2">
                            {achievementDetails.skills.map((skill, index) => (
                              <span key={index} className="px-3 py-1 bg-indigo-900 bg-opacity-50 rounded-full text-xs font-medium text-indigo-200">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Download and Preview buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <button
                      onClick={handleDownload}
                      className="flex-1 flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-bold text-black bg-brandPrimary hover:bg-black hover:text-brandPrimary hover:border hover:border-brandPrimary focus:outline-none focus:ring-0 focus:ring-offset-0  transition-all duration-300"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download Certificate
                    </button>

                    <button
                      onClick={togglePreview}
                      className="flex-1 flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300"
                    >
                      <Eye className="w-5 h-5 mr-2" />
                      {showPreview ? 'Hide Preview' : 'Preview Certificate'}
                    </button>
                  </div>
                </>
              )}

              {verificationResult === "failure" && (
                <p className="text-white">
                  We couldn't verify this achievement ID. Please double-check your ID and try again.
                </p>
              )}
            </div>
          )}

          <div className="mt-6 text-center text-xs text-gray-400">
            <p>Need help? Contact support@techacademy.com</p>
          </div>
        </div>
      </div>

      {/* Certificate Preview Modal */}
      {showPreview && verificationResult === "success" && achievementDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl max-h-full bg-black rounded-lg shadow-2xl overflow-auto">
            <div className="sticky top-0 z-10 flex justify-between items-center p-4 bg-gradient-to-r from-brandPrimary to-black text-white">
              <h3 className="text-xl font-bold">Certificate Preview</h3>
              <button
                onClick={togglePreview}
                className="p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {/* Certificate Preview Content */}
              <div className="min-h-96 flex flex-col items-center justify-center p-8 border-4 border-cyan-400 rounded-lg mx-auto">
                <div className="text-center mb-6">
                  <img src="/api/placeholder/180/80" alt="Tech Academy Logo" className="mx-auto mb-4" />
                  <h1 className="text-3xl font-serif text-brandPrimary mb-1">CERTIFICATE OF ACHIEVEMENT</h1>
                  <p className="text-stone-300">This certifies that</p>
                </div>

                <h2 className="text-4xl font-serif text-brandPrimary mb-6 italic">{achievementDetails.recipient}</h2>

                <p className="text-center text-stone-300 max-w-lg mb-8">
                  has successfully completed the requirements for
                  <span className="block text-2xl font-bold text-brandPrimary my-4">{achievementDetails.title}</span>
                  with demonstrated proficiency in:
                  {achievementDetails.skills.join(', ')}
                </p>

                <div className="grid grid-cols-2 gap-12 w-full max-w-md mb-6">
                  <div className="text-center">
                    <img src="/api/placeholder/120/40" alt="Signature" className="mx-auto mb-2" />
                    <div className="w-full h-px bg-white mb-1"></div>
                    <p className="text-sm text-stone-300">Program Director</p>
                  </div>
                  <div className="text-center">
                    <img src="/api/placeholder/120/40" alt="Signature" className="mx-auto mb-2" />
                    <div className="w-full h-px bg-white mb-1"></div>
                    <p className="text-sm text-stone-300">Issuing Authority</p>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <p className="text-xs text-stone-300">Issued on: {achievementDetails.issueDate}</p>
                  <p className="text-xs text-stone-300">Certificate ID: {achievementDetails.id}</p>
                  <div className="mt-4">
                    <img src="/api/placeholder/120/120" alt="QR Code" className="mx-auto" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={handleDownload}
                  className="flex items-center px-4 py-2 bg-brandPrimary text-black rounded-lg hover:bg-black hover:border hover:border-brandPrimary hover:text-brandPrimary transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Certificate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}