import { useState } from "react";
// import { CheckCircle, XCircle } from "lucide-react";

export default function VerifyAchievement() {
  const [achievementId, setAchievementId] = useState("");
 const [verificationResult, setVerificationResult] = useState(
   "success" || "failure" || null
  );
  const [achievementDetails, setAchievementDetails] = useState(null);
 

  const handleVerify = (e) => {
    e.preventDefault();
    // Simulate verification process
    setTimeout(() => {
      if (achievementId === "12345") {
        setVerificationResult("success");
        // Mock achievement details
        setAchievementDetails({
          id: achievementId,
          title: "Web Development Excellence",
          issueDate: "2024-03-20",
          issuer: "Tech Academy",
          recipient: "John Doe",
          description: "Successfully completed advanced web development course",
        });
      } else {
        setVerificationResult("failure");
        setAchievementDetails(null);
      }
    }, 1500);
  };

   const renderAchievementDetails = () => {
     if (!achievementDetails) return "null";
     return (
       <div className="mt-6 p-4 border rounded-lg bg-gray-50">
         <h2 className="text-xl font-semibold text-indigo-700 mb-4">
           Achievement Details
         </h2>
         <div className="space-y-2">
           <p>
             <span className="font-medium">Title:</span>{" "}
             {achievementDetails.title}
           </p>
           <p>
             <span className="font-medium">Issue Date:</span>{" "}
             {achievementDetails.issueDate}
           </p>
           <p>
             <span className="font-medium">Issuer:</span>{" "}
             {achievementDetails.issuer}
           </p>
           <p>
             <span className="font-medium">Recipient:</span>{" "}
             {achievementDetails.recipient}
           </p>
           <p>
             <span className="font-medium">Description:</span>{" "}
             {achievementDetails.description}
           </p>
         </div>
       </div>
     );
   };


  return (
    <div className="min-h-screen bg-gradient-to-br  flex items-center justify-center p-4">
      <div className="border-4 border-dashed border-brandPrimary rounded-lg shadow-xl p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-brandPrimary">
          Verify Your Achievement
        </h1>
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label
              htmlFor="achievementId"
              className="block text-sm font-medium text-white mb-1"
            >
              Achievement ID
            </label>
            <input
              type="text"
              id="achievementId"
              value={achievementId}
              onChange={(e) => setAchievementId(e.target.value)}
              className="w-full px-3 py-2 border bg-black text-brandPrimary placeholder:text-stone-500 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brandPrimary focus:ring-1"
              placeholder="Enter your achievement ID"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Verify
          </button>
        </form>

        {verificationResult === "success" && renderAchievementDetails()}
      </div>
    </div>
  );
}
