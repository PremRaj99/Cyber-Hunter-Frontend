import { useState, useCallback, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import ImageUploader from "../components/Common/ImageUpload";
import MultiSelectInput from "../components/Input/MultiSelectInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaAsterisk } from "react-icons/fa6";
import { toast } from "react-toastify";
// import { headers } from "next/headers";


export default function UserDetail() {

  const navigate = useNavigate();
  // Initial amounts
  const clubReg = 100;
  const clubId = 50;

  // States for form fields
  const [userDetails, setUserDetails] = useState(
    {
      name: "",
      section: "",
      email: "",
      qId: "",
      program: "",
      branch: "",
      session: "",
      dob: "",
      gender: "",
      phone: "",
    }
  );

  // Interest
  const [interest, setInterest] = useState([]);

  // Profile Picture
  const [profilePicture, setProfilePicture] = useState(null);

  // States for checkboxes
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [clubAccepted, setClubAccepted] = useState(false);
  const [idCardAccepted, setIdCardAccepted] = useState(false);

  // State to keep track of the total amount
  const [totalAmount, setTotalAmount] = useState(0);

  // Function to update total amount when checkboxes are checked/unchecked
  const handleCheckboxChange = useCallback(() => {
    let newAmount = 0;
    if (clubAccepted) newAmount += clubReg;
    if (idCardAccepted) newAmount += clubId;
    setTotalAmount(newAmount);
  }, [clubAccepted, idCardAccepted]);

  // Use useEffect to trigger total amount calculation whenever checkboxes change
  useEffect(() => {
    handleCheckboxChange();
  }, [clubAccepted, idCardAccepted, handleCheckboxChange]);

  // Handle image upload
  const handleImageUpload = (file) => {
    setProfilePicture(file);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!termsAccepted || !clubAccepted || !idCardAccepted) {
      alert("Please accept all required terms and conditions.");
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("name", userDetails.name);
    formData.append("qId", userDetails.qId);
    formData.append("userId", userDetails.email); // Using email as userId
    formData.append("course", userDetails.program);
    formData.append("session", userDetails.session);
    formData.append("branch", userDetails.branch);
    formData.append("DOB", userDetails.dob);
    formData.append("phoneNumber", userDetails.phone);
    formData.append("gender", userDetails.gender.toLowerCase());

    // Handle profile picture
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    // Handle interests
    if (interest.length > 0) {
      interest.forEach((int, index) => {
        formData.append(`interestId[${index}]`, int);
      });
    }

    try {
      // Send data to backend
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      ).then((res) => {
        console.log(res);
        if (res.status === 200) {
          toast.success("Registration Successful, Please Login to continue.");
          resetForm();
          navigate("/payment");
        }
      });
    } catch (error) {
      // Handle registration error
      console.error(
        "Registration Error:",
        error.response ? error.response.data : error.message
      );
      alert(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  // Reset form method to clear form fields
  const resetForm = () => {
    setUserDetails({
      name: "",
      section: "",
      email: "",
      qId: "",
      program: "",
      branch: "",
      session: "",
      dob: "",
      gender: "",
      phone: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl text-center mb-8">
          Register with <span className="text-cyan-400 font-bold">CYBER HUNTER CLUB</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center mb-6">
            <ImageUploader onImageUpload={handleImageUpload} shouldBeRound={false}/>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="flex gap-1 text-sm font-medium">
                Name
                <span className="text-red-700 text-xs">
                  <FaAsterisk />
                </span>
              </label>
              <div className="relative">
                <IoIosArrowForward className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400" />
                <input
                  id="name"
                  type="text"
                  value={userDetails.name}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, name: e.target.value })
                  }
                  placeholder="Enter Your Name"
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="section"
                className="flex gap-1 text-sm font-medium"
              >
                Section
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
                className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              >
                <option value="">Select Section</option>
                {[
                  "A",
                  "B",
                  "C",
                  "D",
                  "E",
                  "F",
                  "G",
                  "H",
                  "I",
                  "J",
                  "K",
                  "Other",
                ].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="qid" className="flex gap-1 text-sm font-medium">
                Q-Id
                <span className="text-red-700 text-xs">
                  <FaAsterisk />
                </span>
              </label>
              <div className="relative">
                <IoIosArrowForward className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400" />
                <input
                  id="qid"
                  type="text"
                  value={userDetails.qId}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, qId: e.target.value })
                  }
                  placeholder="Q-Id"
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="program"
                className="flex gap-1 text-sm font-medium"
              >
                Program
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
                className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
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
            <div className="space-y-2">
              <label
                htmlFor="branch"
                className="flex gap-1 text-sm font-medium"
              >
                Branch
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
                className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              >
                <option value="">Select Branch</option>
                {[
                  "CSE",
                  "CSCQ",
                  "AIML",
                  "FSD",
                  "DS",
                  "MAWT",
                  "Computer Application",
                  "Other",
                ].map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="session"
                className="flex gap-1 text-sm font-medium"
              >
                Session
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
                className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              >
                <option value="">Select Session</option>
                {[
                  "2022-25",
                  "2022-26",
                  "2023-26",
                  "2023-27",
                  "2024-28",
                  "2024-27",
                  "2025-29",
                  "2025-28",
                  "2026-29",
                  "2026-30",
                ].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="gender"
                className="flex gap-1 text-sm font-medium"
              >
                Gender
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
                className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
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
            <div className="space-y-2">
              <label htmlFor="phone" className="flex gap-1 text-sm font-medium">
                Phone Number
                <span className="text-red-700 text-xs">
                  <FaAsterisk />
                </span>
              </label>
              <div className="relative">
                <IoIosArrowForward className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400" />
                <input
                  id="phone"
                  type="tel"
                  value={userDetails.phone}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, phone: e.target.value })
                  }
                  placeholder="Phone Number"
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="dob" className="flex gap-1 text-sm font-medium">
                Date of Birth
                <span className="text-red-700 text-xs">
                  <FaAsterisk />
                </span>
              </label>
              <div className="relative">
                <IoIosArrowForward className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400" />
                <input
                  id="dob"
                  type="date"
                  value={userDetails.dob}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, dob: e.target.value })
                  }
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="dob" className="flex gap-1 text-sm font-medium">
                Interest
                <span className="text-red-700 text-xs">
                  <FaAsterisk />
                </span>
              </label>
              <MultiSelectInput
                fieldName="Interest"
                apiEndpoint={`${import.meta.env.VITE_API_URL}/api/v1/interest`}
                onTagsChange={setInterest}
                className="w-full text-black pr-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
          </div>

          <div className="space-y-4 mt-8">
            <h3 className="text-xl font-semibold text-center text-cyan-400">
              PAYMENT
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="club"
                  checked={clubAccepted}
                  onChange={(e) => setClubAccepted(e.target.checked)}
                  className="w-4 h-4 text-cyan-400 bg-gray-700 border-gray-600 rounded focus:ring-cyan-400"
                />
                <label htmlFor="club" className="text-sm font-medium">
                  Club Registration
                </label>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span>Registration for club:</span>
                  <span className="text-cyan-400">Price: ₹{clubReg}</span>
                </div>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Be part of cyber hunter club and its activities.</li>
                  <li>
                    Experience live latest technology classes and practical
                    projects.
                  </li>
                  <li>
                    Experience the field of{" "}
                    <span className="text-cyan-400 font-bold">
                      Cyber Security
                    </span>{" "}
                    and{" "}
                    <span className="text-cyan-400 font-bold">
                      Fullstack Development
                    </span>{" "}
                    with{" "}
                    <span className="text-cyan-400 font-bold">BlockChain</span>.
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="idCard"
                  checked={idCardAccepted}
                  onChange={(e) => setIdCardAccepted(e.target.checked)}
                  className="w-4 h-4 text-cyan-400 bg-gray-700 border-gray-600 rounded focus:ring-cyan-400"
                />
                <label htmlFor="idCard" className="text-sm font-medium">
                  Club ID Card
                </label>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span>For Club ID Card:</span>
                  <span className="text-cyan-400">Price: ₹{clubId}</span>
                </div>
                <ul className="list-disc pl-5 text-sm">
                  <li>
                    Get your customized{" "}
                    <span className="text-cyan-400 font-bold">
                      Cyber Hunter
                    </span>{" "}
                    ID Card.
                  </li>
                </ul>
              </div>
            </div>
          </div>

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
            className="w-full bg-brandPrimary hover:text-brandPrimary hover:bg-black hover:border-2 hover:border-brandPrimary text-black font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
          >
            Submit and Pay | ₹{totalAmount}
          </button>
        </form>
      </div>
    </div>
  );
}
