/* eslint-disable react/prop-types */
const PaymentSection = ({
  clubReg,
  clubId,
  clubAccepted,
  setClubAccepted,
  idCardAccepted,
  setIdCardAccepted
}) => {
  return (
    <div className="space-y-3 md:space-y-4 mt-6 md:mt-8 bg-gray-800 p-6 rounded-lg">
      <h3 className="text-lg md:text-xl font-semibold text-center text-cyan-400">
        <span className="border-b-2">PAYMENT</span>
      </h3>

      <div className="space-y-3 md:space-y-4">
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
        <div className="bg-gray-700 rounded-lg p-3 md:p-4">
          <div className="flex justify-between mb-2">
            <span>Registration for club :</span>
            <span className="text-cyan-400">Price: ₹{clubReg}</span>
          </div>
          <ul className="list-disc pl-4 md:pl-5 text-xs md:text-sm space-y-1">
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
  );
};

export default PaymentSection;
