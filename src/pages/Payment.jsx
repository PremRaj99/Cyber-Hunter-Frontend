import { useState } from "react";
import {
  CreditCard,
  Smartphone,
  Building,
  ChevronDown,
  Check,
} from "lucide-react";

export default function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");
  const [selectedBank, setSelectedBank] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment submission logic here help me to write this logic
    console.log("Payment submitted");
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/\D/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = matches?.[0] || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto border border-brandPrimary rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-2xl font-bold text-brandPrimary mb-8">
            Payment Details
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="payment-method" className="block text-sm font-medium text-white mb-2">
                Payment Method
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  className={`flex items-center justify-center px-4 py-3 border ${
                    paymentMethod === "card"
                      ? "border-brandPrimary  text-brandPrimary"
                      : "border-gray-300 text-gray-700"
                  } rounded-md shadow-sm text-sm font-medium focus:outline-none`}
                  onClick={() => setPaymentMethod("card")}
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  Card
                </button>
                <button
                  type="button"
                  className={`flex items-center justify-center px-4 py-3 border ${
                    paymentMethod === "upi"
                      ? "border-brandPrimary  text-brandPrimary"
                      : "border-gray-300 text-gray-700"
                  } rounded-md shadow-sm text-sm font-medium focus:outline-none `}
                  onClick={() => setPaymentMethod("upi")}
                >
                  <Smartphone className="h-5 w-5 mr-2" />
                  UPI
                </button>
                <button
                  type="button"
                  className={`flex items-center justify-center px-4 py-3 border ${
                    paymentMethod === "netbanking"
                      ? "border-brandPrimary  text-brandPrimary"
                      : "border-gray-300 text-gray-700"
                  } rounded-md shadow-sm text-sm font-medium focus:outline-none`}
                  onClick={() => setPaymentMethod("netbanking")}
                >
                  <Building className="h-5 w-5 mr-2" />
                  Net Banking
                </button>
              </div>
            </div>

            {paymentMethod === "card" && (
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="card-number"
                    className="block text-sm font-medium text-white mb-1"
                  >
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="card-number"
                    value={cardNumber}
                    onChange={(e) =>
                      setCardNumber(formatCardNumber(e.target.value))
                    }
                    placeholder="1234 5678 9012 3456"
                    className="mt-1 block w-full bg-black text-white placeholder:text-stone-400 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brandPrimary sm:text-sm"
                    maxLength={19}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="expiry-date"
                      className="block text-sm font-medium text-white mb-1"
                    >
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiry-date"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      placeholder="MM / YY"
                      className="mt-1 block w-full bg-black text-white placeholder:text-stone-400 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brandPrimary sm:text-sm"
                      maxLength={5}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cvv"
                      className="block text-sm font-medium text-white mb-1"
                    >
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="123"
                      className="mt-1 block w-full bg-black text-white placeholder:text-stone-400 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brandPrimary sm:text-sm"
                      maxLength={3}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "upi" && (
              <div>
                <label
                  htmlFor="upi-id"
                  className="block text-sm font-medium text-white mb-1"
                >
                  UPI ID
                </label>
                <input
                  type="text"
                  id="upi-id"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="yourname@upi"
                  className="mt-1 block w-full bg-black text-white placeholder:text-stone-400 border border-brandPrimary rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brandPrimary focus:border-brandPrimary sm:text-sm"
                  required
                />
              </div>
            )}

            {paymentMethod === "netbanking" && (
              <div>
                <label
                  htmlFor="bank-select"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Select Bank
                </label>
                <div className="relative">
                  <select
                    id="bank-select"
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="block appearance-none w-full bg-black text-white placeholder:text-stone-400 border border-brandPrimary rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brandPrimary focus:border-blue-500 sm:text-sm"
                    required
                  >
                    <option value="">Choose a bank</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="axis">Axis Bank</option>
                    <option value="pnb">Punjab National Bank</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-brandPrimary hover:bg-black hover:text-brandPrimary hover:border-brandPrimary focus:outline-none focus:ring-0 transition duration-500"
              >
                Pay Now
              </button>
            </div>
          </form>
        </div>
        <div className="px-4 py-3 border-t border-brandPrimary text-right sm:px-6">
          <div className="flex items-center justify-end">
            <Check className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-sm text-gray-500">Secure Payment</span>
          </div>
        </div>
      </div>
    </div>
  );
}
